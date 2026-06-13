import{a as l,j as t}from"./motion-BCcaUrQT.js";import{u as p,C as w,E as y,L as m,a as M,B as g,F as j,I as C,M as P,b as I}from"./r3f-O0cwfIJe.js";import{t as h,c as R}from"./three-C3Zk3Umg.js";const B=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,k=`
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
`;function A({pointer:o,reduced:r=!1}){const i=l.useRef(),e=l.useMemo(()=>({uTime:{value:0},uPointer:{value:new R(0,0)},uColorA:{value:new h("#5be9ff")},uColorMid:{value:new h("#6fa8ff")},uColorB:{value:new h("#ffb84d")},uBase:{value:new h("#05060d")}}),[]);return p((s,c)=>{r||(e.uTime.value+=Math.min(c,.05)),o!=null&&o.current&&(e.uPointer.value.x+=(o.current.x-e.uPointer.value.x)*.04,e.uPointer.value.y+=(o.current.y-e.uPointer.value.y)*.04)}),t.jsxs("mesh",{position:[0,0,-4],scale:[40,24,1],children:[t.jsx("planeGeometry",{args:[1,1]}),t.jsx("shaderMaterial",{ref:i,uniforms:e,vertexShader:B,fragmentShader:k,depthWrite:!1})]})}const L=new h("#05060d"),f=(o,r,i,e)=>o+(r-o)*(1-Math.exp(-i*e));function S({quality:o,progress:r,compact:i}){const e=l.useRef(),s=l.useRef();return p((c,a)=>{if(!e.current)return;const n=r.current;e.current.rotation.y+=a*.15,e.current.rotation.x=Math.sin(n*Math.PI*2)*.6+c.clock.elapsedTime*.04,e.current.rotation.z=n*Math.PI*1.5;const u=Math.sin(n*Math.PI*2)*(i?.55:2.5),d=(i?1:0)+Math.cos(n*Math.PI)*(i?.3:.6),x=(i?.78:1)+Math.sin(n*Math.PI)*(i?.14:.35);e.current.position.x=f(e.current.position.x,u,4,a),e.current.position.y=f(e.current.position.y,d,4,a);const b=f(e.current.scale.x,x,4,a);e.current.scale.setScalar(b),s.current&&(s.current.distortion=.35+n*.55,s.current.temporalDistortion=.15+n*.2)}),t.jsx(j,{speed:1.2,rotationIntensity:.5,floatIntensity:1.2,children:t.jsx(C,{ref:e,args:[1.6,o.detail],children:t.jsx(P,{ref:s,samples:o.samples,resolution:o.resolution,thickness:1.7,roughness:.16,ior:1.43,chromaticAberration:.7,anisotropy:.4,distortion:.4,distortionScale:.55,temporalDistortion:.18,transmission:1,color:"#bfe9ff",attenuationColor:"#6fa8ff",attenuationDistance:1.3,background:L})})})}function T({count:o=300}){const r=l.useRef(),i=l.useMemo(()=>{const e=new Float32Array(o*3);for(let s=0;s<o;s++){const c=3.4+Math.random()*5,a=Math.random()*Math.PI*2,n=Math.acos(2*Math.random()-1);e[s*3]=c*Math.sin(n)*Math.cos(a),e[s*3+1]=c*Math.sin(n)*Math.sin(a),e[s*3+2]=c*Math.cos(n)}return e},[o]);return p((e,s)=>{r.current&&(r.current.rotation.y+=s*.03,r.current.rotation.x+=s*.008)}),t.jsxs("points",{ref:r,children:[t.jsx("bufferGeometry",{children:t.jsx("bufferAttribute",{attach:"attributes-position",args:[i,3]})}),t.jsx("pointsMaterial",{size:.026,color:"#9fd8ff",transparent:!0,opacity:.7,sizeAttenuation:!0,depthWrite:!1})]})}function E({pointer:o,progress:r,compact:i}){const{camera:e}=I();return p((s,c)=>{const a=r.current,n=(i?6.6:6)-Math.sin(a*Math.PI)*(i?1:2.2),u=o.current.x*.5,d=o.current.y*.35;e.position.z=f(e.position.z,n,3,c),e.position.x=f(e.position.x,u,4,c),e.position.y=f(e.position.y,d,4,c),e.lookAt(0,0,0)}),null}function z(){if(typeof window>"u")return"high";const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=window.matchMedia("(pointer: coarse)").matches,i=window.innerWidth<768,e=(navigator.hardwareConcurrency||8)<=4;return o||r||i||e?"low":"high"}const _={high:{detail:12,samples:5,resolution:288,particles:320,dpr:[1,1.6],bloom:!0,shader:!0},low:{detail:6,samples:2,resolution:192,particles:120,dpr:[1,1.2],bloom:!1,shader:!1}},F=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,v=typeof window<"u"&&window.innerWidth<768,G=({progress:o})=>{const r=l.useRef({x:0,y:0}),i=l.useRef(null),[e,s]=l.useState(!0),[c]=l.useState(z),a=_[c];return l.useEffect(()=>{const n=u=>{r.current.x=u.clientX/window.innerWidth*2-1,r.current.y=-(u.clientY/window.innerHeight*2-1)};return window.addEventListener("mousemove",n),()=>window.removeEventListener("mousemove",n)},[]),l.useEffect(()=>{const n=i.current;if(!n)return;const u=new IntersectionObserver(([d])=>s(d.isIntersecting),{threshold:.01});return u.observe(n),()=>u.disconnect()},[]),t.jsxs("div",{className:"cine-canvas","aria-hidden":"true",ref:i,children:[t.jsx(w,{dpr:a.dpr,frameloop:e?"always":"never",camera:{position:[0,0,6],fov:38},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},onCreated:({gl:n})=>n.setClearColor(0,0),fallback:null,children:t.jsxs(l.Suspense,{fallback:null,children:[t.jsx("ambientLight",{intensity:.4}),t.jsx("pointLight",{position:[5,5,5],intensity:45,color:"#5be9ff"}),t.jsx("pointLight",{position:[-5,-3,2],intensity:35,color:"#6fa8ff"}),t.jsx("pointLight",{position:[0,-4,-4],intensity:28,color:"#ffb84d"}),a.shader&&t.jsx(A,{pointer:r,reduced:F}),t.jsx(S,{quality:a,progress:o,compact:v}),t.jsx(T,{count:a.particles}),t.jsx(E,{pointer:r,progress:o,compact:v}),t.jsx(y,{resolution:256,children:t.jsxs("group",{children:[t.jsx(m,{form:"rect",intensity:3,position:[3,3,2],scale:[4,4,1],color:"#5be9ff"}),t.jsx(m,{form:"rect",intensity:2.5,position:[-4,-2,1],scale:[4,4,1],color:"#6fa8ff"}),t.jsx(m,{form:"circle",intensity:2,position:[0,4,-3],scale:[3,3,1],color:"#ffd27a"})]})}),a.bloom&&t.jsx(M,{disableNormalPass:!0,children:t.jsx(g,{intensity:.85,luminanceThreshold:.2,luminanceSmoothing:.9,mipmapBlur:!0})})]})}),t.jsx("style",{children:`
        .cine-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cine-canvas canvas { touch-action: none; }
      `})]})};export{G as default};
//# sourceMappingURL=CinematicScene-BhsnF5TY.js.map
