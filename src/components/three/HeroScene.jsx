import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Icosahedron,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const BG_COLOR = new THREE.Color('#06070b');

/* The frosted, refracting crystal at the heart of the hero. */
function Crystal({ quality }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.04;
    // Gentle pulse
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    ref.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.6}>
      <Icosahedron ref={ref} args={[1.65, quality.detail]}>
        <MeshTransmissionMaterial
          samples={quality.samples}
          resolution={quality.resolution}
          thickness={1.6}
          roughness={0.18}
          ior={1.42}
          chromaticAberration={0.6}
          anisotropy={0.4}
          distortion={0.45}
          distortionScale={0.5}
          temporalDistortion={0.18}
          transmission={1}
          color="#bfe9ff"
          attenuationColor="#9b6bff"
          attenuationDistance={1.4}
          background={BG_COLOR}
        />
      </Icosahedron>
    </Float>
  );
}

/* A drifting field of particles for depth. */
function Particles({ count = 380 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#7dffd6"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Tracks the cursor and parallaxes the whole rig. */
function Rig({ pointer }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* Pick a quality tier so weaker/mobile GPUs aren't asked to do the impossible. */
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
  high: { detail: 10, samples: 4, resolution: 256, particles: 300, dpr: [1, 1.5], bloom: true },
  low: { detail: 6, samples: 2, resolution: 192, particles: 130, dpr: [1, 1.2], bloom: false },
};

const HeroScene = () => {
  const pointer = useRef({ x: 0, y: 0 });
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [tier] = useState(getQuality);
  const q = QUALITY[tier];

  useEffect(() => {
    const handlePointer = e => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handlePointer);
    return () => window.removeEventListener('mousemove', handlePointer);
  }, []);

  // Stop rendering entirely when the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-canvas" aria-hidden="true" ref={wrapRef}>
      <Canvas
        dpr={q.dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        fallback={null}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[5, 5, 5]} intensity={40} color="#4af0ff" />
          <pointLight position={[-5, -3, 2]} intensity={35} color="#9b6bff" />
          <pointLight position={[0, -4, -4]} intensity={25} color="#ff5d9e" />

          <Crystal quality={q} />
          <Particles count={q.particles} />
          <Rig pointer={pointer} />

          <Environment resolution={256}>
            <group>
              <Lightformer
                form="rect"
                intensity={3}
                position={[3, 3, 2]}
                scale={[4, 4, 1]}
                color="#4af0ff"
              />
              <Lightformer
                form="rect"
                intensity={2.5}
                position={[-4, -2, 1]}
                scale={[4, 4, 1]}
                color="#9b6bff"
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 4, -3]}
                scale={[3, 3, 1]}
                color="#ff5d9e"
              />
            </group>
          </Environment>

          {q.bloom && (
            <EffectComposer disableNormalPass>
              <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
              <Vignette eskil={false} offset={0.25} darkness={0.85} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      <style>{`
        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-canvas canvas {
          touch-action: none;
        }
      `}</style>
    </div>
  );
};

export default HeroScene;
