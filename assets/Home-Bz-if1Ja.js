const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CinematicScene-530VElJ8.js","assets/motion-BCcaUrQT.js","assets/r3f-O0cwfIJe.js","assets/three-C3Zk3Umg.js"])))=>i.map(i=>d[i]);
import{a as n,j as e}from"./motion-BCcaUrQT.js";import{_ as v}from"./r3f-O0cwfIJe.js";import{c as f,S as d,M as h,L as l,I as p,g as u,u as j}from"./index-DqaePfEn.js";import{S as _,M as N}from"./skills-D7m0TPy3.js";import{u as b,P as y}from"./useGetProjects-Dp6aZbQ_.js";import{R as w,I as k}from"./recommendations-DmZrROU2.js";import"./three-C3Zk3Umg.js";import"./paths-Bu_35hHc.js";/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M12 5l0 14",key:"svg-0"}],["path",{d:"M18 13l-6 6",key:"svg-1"}],["path",{d:"M6 13l6 6",key:"svg-2"}]],z=f("outline","arrow-down","ArrowDown",S),A=n.lazy(()=>v(()=>import("./CinematicScene-530VElJ8.js"),__vite__mapDeps([0,1,2,3])));u.registerPlugin(d);const I=[{org:"IBM",role:"Lead Full-Stack Developer",note:"Microservices · Kafka · CI/CD"},{org:"EPFL",role:"Senior Full-Stack Developer",note:"AWS data infra · research platforms"},{org:"AICA",role:"Frontend Engineer",note:"Robotics UI · TypeScript · Go"}],E=["Intro","Craft","Path","Numbers","Next"],g=[0,.22,.42,.64,.83],M=i=>{let r=0;for(let t=0;t<g.length;t++)i>=g[t]&&(r=t);return r},C=()=>{const i=n.useRef(null),r=n.useRef(0),t=n.useRef(0),[s,o]=n.useState(0);return n.useEffect(()=>{const a=i.current;if(!a)return;const c=d.create({trigger:a,start:"top top",end:"bottom bottom",scrub:!0,onUpdate:x=>{r.current=x.progress;const m=M(x.progress);m!==t.current&&(t.current=m,o(m))}});return d.refresh(),()=>c.kill()},[]),e.jsxs("section",{className:"stage",ref:i,children:[e.jsxs("div",{className:"stage__pin",children:[e.jsx(n.Suspense,{fallback:null,children:e.jsx(A,{progress:r})}),e.jsx("div",{className:"stage__vignette","aria-hidden":"true"}),e.jsx("div",{className:"stage__rail","aria-hidden":"true",children:E.map((a,c)=>e.jsxs("span",{className:`stage__tick ${c===s?"is-active":""} ${c<s?"is-done":""}`,children:[e.jsx("i",{}),e.jsx("em",{children:a})]},a))}),e.jsxs("div",{className:"stage__acts",children:[e.jsx("div",{className:`c-act c-act--left ${s===0?"is-active":""}`,children:e.jsxs("div",{className:"container",children:[e.jsx("p",{className:"eyebrow",children:"Senior Full-Stack Engineer  /  Geneva, CH"}),e.jsxs("h1",{className:"c-hero display",children:["Software, ",e.jsx("span",{className:"gradient-text",children:"engineered"}),e.jsx("br",{}),"to feel ",e.jsx("span",{className:"gradient-text--warm",children:"alive"}),"."]}),e.jsx("p",{className:"c-sub",children:"I’m Hassan Shahzad — a senior full-stack engineer who also designs and ships award-grade interfaces. This whole scene is hand-written GLSL, driven by your scroll."}),e.jsxs("div",{className:"c-actions",children:[e.jsx(h,{strength:.4,children:e.jsxs(l,{to:"/projects",className:"btn btn--primary btn--lg",children:[e.jsx("span",{children:"View my work"}),e.jsx(p,{size:19})]})}),e.jsx(h,{strength:.4,children:e.jsx(l,{to:"/contact",className:"btn btn--ghost btn--lg",children:e.jsx("span",{children:"Get in touch"})})})]})]})}),e.jsx("div",{className:`c-act c-act--left ${s===1?"is-active":""}`,children:e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"c-index",children:"01 — What I do"}),e.jsxs("h2",{className:"c-statement display",children:["I turn complex systems into interfaces that feel"," ",e.jsx("span",{className:"gradient-text",children:"inevitable"}),"."]})]})}),e.jsx("div",{className:`c-act c-act--right ${s===2?"is-active":""}`,children:e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"c-index",children:"02 — The path"}),e.jsx("h2",{className:"c-statement display c-statement--sm",children:"A global trajectory."}),e.jsx("ul",{className:"c-miles",children:I.map(a=>e.jsxs("li",{className:"c-mile",children:[e.jsx("span",{className:"c-mile__org gradient-text",children:a.org}),e.jsx("span",{className:"c-mile__role",children:a.role}),e.jsx("span",{className:"c-mile__note",children:a.note})]},a.org))})]})}),e.jsx("div",{className:`c-act c-act--center ${s===3?"is-active":""}`,children:e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"c-index",children:"03 — By the numbers"}),e.jsx("div",{className:"c-stats",children:_.map(a=>e.jsxs("div",{className:"c-stat",children:[e.jsx("span",{className:"c-stat__value display gradient-text",children:a.value}),e.jsx("span",{className:"c-stat__label",children:a.label})]},a.label))})]})}),e.jsx("div",{className:`c-act c-act--center ${s===4?"is-active":""}`,children:e.jsxs("div",{className:"container c-next",children:[e.jsx("span",{className:"c-index",children:"04 — Now the specifics"}),e.jsxs("h2",{className:"c-statement display",children:["Let’s get ",e.jsx("span",{className:"gradient-text--warm",children:"specific"}),"."]}),e.jsx("p",{className:"c-sub c-sub--center",children:"Keep scrolling — selected work and voices below."}),e.jsx(z,{size:22,className:"c-next__arrow"})]})})]})]}),e.jsx("style",{children:`
        .stage {
          position: relative;
          height: 460vh;
          z-index: 1;
        }
        .stage__pin {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
        }
        .stage__vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(125% 95% at 50% 12%, transparent 42%, rgba(5, 6, 13, 0.82) 100%);
        }
        .stage__acts {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .stage__rail {
          position: absolute;
          right: clamp(1rem, 3vw, 2.4rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .stage__tick {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          justify-content: flex-end;
        }
        .stage__tick i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: transparent;
          transition: all 0.4s var(--ease-out);
        }
        .stage__tick.is-done i { background: var(--ink-mute); border-color: var(--ink-mute); }
        .stage__tick.is-active i {
          background: var(--cyan);
          border-color: var(--cyan);
          box-shadow: var(--glow-cyan);
          transform: scale(1.4);
        }
        .stage__tick em {
          font-family: var(--font-mono);
          font-style: normal;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
          opacity: 0;
          transform: translateX(6px);
          transition: all 0.4s var(--ease-out);
        }
        .stage__tick.is-active em { opacity: 1; transform: none; color: var(--cyan); }

        .c-act {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
          pointer-events: none;
        }
        .c-act.is-active { opacity: 1; transform: none; pointer-events: auto; }
        .c-act--left .container { text-align: left; margin-right: auto; }
        .c-act--right { justify-content: flex-end; text-align: right; }
        .c-act--right .container { display: flex; flex-direction: column; align-items: flex-end; }
        .c-act--center { justify-content: center; text-align: center; }
        .c-act--center .container { display: flex; flex-direction: column; align-items: center; }

        .c-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
          display: block;
          margin-bottom: 1.2rem;
        }
        .c-hero {
          font-size: clamp(2.6rem, 9vw, 7.5rem);
          letter-spacing: -0.035em;
          margin-bottom: 1.6rem;
          max-width: 16ch;
        }
        .c-statement {
          font-size: clamp(2rem, 6vw, 4.6rem);
          line-height: 1.08;
          letter-spacing: -0.025em;
          max-width: 18ch;
        }
        .c-statement--sm { font-size: clamp(1.8rem, 5vw, 3.4rem); margin-bottom: 2rem; }
        .c-sub {
          max-width: 48ch;
          font-size: clamp(1rem, 2.2vw, 1.18rem);
          color: var(--ink-dim);
          margin-bottom: 2.4rem;
        }
        .c-sub--center { margin-inline: auto; }
        .c-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        .c-miles { display: flex; flex-direction: column; gap: 1.4rem; }
        .c-mile { display: flex; flex-direction: column; gap: 0.2rem; }
        .c-mile__org { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 700; }
        .c-mile__role { color: var(--ink); font-weight: 600; }
        .c-mile__note { font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-mute); letter-spacing: 0.04em; }

        .c-stats {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: clamp(1.6rem, 5vw, 4rem);
          margin-top: 1rem;
        }
        .c-stat { display: flex; flex-direction: column; gap: 0.3rem; }
        .c-stat__value { font-size: clamp(2.6rem, 7vw, 5rem); line-height: 1; }
        .c-stat__label { color: var(--ink-mute); font-size: 0.85rem; }

        .c-next__arrow { color: var(--ink-mute); margin-top: 1.4rem; animation: cbob 1.8s ease-in-out infinite; }
        @keyframes cbob { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(7px);} }

        @media (max-width: 860px) {
          .stage { height: 400vh; }
          /* Keep vertical centering (align-items lives on the row flex parent);
             only flip the horizontal alignment of right/center acts to the left. */
          .c-act { justify-content: flex-start; text-align: left; }
          .c-act--right { justify-content: flex-start; text-align: left; }
          .c-act--right .container,
          .c-act--center .container { align-items: flex-start; }
          .c-act--center { justify-content: flex-start; text-align: left; }
          .c-sub--center { margin-inline: 0; }
          .c-stats { grid-template-columns: repeat(2, 1fr); }
          .c-next { align-items: flex-start; }
          .stage__rail { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .c-next__arrow { animation: none; }
        }
      `})]})},T=({items:i=[]})=>{const r=[...i,...i];return e.jsx("div",{className:"marquee","aria-hidden":"true",children:e.jsx("div",{className:"marquee__track",children:r.map((t,s)=>e.jsx("span",{className:"marquee__item",children:t},`${t}-${s}`))})})},O=()=>{const i=j(),{projects:r}=b(),t=n.useMemo(()=>r.filter(a=>a.featured).slice(0,6),[r]),s=n.useMemo(()=>w.slice(0,3),[]),o=a=>{i(`/projects?project=${a.id}`)};return e.jsxs(e.Fragment,{children:[e.jsx(C,{}),e.jsx(T,{items:N}),e.jsxs("section",{className:"section container",children:[e.jsxs("div",{className:"section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"section-index","data-reveal":!0,children:"Selected work"}),e.jsx("h2",{className:"section-title","data-reveal":!0,"data-reveal-delay":80,children:"Featured projects"})]}),e.jsxs(l,{to:"/projects",className:"btn btn--ghost","data-reveal":!0,"data-reveal-delay":120,children:[e.jsx("span",{children:"All projects"}),e.jsx(p,{size:17})]})]}),e.jsx("div",{className:"grid-3",children:t.map((a,c)=>e.jsx(y,{project:a,index:c,onOpen:o},a.id))})]}),e.jsxs("section",{className:"section container",children:[e.jsxs("div",{className:"section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"section-index","data-reveal":!0,children:"Voices"}),e.jsx("h2",{className:"section-title","data-reveal":!0,"data-reveal-delay":80,children:"What colleagues say"})]}),e.jsxs(l,{to:"/recommendations",className:"btn btn--ghost","data-reveal":!0,"data-reveal-delay":120,children:[e.jsx("span",{children:"All 16 recommendations"}),e.jsx(p,{size:17})]})]}),e.jsx("div",{className:"grid-3",children:s.map((a,c)=>e.jsxs("figure",{className:"voice","data-reveal":!0,"data-reveal-delay":c*80,children:[e.jsx(k,{size:26,className:"voice__mark"}),e.jsx("blockquote",{className:"voice__quote",children:a.quote}),e.jsxs("figcaption",{className:"voice__who",children:[e.jsx("span",{className:"voice__name",children:a.name}),e.jsx("span",{className:"voice__title",children:a.title})]})]},a.name))})]}),e.jsx("style",{children:`
        .voice {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: clamp(1.4rem, 3vw, 2rem);
          background: var(--bg-elev);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          margin: 0;
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out);
        }
        .voice:hover { border-color: var(--line-strong); transform: translateY(-4px); }
        .voice__mark { color: var(--amber); opacity: 0.8; flex-shrink: 0; }
        .voice__quote {
          margin: 0;
          color: var(--ink-dim);
          font-size: 0.96rem;
          line-height: 1.62;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .voice__who { display: flex; flex-direction: column; gap: 0.15rem; margin-top: auto; }
        .voice__name { font-weight: 600; color: var(--ink); }
        .voice__title { font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-mute); }

        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        @media (max-width: 980px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr; } }
      `})]})};export{O as default};
//# sourceMappingURL=Home-Bz-if1Ja.js.map
