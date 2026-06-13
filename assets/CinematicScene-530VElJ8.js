import{a as c,j as t}from"./motion-BCcaUrQT.js";import{u as p,C as w,E as y,L as v,a as M,B as g,F as j,I as C,M as P,b as R}from"./r3f-O0cwfIJe.js";import{t as h,c as I}from"./three-C3Zk3Umg.js";const E=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,L=`
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
`;function B({pointer:o,reduced:n=!1}){const r=c.useRef(),e=c.useMemo(()=>({uTime:{value:0},uPointer:{value:new I(0,0)},uColorA:{value:new h("#5be9ff")},uColorMid:{value:new h("#6fa8ff")},uColorB:{value:new h("#ffb84d")},uBase:{value:new h("#05060d")}}),[]);return p((a,u)=>{n||(e.uTime.value+=Math.min(u,.05)),o!=null&&o.current&&(e.uPointer.value.x+=(o.current.x-e.uPointer.value.x)*.04,e.uPointer.value.y+=(o.current.y-e.uPointer.value.y)*.04)}),t.jsxs("mesh",{position:[0,0,-4],scale:[40,24,1],children:[t.jsx("planeGeometry",{args:[1,1]}),t.jsx("shaderMaterial",{ref:r,uniforms:e,vertexShader:E,fragmentShader:L,depthWrite:!1})]})}const k=new h("#05060d"),d=(o,n,r,e)=>o+(n-o)*(1-Math.exp(-r*e));function A({quality:o,progress:n,compact:r}){const e=c.useRef(),a=c.useRef();return p((u,f)=>{if(!e.current)return;const i=n.current;e.current.rotation.y+=f*.15,e.current.rotation.x=Math.sin(i*Math.PI*2)*.6+u.clock.elapsedTime*.04,e.current.rotation.z=i*Math.PI*1.5;const s=Math.sin(i*Math.PI*2)*(r?.55:2.5),l=(r?1:0)+Math.cos(i*Math.PI)*(r?.3:.6),m=(r?.78:1)+Math.sin(i*Math.PI)*(r?.14:.35);e.current.position.x=d(e.current.position.x,s,4,f),e.current.position.y=d(e.current.position.y,l,4,f);const b=d(e.current.scale.x,m,4,f);e.current.scale.setScalar(b),a.current&&(a.current.distortion=.35+i*.55,a.current.temporalDistortion=.15+i*.2)}),t.jsx(j,{speed:1.2,rotationIntensity:.5,floatIntensity:1.2,children:t.jsx(C,{ref:e,args:[1.6,o.detail],children:t.jsx(P,{ref:a,samples:o.samples,resolution:o.resolution,thickness:1.7,roughness:.16,ior:1.43,chromaticAberration:.7,anisotropy:.4,distortion:.4,distortionScale:.55,temporalDistortion:.18,transmission:1,color:"#bfe9ff",attenuationColor:"#6fa8ff",attenuationDistance:1.3,background:k})})})}function S({count:o=300}){const n=c.useRef(),r=c.useMemo(()=>{const e=new Float32Array(o*3);for(let a=0;a<o;a++){const u=3.4+Math.random()*5,f=Math.random()*Math.PI*2,i=Math.acos(2*Math.random()-1);e[a*3]=u*Math.sin(i)*Math.cos(f),e[a*3+1]=u*Math.sin(i)*Math.sin(f),e[a*3+2]=u*Math.cos(i)}return e},[o]);return p((e,a)=>{n.current&&(n.current.rotation.y+=a*.03,n.current.rotation.x+=a*.008)}),t.jsxs("points",{ref:n,children:[t.jsx("bufferGeometry",{children:t.jsx("bufferAttribute",{attach:"attributes-position",args:[r,3]})}),t.jsx("pointsMaterial",{size:.026,color:"#9fd8ff",transparent:!0,opacity:.7,sizeAttenuation:!0,depthWrite:!1})]})}function T({pointer:o,progress:n,compact:r}){const{camera:e}=R();return p((a,u)=>{const f=n.current,i=(r?6.6:6)-Math.sin(f*Math.PI)*(r?1:2.2),s=o.current.x*.5,l=o.current.y*.35;e.position.z=d(e.position.z,i,3,u),e.position.x=d(e.position.x,s,4,u),e.position.y=d(e.position.y,l,4,u),e.lookAt(0,0,0)}),null}function z(){if(typeof window>"u")return"high";const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=window.matchMedia("(pointer: coarse)").matches,r=window.innerWidth<768,e=(navigator.hardwareConcurrency||8)<=4;return o||n||r||e?"low":"high"}const _={high:{detail:12,samples:5,resolution:288,particles:320,dpr:[1,1.6],bloom:!0,shader:!0},low:{detail:6,samples:2,resolution:192,particles:120,dpr:[1,1.2],bloom:!1,shader:!1}},D=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,x=typeof window<"u"&&window.innerWidth<768,G=({progress:o})=>{const n=c.useRef({x:0,y:0}),r=c.useRef(null),e=c.useRef(null),[a,u]=c.useState(!0),[f]=c.useState(z),i=_[f];return c.useEffect(()=>()=>{var l;const s=e.current;if(s){try{s.dispose(),(l=s.forceContextLoss)==null||l.call(s)}catch{}e.current=null}},[]),c.useEffect(()=>{const s=l=>{n.current.x=l.clientX/window.innerWidth*2-1,n.current.y=-(l.clientY/window.innerHeight*2-1)};return window.addEventListener("mousemove",s),()=>window.removeEventListener("mousemove",s)},[]),c.useEffect(()=>{const s=r.current;if(!s)return;const l=new IntersectionObserver(([m])=>u(m.isIntersecting),{threshold:.01});return l.observe(s),()=>l.disconnect()},[]),t.jsxs("div",{className:"cine-canvas","aria-hidden":"true",ref:r,children:[t.jsx(w,{dpr:i.dpr,frameloop:a?"always":"never",camera:{position:[0,0,6],fov:38},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},onCreated:({gl:s})=>{e.current=s,s.setClearColor(0,0),s.domElement.addEventListener("webglcontextlost",l=>l.preventDefault(),!1)},fallback:null,children:t.jsxs(c.Suspense,{fallback:null,children:[t.jsx("ambientLight",{intensity:.4}),t.jsx("pointLight",{position:[5,5,5],intensity:45,color:"#5be9ff"}),t.jsx("pointLight",{position:[-5,-3,2],intensity:35,color:"#6fa8ff"}),t.jsx("pointLight",{position:[0,-4,-4],intensity:28,color:"#ffb84d"}),i.shader&&t.jsx(B,{pointer:n,reduced:D}),t.jsx(A,{quality:i,progress:o,compact:x}),t.jsx(S,{count:i.particles}),t.jsx(T,{pointer:n,progress:o,compact:x}),t.jsx(y,{resolution:256,children:t.jsxs("group",{children:[t.jsx(v,{form:"rect",intensity:3,position:[3,3,2],scale:[4,4,1],color:"#5be9ff"}),t.jsx(v,{form:"rect",intensity:2.5,position:[-4,-2,1],scale:[4,4,1],color:"#6fa8ff"}),t.jsx(v,{form:"circle",intensity:2,position:[0,4,-3],scale:[3,3,1],color:"#ffd27a"})]})}),i.bloom&&t.jsx(M,{disableNormalPass:!0,children:t.jsx(g,{intensity:.85,luminanceThreshold:.2,luminanceSmoothing:.9,mipmapBlur:!0})})]})}),t.jsx("style",{children:`
        .cine-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cine-canvas canvas { touch-action: none; }
      `})]})};export{G as default};
//# sourceMappingURL=CinematicScene-530VElJ8.js.map
