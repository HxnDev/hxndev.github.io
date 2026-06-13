import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Hand-written GLSL aurora field — no shader library, no Spline.
 * A single full-screen plane driven by domain-warped fractal noise (fbm),
 * tinted in the Aurora Noir palette (cyan → periwinkle → amber). It reacts
 * to the cursor and refracts through the crystal in front of it.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uPointer;
  uniform vec3  uColorA;   // cyan
  uniform vec3  uColorMid; // periwinkle
  uniform vec3  uColorB;   // amber
  uniform vec3  uBase;     // near-black

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(2.2, 1.4);
    p += uPointer * 0.25;

    float t = uTime * 0.05;

    // Domain warp for organic, flowing aurora ribbons.
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    float n = fbm(p + q * 1.6 + vec2(t * 1.5, 0.0));

    float ribbon = smoothstep(0.2, 0.9, n);
    float band = sin(uv.y * 3.0 + n * 3.0 + uTime * 0.15) * 0.5 + 0.5;

    vec3 col = uBase;
    col = mix(col, uColorMid, ribbon * 0.5);
    col = mix(col, uColorA, pow(ribbon, 2.0) * band * 0.7);
    col = mix(col, uColorB, pow(ribbon, 3.0) * (1.0 - band) * 0.5);

    // Radial falloff keeps the center calm and the edges deep.
    float d = length(uv - 0.5);
    col *= smoothstep(0.95, 0.2, d) * 0.9 + 0.1;

    // Global dim so the crystal and headline stay dominant.
    col *= 0.62;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AuroraBackdrop({ pointer, reduced = false }) {
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#5be9ff') },
      uColorMid: { value: new THREE.Color('#6fa8ff') },
      uColorB: { value: new THREE.Color('#ffb84d') },
      uBase: { value: new THREE.Color('#05060d') },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!reduced) uniforms.uTime.value += Math.min(delta, 0.05);
    if (pointer?.current) {
      uniforms.uPointer.value.x += (pointer.current.x - uniforms.uPointer.value.x) * 0.04;
      uniforms.uPointer.value.y += (pointer.current.y - uniforms.uPointer.value.y) * 0.04;
    }
  });

  return (
    <mesh position={[0, 0, -4]} scale={[40, 24, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}
