const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HeroScene-d-fyI4Yy.js","assets/motion-BCcaUrQT.js","assets/r3f-CJZ69C3a.js","assets/three-BHRD6xqQ.js"])))=>i.map(i=>d[i]);
import{j as e,a as m,m as r}from"./motion-BCcaUrQT.js";import{_ as p}from"./r3f-CJZ69C3a.js";import{c as x,M as h,L as o,I as d,u as g}from"./index-Bvq5MNYu.js";import{u,P as v}from"./useGetProjects-CEKHsI5b.js";import"./three-BHRD6xqQ.js";import"./paths-Bu_35hHc.js";/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M12 5l0 14",key:"svg-0"}],["path",{d:"M18 13l-6 6",key:"svg-1"}],["path",{d:"M6 13l6 6",key:"svg-2"}]],j=x("outline","arrow-down","ArrowDown",_),f=m.lazy(()=>p(()=>import("./HeroScene-d-fyI4Yy.js"),__vite__mapDeps([0,1,2,3]))),b={hidden:{},show:{transition:{staggerChildren:.09,delayChildren:.15}}},n={hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:.9,ease:[.16,1,.3,1]}}},y=()=>e.jsxs("section",{className:"hero",children:[e.jsx(m.Suspense,{fallback:null,children:e.jsx(f,{})}),e.jsx("div",{className:"hero__vignette","aria-hidden":"true"}),e.jsx("div",{className:"container hero__content",children:e.jsxs(r.div,{variants:b,initial:"hidden",animate:"show",children:[e.jsx(r.p,{variants:n,className:"eyebrow hero__eyebrow",children:"Full Stack Developer  /  ML Engineer"}),e.jsxs(r.h1,{variants:n,className:"hero__title display",children:["Crafting ",e.jsx("span",{className:"gradient-text",children:"intelligent"}),e.jsx("br",{}),"digital experiences."]}),e.jsx(r.p,{variants:n,className:"hero__sub",children:"I’m Hassan Shahzad — I design and engineer performant, immersive software, from AWS-scale data pipelines to interactive web worlds."}),e.jsxs(r.div,{variants:n,className:"hero__actions",children:[e.jsx(h,{strength:.4,children:e.jsxs(o,{to:"/projects",className:"btn btn--primary btn--lg",children:[e.jsx("span",{children:"View my work"}),e.jsx(d,{size:19})]})}),e.jsx(h,{strength:.4,children:e.jsx(o,{to:"/contact",className:"btn btn--ghost btn--lg",children:e.jsx("span",{children:"Get in touch"})})})]})]})}),e.jsxs(r.div,{className:"hero__scroll",initial:{opacity:0},animate:{opacity:1},transition:{delay:1.4,duration:.8},children:[e.jsx("span",{className:"eyebrow",children:"Scroll"}),e.jsx(j,{size:16})]}),e.jsx("style",{children:`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
              130% 90% at 50% 10%,
              transparent 40%,
              rgba(6, 7, 11, 0.7) 100%
            );
        }
        .hero__content {
          position: relative;
          z-index: 2;
        }
        .hero__eyebrow {
          margin-bottom: 1.6rem;
        }
        .hero__title {
          font-size: clamp(2.8rem, 9.5vw, 8rem);
          letter-spacing: -0.035em;
          margin-bottom: 1.8rem;
          max-width: 14ch;
        }
        .hero__sub {
          max-width: 46ch;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: var(--ink-dim);
          margin-bottom: 2.6rem;
        }
        .hero__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero__scroll {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink-mute);
        }
        .hero__scroll svg {
          animation: bob 1.8s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `})]}),w=({items:s=[]})=>{const t=[...s,...s];return e.jsx("div",{className:"marquee","aria-hidden":"true",children:e.jsx("div",{className:"marquee__track",children:t.map((i,l)=>e.jsx("span",{className:"marquee__item",children:i},`${i}-${l}`))})})},N=[{value:"5+",label:"Years building"},{value:"20+",label:"Shipped projects"},{value:"4",label:"Continents worked across"},{value:"∞",label:"Cups of coffee"}],k=["React","TypeScript","Python","Three.js","Node.js","GraphQL","TensorFlow","AWS","Docker","Rust","PostgreSQL"],C=()=>{const s=g(),{projects:t}=u(),i=m.useMemo(()=>t.filter(a=>a.featured).slice(0,6),[t]),l=a=>{s(`/projects?project=${a.id}`)};return e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx(w,{items:k}),e.jsx("section",{className:"section container",children:e.jsxs("div",{className:"intro",children:[e.jsxs("div",{className:"intro__lead","data-reveal":!0,children:[e.jsx("span",{className:"eyebrow",children:"About"}),e.jsxs("p",{className:"intro__text",children:["I’m a results-driven engineer with a passion for the space where",e.jsx("span",{className:"gradient-text",children:" clean architecture meets beautiful interfaces"}),". From Fortune-50 microservices to research-grade data platforms, I build things that are fast, thoughtful, and a little bit magical."]}),e.jsxs(o,{to:"/about",className:"intro__more",children:["More about me ",e.jsx(d,{size:18})]})]}),e.jsx("div",{className:"intro__stats",children:N.map((a,c)=>e.jsxs("div",{className:"stat","data-reveal":!0,"data-reveal-delay":c*80,children:[e.jsx("span",{className:"stat__value display gradient-text",children:a.value}),e.jsx("span",{className:"stat__label",children:a.label})]},a.label))})]})}),e.jsxs("section",{className:"section container",children:[e.jsxs("div",{className:"section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"section-index","data-reveal":!0,children:"02 — Selected Work"}),e.jsx("h2",{className:"section-title","data-reveal":!0,"data-reveal-delay":80,children:"Featured projects"})]}),e.jsxs(o,{to:"/projects",className:"btn btn--ghost","data-reveal":!0,"data-reveal-delay":120,children:[e.jsx("span",{children:"All projects"}),e.jsx(d,{size:17})]})]}),e.jsx("div",{className:"grid-3",children:i.map((a,c)=>e.jsx(v,{project:a,index:c,onOpen:l},a.id))})]}),e.jsx("style",{children:`
        .intro {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }
        .intro__text {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-block: 1.4rem 2rem;
        }
        .intro__more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--cyan);
          font-weight: 500;
        }
        .intro__more:hover {
          gap: 0.8rem;
        }
        .intro__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .stat {
          background: var(--bg-soft);
          padding: clamp(1.4rem, 3vw, 2.2rem);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .stat__value {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          line-height: 1;
        }
        .stat__label {
          color: var(--ink-mute);
          font-size: 0.88rem;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }
        @media (max-width: 980px) {
          .intro {
            grid-template-columns: 1fr;
          }
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `})]})};export{C as default};
//# sourceMappingURL=Home-CZnPmZvO.js.map
