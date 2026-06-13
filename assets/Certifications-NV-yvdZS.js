import{a as i,j as e}from"./motion-BCcaUrQT.js";import{C as o,I as u}from"./certifications-D1lvX2FB.js";import{I as g}from"./IconSearch-DvJ49RGx.js";import{I as f}from"./index-Bi5QapN1.js";import"./r3f-CJZ69C3a.js";import"./three-BHRD6xqQ.js";const p=s=>s.split("·")[0].trim(),k=()=>{const[s,c]=i.useState(""),[t,d]=i.useState("all"),h=i.useMemo(()=>{const r=new Set(o.map(a=>p(a.issuer)));return["all",...Array.from(r)]},[]),m=i.useMemo(()=>{const r=s.trim().toLowerCase();return o.filter(a=>{const l=t==="all"||p(a.issuer)===t,n=!r||a.title.toLowerCase().includes(r)||a.issuer.toLowerCase().includes(r);return l&&n})},[s,t]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"aurora","aria-hidden":"true"}),e.jsxs("section",{className:"section container page-top",children:[e.jsxs("div",{className:"page-head",children:[e.jsxs("span",{className:"eyebrow","data-reveal":!0,children:["Always learning — ",o.length," credentials"]}),e.jsx("h1",{className:"page-title display","data-reveal":!0,"data-reveal-delay":80,children:e.jsx("span",{className:"gradient-text",children:"Certifications"})}),e.jsx("p",{className:"page-lead","data-reveal":!0,"data-reveal-delay":140,children:"Verified courses and specializations spanning machine learning, cloud, and full-stack engineering. Every card links to its official credential."})]}),e.jsxs("div",{className:"filters","data-reveal":!0,children:[e.jsx("div",{className:"filters__cats",children:h.map(r=>e.jsx("button",{className:`chip ${t===r?"is-active":""}`,onClick:()=>d(r),children:r==="all"?"All issuers":r},r))}),e.jsxs("div",{className:"filters__search",children:[e.jsx(g,{size:18}),e.jsx("input",{type:"text",placeholder:"Search certifications…",value:s,onChange:r=>c(r.target.value)})]})]}),m.length>0?e.jsx("div",{className:"certs",children:m.map((r,a)=>{const l=r.url?"a":"div",n=r.url?{href:r.url,target:"_blank",rel:"noopener noreferrer"}:{};return e.jsxs(l,{...n,className:`cert ${r.url?"":"cert--static"}`,"data-reveal":!0,"data-reveal-delay":a%3*60,children:[e.jsx("span",{className:"cert__icon",children:e.jsx(u,{size:22})}),e.jsxs("span",{className:"cert__body",children:[e.jsx("span",{className:"cert__title",children:r.title}),e.jsxs("span",{className:"cert__meta",children:[r.issuer," · ",r.date]})]}),r.url&&e.jsx(f,{size:18,className:"cert__go"})]},r.title+a)})}):e.jsxs("div",{className:"empty",children:[e.jsx("p",{children:"No certifications match your search."}),e.jsx("button",{className:"btn btn--ghost",onClick:()=>{c(""),d("all")},children:e.jsx("span",{children:"Reset"})})]})]}),e.jsx("style",{children:`
        .page-top { padding-top: clamp(7rem, 14vh, 11rem); }
        .page-head { max-width: 720px; margin-bottom: 2.5rem; }
        .page-title {
          font-size: clamp(3rem, 11vw, 7rem);
          letter-spacing: -0.04em;
          margin-block: 1rem 1.4rem;
          line-height: 0.95;
        }
        .page-lead { color: var(--ink-dim); font-size: clamp(1rem, 2.2vw, 1.2rem); max-width: 56ch; }
        .filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .filters__cats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .chip {
          padding: 0.55rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-dim);
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .chip:hover { color: var(--ink); border-color: var(--line-strong); }
        .chip.is-active { background: var(--ink); color: #07080d; border-color: var(--ink); }
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
        .filters__search:focus-within { border-color: var(--cyan); color: var(--cyan); }
        .filters__search input {
          background: none; border: none; outline: none;
          color: var(--ink); font-family: var(--font-body); font-size: 0.92rem; width: 100%;
        }
        .certs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.3rem;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out), background 0.3s ease;
        }
        .cert:hover {
          border-color: var(--line-strong);
          transform: translateY(-3px);
          background: rgba(91, 233, 255, 0.04);
        }
        .cert--static { cursor: default; }
        .cert__icon {
          display: grid; place-items: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--grad-soft);
          color: var(--cyan);
          flex-shrink: 0;
        }
        .cert__body { display: flex; flex-direction: column; gap: 0.2rem; flex: 1; min-width: 0; }
        .cert__title { font-weight: 600; font-size: 0.98rem; line-height: 1.3; }
        .cert__meta { font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-mute); }
        .cert__go { color: var(--ink-mute); flex-shrink: 0; transition: color 0.25s ease, transform 0.25s ease; }
        .cert:hover .cert__go { color: var(--cyan); transform: translate(2px, -2px); }
        .empty {
          display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
          padding: 5rem 0; color: var(--ink-mute);
        }
        @media (max-width: 720px) {
          .certs { grid-template-columns: 1fr; }
          .filters__search { width: 100%; }
        }
      `})]})};export{k as default};
//# sourceMappingURL=Certifications-NV-yvdZS.js.map
