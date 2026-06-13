import{a as l,j as t}from"./motion-BCcaUrQT.js";import{u as p,C as x,E as b,L as m,a as y,B as w,F as M,I as g,M as j,b as C}from"./r3f-O0cwfIJe.js";import{t as d,c as P}from"./three-C3Zk3Umg.js";const I=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,R=`
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
`;function B({pointer:o,reduced:r=!1}){const e=l.useRef(),n=l.useMemo(()=>({uTime:{value:0},uPointer:{value:new P(0,0)},uColorA:{value:new d("#5be9ff")},uColorMid:{value:new d("#6fa8ff")},uColorB:{value:new d("#ffb84d")},uBase:{value:new d("#05060d")}}),[]);return p((s,c)=>{r||(n.uTime.value+=Math.min(c,.05)),o!=null&&o.current&&(n.uPointer.value.x+=(o.current.x-n.uPointer.value.x)*.04,n.uPointer.value.y+=(o.current.y-n.uPointer.value.y)*.04)}),t.jsxs("mesh",{position:[0,0,-4],scale:[40,24,1],children:[t.jsx("planeGeometry",{args:[1,1]}),t.jsx("shaderMaterial",{ref:e,uniforms:n,vertexShader:I,fragmentShader:R,depthWrite:!1})]})}const k=new d("#05060d"),f=(o,r,e,n)=>o+(r-o)*(1-Math.exp(-e*n));function A({quality:o,progress:r}){const e=l.useRef(),n=l.useRef();return p((s,c)=>{if(!e.current)return;const i=r.current;e.current.rotation.y+=c*.15,e.current.rotation.x=Math.sin(i*Math.PI*2)*.6+s.clock.elapsedTime*.04,e.current.rotation.z=i*Math.PI*1.5;const a=Math.sin(i*Math.PI*2)*2.5,u=Math.cos(i*Math.PI)*.6,h=1+Math.sin(i*Math.PI)*.35;e.current.position.x=f(e.current.position.x,a,4,c),e.current.position.y=f(e.current.position.y,u,4,c);const v=f(e.current.scale.x,h,4,c);e.current.scale.setScalar(v),n.current&&(n.current.distortion=.35+i*.55,n.current.temporalDistortion=.15+i*.2)}),t.jsx(M,{speed:1.2,rotationIntensity:.5,floatIntensity:1.2,children:t.jsx(g,{ref:e,args:[1.6,o.detail],children:t.jsx(j,{ref:n,samples:o.samples,resolution:o.resolution,thickness:1.7,roughness:.16,ior:1.43,chromaticAberration:.7,anisotropy:.4,distortion:.4,distortionScale:.55,temporalDistortion:.18,transmission:1,color:"#bfe9ff",attenuationColor:"#6fa8ff",attenuationDistance:1.3,background:k})})})}function L({count:o=300}){const r=l.useRef(),e=l.useMemo(()=>{const n=new Float32Array(o*3);for(let s=0;s<o;s++){const c=3.4+Math.random()*5,i=Math.random()*Math.PI*2,a=Math.acos(2*Math.random()-1);n[s*3]=c*Math.sin(a)*Math.cos(i),n[s*3+1]=c*Math.sin(a)*Math.sin(i),n[s*3+2]=c*Math.cos(a)}return n},[o]);return p((n,s)=>{r.current&&(r.current.rotation.y+=s*.03,r.current.rotation.x+=s*.008)}),t.jsxs("points",{ref:r,children:[t.jsx("bufferGeometry",{children:t.jsx("bufferAttribute",{attach:"attributes-position",args:[e,3]})}),t.jsx("pointsMaterial",{size:.026,color:"#9fd8ff",transparent:!0,opacity:.7,sizeAttenuation:!0,depthWrite:!1})]})}function S({pointer:o,progress:r}){const{camera:e}=C();return p((n,s)=>{const c=r.current,i=6-Math.sin(c*Math.PI)*2.2,a=o.current.x*.5,u=o.current.y*.35;e.position.z=f(e.position.z,i,3,s),e.position.x=f(e.position.x,a,4,s),e.position.y=f(e.position.y,u,4,s),e.lookAt(0,0,0)}),null}function T(){if(typeof window>"u")return"high";const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=window.matchMedia("(pointer: coarse)").matches,e=window.innerWidth<768,n=(navigator.hardwareConcurrency||8)<=4;return o||r||e||n?"low":"high"}const E={high:{detail:12,samples:5,resolution:288,particles:320,dpr:[1,1.6],bloom:!0,shader:!0},low:{detail:6,samples:2,resolution:192,particles:120,dpr:[1,1.2],bloom:!1,shader:!1}},z=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,D=({progress:o})=>{const r=l.useRef({x:0,y:0}),e=l.useRef(null),[n,s]=l.useState(!0),[c]=l.useState(T),i=E[c];return l.useEffect(()=>{const a=u=>{r.current.x=u.clientX/window.innerWidth*2-1,r.current.y=-(u.clientY/window.innerHeight*2-1)};return window.addEventListener("mousemove",a),()=>window.removeEventListener("mousemove",a)},[]),l.useEffect(()=>{const a=e.current;if(!a)return;const u=new IntersectionObserver(([h])=>s(h.isIntersecting),{threshold:.01});return u.observe(a),()=>u.disconnect()},[]),t.jsxs("div",{className:"cine-canvas","aria-hidden":"true",ref:e,children:[t.jsx(x,{dpr:i.dpr,frameloop:n?"always":"never",camera:{position:[0,0,6],fov:38},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},onCreated:({gl:a})=>a.setClearColor(0,0),fallback:null,children:t.jsxs(l.Suspense,{fallback:null,children:[t.jsx("ambientLight",{intensity:.4}),t.jsx("pointLight",{position:[5,5,5],intensity:45,color:"#5be9ff"}),t.jsx("pointLight",{position:[-5,-3,2],intensity:35,color:"#6fa8ff"}),t.jsx("pointLight",{position:[0,-4,-4],intensity:28,color:"#ffb84d"}),i.shader&&t.jsx(B,{pointer:r,reduced:z}),t.jsx(A,{quality:i,progress:o}),t.jsx(L,{count:i.particles}),t.jsx(S,{pointer:r,progress:o}),t.jsx(b,{resolution:256,children:t.jsxs("group",{children:[t.jsx(m,{form:"rect",intensity:3,position:[3,3,2],scale:[4,4,1],color:"#5be9ff"}),t.jsx(m,{form:"rect",intensity:2.5,position:[-4,-2,1],scale:[4,4,1],color:"#6fa8ff"}),t.jsx(m,{form:"circle",intensity:2,position:[0,4,-3],scale:[3,3,1],color:"#ffd27a"})]})}),i.bloom&&t.jsx(y,{disableNormalPass:!0,children:t.jsx(w,{intensity:.85,luminanceThreshold:.2,luminanceSmoothing:.9,mipmapBlur:!0})})]})}),t.jsx("style",{children:`
        .cine-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cine-canvas canvas { touch-action: none; }
      `})]})};export{D as default};
//# sourceMappingURL=CinematicScene-CGQB3oov.js.map
