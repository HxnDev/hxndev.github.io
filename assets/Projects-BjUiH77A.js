import{a as t,j as e,A as w,m as h}from"./motion-BCcaUrQT.js";import{u as k,P as N}from"./useGetProjects-CfzuNOs4.js";import{r as z}from"./paths-Bu_35hHc.js";import{a as C,I as u,b as f,d as I,M as P}from"./index-ZGNjiYVs.js";import{I as S}from"./IconCheck-CvKkof76.js";import{I as A}from"./IconSearch-CA3JbJOg.js";import"./r3f-O0cwfIJe.js";import"./three-C3Zk3Umg.js";const E=({project:a,onClose:l})=>{var m;const[o,n]=t.useState(!1);t.useEffect(()=>{n(!1)},[a]),t.useEffect(()=>{const s=d=>d.key==="Escape"&&l();return a&&(document.addEventListener("keydown",s),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",s),document.body.style.overflow=""}},[a,l]);const c=a?o?a.fallbackImage:a.image?z(a.image):a.fallbackImage:null;return e.jsx(w,{children:a&&e.jsxs(h.div,{className:"pm",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:l,children:[e.jsxs(h.div,{className:"pm__panel glass",initial:{opacity:0,y:60,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:40,scale:.97},transition:{duration:.5,ease:[.16,1,.3,1]},onClick:s=>s.stopPropagation(),children:[e.jsx("button",{className:"pm__close",onClick:l,"aria-label":"Close",children:e.jsx(C,{size:22})}),e.jsx("div",{className:"pm__media",children:e.jsx("img",{src:c,alt:a.title,decoding:"async",onError:()=>n(!0)})}),e.jsxs("div",{className:"pm__body",children:[e.jsxs("div",{className:"pm__tags",children:[a.category&&e.jsx("span",{className:"tag tag--accent",children:a.category}),a.date&&e.jsx("span",{className:"tag",children:a.date})]}),e.jsx("h2",{className:"pm__title display",children:a.title}),e.jsx("p",{className:"pm__desc",children:a.longDescription||a.description}),((m=a.features)==null?void 0:m.length)>0&&e.jsxs("div",{className:"pm__features",children:[e.jsx("span",{className:"eyebrow",children:"Highlights"}),e.jsx("ul",{children:a.features.map(s=>e.jsxs("li",{children:[e.jsx(S,{size:16})," ",s]},s))})]}),e.jsx("div",{className:"pm__tech",children:(a.technologies||[]).map(s=>e.jsx("span",{className:"pcard__chip",children:s},s))}),e.jsxs("div",{className:"pm__actions",children:[a.liveUrl&&e.jsxs("a",{href:a.liveUrl,target:"_blank",rel:"noopener noreferrer",className:"btn btn--primary",children:[e.jsx("span",{children:"Live demo"}),e.jsx(u,{size:17})]}),a.githubUrl&&e.jsxs("a",{href:a.githubUrl,target:"_blank",rel:"noopener noreferrer",className:"btn btn--ghost",children:[e.jsx(f,{size:17}),e.jsx("span",{children:"View code"})]})]})]})]}),e.jsx("style",{children:`
            .pm {
              position: fixed;
              inset: 0;
              z-index: 9500;
              display: grid;
              place-items: center;
              padding: 1.2rem;
              background: rgba(4, 5, 8, 0.7);
              backdrop-filter: blur(8px);
            }
            .pm__panel {
              position: relative;
              width: min(860px, 100%);
              max-height: 90vh;
              overflow-y: auto;
              border-radius: var(--radius-lg);
            }
            .pm__panel::-webkit-scrollbar { width: 8px; }
            .pm__close {
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 2;
              width: 42px;
              height: 42px;
              display: grid;
              place-items: center;
              border-radius: 50%;
              background: rgba(6, 7, 11, 0.6);
              color: var(--ink);
              transition: all 0.25s ease;
            }
            .pm__close:hover {
              background: var(--pink);
              color: #07080d;
            }
            .pm__media {
              aspect-ratio: 16 / 8;
              overflow: hidden;
            }
            .pm__media img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .pm__body {
              padding: clamp(1.5rem, 4vw, 2.6rem);
            }
            .pm__tags {
              display: flex;
              gap: 0.5rem;
              margin-bottom: 1rem;
            }
            .pm__title {
              font-size: clamp(2rem, 5vw, 3rem);
              margin-bottom: 1rem;
            }
            .pm__desc {
              color: var(--ink-dim);
              font-size: 1.02rem;
              line-height: 1.7;
              margin-bottom: 1.8rem;
            }
            .pm__features {
              margin-bottom: 1.8rem;
            }
            .pm__features ul {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 0.7rem;
              margin-top: 0.9rem;
            }
            .pm__features li {
              display: flex;
              align-items: flex-start;
              gap: 0.5rem;
              color: var(--ink-dim);
              font-size: 0.92rem;
            }
            .pm__features li svg {
              color: var(--cyan);
              flex-shrink: 0;
              margin-top: 3px;
            }
            .pm__tech {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              margin-bottom: 2rem;
            }
            .pm__actions {
              display: flex;
              gap: 0.9rem;
              flex-wrap: wrap;
            }
            @media (max-width: 560px) {
              .pm__features ul {
                grid-template-columns: 1fr;
              }
            }
          `})]})})},L={all:"All",web:"Web",ai:"AI / ML",mobile:"Mobile",game:"Games",tool:"Tools"},O=()=>{const{projects:a}=k(),[l,o]=t.useState(""),[n,c]=t.useState("all"),[m,s]=t.useState(null),[d,g]=I(),_=t.useMemo(()=>{const r=new Set(a.map(i=>i.category).filter(Boolean));return["all",...Array.from(r)]},[a]),x=t.useMemo(()=>{const r=l.trim().toLowerCase();return a.filter(i=>{const p=n==="all"||i.category===n,y=!r||i.title.toLowerCase().includes(r)||i.description.toLowerCase().includes(r)||(i.technologies||[]).some(j=>j.toLowerCase().includes(r));return p&&y})},[a,n,l]);t.useEffect(()=>{const r=d.get("project");if(r&&a.length){const i=a.find(p=>p.id===r);i&&s(i)}},[d,a]);const v=r=>{s(r),g({project:r.id},{replace:!0})},b=()=>{s(null),g({},{replace:!0})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"aurora","aria-hidden":"true"}),e.jsxs("section",{className:"section container page-top",children:[e.jsxs("div",{className:"page-head",children:[e.jsxs("span",{className:"eyebrow","data-reveal":!0,children:["Portfolio — ",a.length," projects"]}),e.jsxs("h1",{className:"page-title display","data-reveal":!0,"data-reveal-delay":80,children:["Selected ",e.jsx("span",{className:"gradient-text",children:"work"})]}),e.jsx("p",{className:"page-lead","data-reveal":!0,"data-reveal-delay":140,children:"A collection of things I’ve designed, engineered, and shipped — spanning AI, full-stack web, computer vision, and playful experiments."})]}),e.jsxs("div",{className:"filters","data-reveal":!0,children:[e.jsx("div",{className:"filters__cats",children:_.map(r=>e.jsx("button",{className:`chip ${n===r?"is-active":""}`,onClick:()=>c(r),children:L[r]||r},r))}),e.jsxs("div",{className:"filters__search",children:[e.jsx(A,{size:18}),e.jsx("input",{type:"text",placeholder:"Search projects…",value:l,onChange:r=>o(r.target.value)})]})]}),x.length>0?e.jsx(h.div,{layout:!0,className:"grid-3",children:x.map((r,i)=>e.jsx(N,{project:r,index:i,onOpen:v},r.id))}):e.jsxs("div",{className:"empty",children:[e.jsx("p",{children:"No projects match your filters."}),e.jsx("button",{className:"btn btn--ghost",onClick:()=>{o(""),c("all")},children:e.jsx("span",{children:"Reset filters"})})]}),e.jsxs("div",{className:"gh-cta","data-reveal":!0,children:[e.jsxs("div",{className:"gh-cta__text",children:[e.jsx(f,{size:26,className:"gh-cta__icon"}),e.jsxs("div",{children:[e.jsx("h3",{className:"gh-cta__title",children:"This is just a slice."}),e.jsx("p",{className:"gh-cta__sub",children:"40+ shipped projects and counting — explore the full archive, source code, and experiments on GitHub."})]})]}),e.jsx(P,{strength:.35,children:e.jsxs("a",{href:"https://github.com/HxnDev",target:"_blank",rel:"noopener noreferrer",className:"btn btn--primary btn--lg","data-cursor-label":"GitHub",children:[e.jsx("span",{children:"See more on GitHub"}),e.jsx(u,{size:19})]})})]})]}),e.jsx(E,{project:m,onClose:b}),e.jsx("style",{children:`
        .page-top {
          padding-top: clamp(7rem, 14vh, 11rem);
        }
        .page-head {
          max-width: 720px;
          margin-bottom: 3rem;
        }
        .page-title {
          font-size: clamp(3rem, 11vw, 7rem);
          letter-spacing: -0.04em;
          margin-block: 1rem 1.4rem;
          line-height: 0.95;
        }
        .page-lead {
          color: var(--ink-dim);
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          max-width: 56ch;
        }
        .filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .filters__cats {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .chip {
          padding: 0.55rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-dim);
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .chip:hover {
          color: var(--ink);
          border-color: var(--line-strong);
        }
        .chip.is-active {
          background: var(--ink);
          color: #07080d;
          border-color: var(--ink);
        }
        .filters__search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-mute);
          min-width: 240px;
        }
        .filters__search:focus-within {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .filters__search input {
          background: none;
          border: none;
          outline: none;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.92rem;
          width: 100%;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding: 5rem 0;
          color: var(--ink-mute);
        }
        .gh-cta {
          margin-top: clamp(3rem, 7vw, 5rem);
          padding: clamp(1.6rem, 4vw, 2.6rem);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          background:
            radial-gradient(120% 140% at 0% 0%, rgba(91, 233, 255, 0.08), transparent 55%),
            radial-gradient(120% 140% at 100% 100%, rgba(255, 184, 77, 0.08), transparent 55%),
            var(--bg-elev);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.8rem;
          flex-wrap: wrap;
        }
        .gh-cta__text {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          max-width: 60ch;
        }
        .gh-cta__icon { color: var(--cyan); flex-shrink: 0; margin-top: 0.2rem; }
        .gh-cta__title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          letter-spacing: -0.01em;
          margin-bottom: 0.35rem;
        }
        .gh-cta__sub { color: var(--ink-dim); line-height: 1.55; }
        @media (max-width: 640px) {
          .gh-cta { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 980px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr; }
          .filters__search { width: 100%; }
        }
      `})]})};export{O as default};
//# sourceMappingURL=Projects-BjUiH77A.js.map
