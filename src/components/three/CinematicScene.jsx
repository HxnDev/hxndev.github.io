import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Icosahedron,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import AuroraBackdrop from './AuroraBackdrop';

const BG_COLOR = new THREE.Color('#05060d');
const damp = (cur, target, lambda, dt) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));

/* The hero object — its transform is fully driven by scroll progress (0..1). */
function Crystal({ quality, progress, compact }) {
  const ref = useRef();
  const matRef = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const p = progress.current;

    // Continuous spin + scroll-coupled rotation = the "flying through a world" feel.
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.6 + state.clock.elapsedTime * 0.04;
    ref.current.rotation.z = p * Math.PI * 1.5;

    // Drift the object across the stage so it plays against each text act.
    // On narrow (portrait) screens we keep it near-centered so it never flies
    // out of frame, and shrink it so text overlaid on top stays legible.
    const targetX = Math.sin(p * Math.PI * 2) * (compact ? 0.55 : 2.5);
    const targetY = (compact ? 1.0 : 0) + Math.cos(p * Math.PI) * (compact ? 0.3 : 0.6);
    const targetScale =
      (compact ? 0.78 : 1) + Math.sin(p * Math.PI) * (compact ? 0.14 : 0.35);
    ref.current.position.x = damp(ref.current.position.x, targetX, 4, delta);
    ref.current.position.y = damp(ref.current.position.y, targetY, 4, delta);
    const s = damp(ref.current.scale.x, targetScale, 4, delta);
    ref.current.scale.setScalar(s);

    // Morph the surface as you descend.
    if (matRef.current) {
      matRef.current.distortion = 0.35 + p * 0.55;
      matRef.current.temporalDistortion = 0.15 + p * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.6, quality.detail]}>
        <MeshTransmissionMaterial
          ref={matRef}
          samples={quality.samples}
          resolution={quality.resolution}
          thickness={1.7}
          roughness={0.16}
          ior={1.43}
          chromaticAberration={0.7}
          anisotropy={0.4}
          distortion={0.4}
          distortionScale={0.55}
          temporalDistortion={0.18}
          transmission={1}
          color="#bfe9ff"
          attenuationColor="#6fa8ff"
          attenuationDistance={1.3}
          background={BG_COLOR}
        />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count = 300 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#9fd8ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Dollies the camera through the scene as you scroll + parallax to the cursor. */
function Rig({ pointer, progress, compact }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const p = progress.current;
    // Pull back a touch on phones so the (centered) crystal stays fully framed.
    const targetZ = (compact ? 6.6 : 6) - Math.sin(p * Math.PI) * (compact ? 1 : 2.2);
    const px = pointer.current.x * 0.5;
    const py = pointer.current.y * 0.35;
    camera.position.z = damp(camera.position.z, targetZ, 3, delta);
    camera.position.x = damp(camera.position.x, px, 4, delta);
    camera.position.y = damp(camera.position.y, py, 4, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function getQuality() {
  if (typeof window === 'undefined') return 'high';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = window.innerWidth < 768;
  const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
  if (reduced || coarse || small || lowCores) return 'low';
  return 'high';
}

const QUALITY = {
  high: { detail: 12, samples: 5, resolution: 288, particles: 320, dpr: [1, 1.6], bloom: true, shader: true },
  low: { detail: 6, samples: 2, resolution: 192, particles: 120, dpr: [1, 1.2], bloom: false, shader: false },
};

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCompact = typeof window !== 'undefined' && window.innerWidth < 768;

/* The persistent canvas. `progress` is a ref (0..1) driven by the page scroll. */
const CinematicScene = ({ progress }) => {
  const pointer = useRef({ x: 0, y: 0 });
  const wrapRef = useRef(null);
  const glRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [tier] = useState(getQuality);
  const q = QUALITY[tier];

  // Release the GPU context explicitly when the scene unmounts (e.g. navigating
  // away from Home). Without this the renderer can be torn down mid-flight,
  // surfacing as "THREE.WebGLRenderer: Context Lost" and a frozen page.
  useEffect(() => {
    return () => {
      const gl = glRef.current;
      if (!gl) return;
      try {
        gl.dispose();
        gl.forceContextLoss?.();
      } catch {
        /* context already gone — nothing to do */
      }
      glRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handlePointer = e => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handlePointer);
    return () => window.removeEventListener('mousemove', handlePointer);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cine-canvas" aria-hidden="true" ref={wrapRef}>
      <Canvas
        dpr={q.dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          glRef.current = gl;
          gl.setClearColor(0x000000, 0);
          // Preventing the default on context-loss lets the browser restore the
          // context instead of leaving a dead canvas behind.
          gl.domElement.addEventListener(
            'webglcontextlost',
            e => e.preventDefault(),
            false
          );
        }}
        fallback={null}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={45} color="#5be9ff" />
          <pointLight position={[-5, -3, 2]} intensity={35} color="#6fa8ff" />
          <pointLight position={[0, -4, -4]} intensity={28} color="#ffb84d" />

          {q.shader && <AuroraBackdrop pointer={pointer} reduced={prefersReduced} />}
          <Crystal quality={q} progress={progress} compact={isCompact} />
          <Particles count={q.particles} />
          <Rig pointer={pointer} progress={progress} compact={isCompact} />

          <Environment resolution={256}>
            <group>
              <Lightformer form="rect" intensity={3} position={[3, 3, 2]} scale={[4, 4, 1]} color="#5be9ff" />
              <Lightformer form="rect" intensity={2.5} position={[-4, -2, 1]} scale={[4, 4, 1]} color="#6fa8ff" />
              <Lightformer form="circle" intensity={2} position={[0, 4, -3]} scale={[3, 3, 1]} color="#ffd27a" />
            </group>
          </Environment>

          {q.bloom && (
            <EffectComposer disableNormalPass>
              <Bloom intensity={0.85} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      <style>{`
        .cine-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cine-canvas canvas { touch-action: none; }
      `}</style>
    </div>
  );
};

export default CinematicScene;
