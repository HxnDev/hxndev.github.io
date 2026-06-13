import{a as d,j as e,A as x,m}from"./motion-BCcaUrQT.js";import{c as u,e as g,b as j,f as _,M as f,I as h}from"./index-CJqrJWQT.js";import{I as v}from"./IconMapPin-D118oSEO.js";import{I as b}from"./IconCheck-BSz7RZ3R.js";import"./r3f-O0cwfIJe.js";import"./three-C3Zk3Umg.js";/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M12 3a9 9 0 1 0 9 9",key:"svg-0"}]],w=u("outline","loader-2","Loader2",y),N=[{icon:g,label:"Email",value:"hassanshahzad.dev@gmail.com",href:"mailto:hassanshahzad.dev@gmail.com"},{icon:v,label:"Based in",value:"Geneva, Switzerland"}],k=[{icon:j,label:"GitHub",href:"https://github.com/HxnDev"},{icon:_,label:"LinkedIn",href:"https://www.linkedin.com/in/hassan-shahzad-2a6617212/"}],M=()=>{const[a,l]=d.useState({name:"",email:"",subject:"",message:""}),[c,r]=d.useState("idle"),i=s=>l(t=>({...t,[s.target.name]:s.target.value})),p=s=>{s.preventDefault(),r("sending");const t=encodeURIComponent(`${a.message}

— ${a.name} (${a.email})`),n=encodeURIComponent(a.subject||`Portfolio enquiry from ${a.name}`);setTimeout(()=>{window.location.href=`mailto:hassanshahzad.dev@gmail.com?subject=${n}&body=${t}`,r("sent"),l({name:"",email:"",subject:"",message:""})},900)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"aurora","aria-hidden":"true"}),e.jsx("section",{className:"section container page-top",children:e.jsxs("div",{className:"contact",children:[e.jsxs("div",{className:"contact__intro",children:[e.jsx("span",{className:"eyebrow","data-reveal":!0,children:"Contact"}),e.jsxs("h1",{className:"page-title display","data-reveal":!0,"data-reveal-delay":80,children:["Let’s make",e.jsx("br",{}),e.jsx("span",{className:"gradient-text",children:"something great."})]}),e.jsx("p",{className:"contact__lead","data-reveal":!0,"data-reveal-delay":140,children:"Got a project, a role, or a wild idea? I’m always up for a good conversation."}),e.jsx("div",{className:"contact__details",children:N.map(({icon:s,label:t,value:n,href:o})=>e.jsxs("div",{className:"contact__detail","data-reveal":!0,children:[e.jsx("span",{className:"contact__detail-icon",children:e.jsx(s,{size:20})}),e.jsxs("div",{children:[e.jsx("span",{className:"contact__detail-label",children:t}),o?e.jsx("a",{href:o,className:"contact__detail-value",children:n}):e.jsx("span",{className:"contact__detail-value",children:n})]})]},t))}),e.jsx("div",{className:"contact__socials",children:k.map(({icon:s,label:t,href:n})=>e.jsx(f,{strength:.3,children:e.jsxs("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"contact__social",children:[e.jsx(s,{size:20}),e.jsx("span",{children:t}),e.jsx(h,{size:15})]})},t))})]}),e.jsx("div",{className:"contact__form-wrap glass","data-reveal":!0,"data-reveal-delay":120,children:e.jsx(x,{mode:"wait",children:c==="sent"?e.jsxs(m.div,{className:"contact__success",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},children:[e.jsx("span",{className:"contact__success-icon",children:e.jsx(b,{size:34})}),e.jsx("h3",{children:"Message ready!"}),e.jsx("p",{children:"Your mail client should be open. Thanks for reaching out — talk soon."}),e.jsx("button",{className:"btn btn--ghost",onClick:()=>r("idle"),children:e.jsx("span",{children:"Send another"})})]},"sent"):e.jsxs(m.form,{onSubmit:p,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsx("h3",{className:"contact__form-title",children:"Send a message"}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"name",children:"Name"}),e.jsx("input",{id:"name",name:"name",value:a.name,onChange:i,required:!0})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{id:"email",name:"email",type:"email",value:a.email,onChange:i,required:!0})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"subject",children:"Subject"}),e.jsx("input",{id:"subject",name:"subject",value:a.subject,onChange:i})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"message",children:"Message"}),e.jsx("textarea",{id:"message",name:"message",value:a.message,onChange:i,required:!0})]}),e.jsx("button",{type:"submit",className:"btn btn--primary btn--lg contact__submit",disabled:c==="sending",children:c==="sending"?e.jsxs(e.Fragment,{children:[e.jsx(w,{size:18,className:"spin"}),e.jsx("span",{children:"Sending…"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Send message"}),e.jsx(h,{size:18})]})})]},"form")})})]})}),e.jsx("style",{children:`
        .contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 5rem);
          align-items: start;
        }
        .page-title {
          font-size: clamp(2.6rem, 8vw, 5.5rem);
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin-block: 1rem 1.4rem;
        }
        .contact__lead {
          color: var(--ink-dim);
          font-size: 1.1rem;
          max-width: 42ch;
          margin-bottom: 2.5rem;
        }
        .contact__details {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          margin-bottom: 2.2rem;
        }
        .contact__detail {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .contact__detail-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid var(--line);
          color: var(--cyan);
          flex-shrink: 0;
        }
        .contact__detail-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .contact__detail-value {
          font-size: 1.02rem;
          font-weight: 500;
        }
        a.contact__detail-value:hover {
          color: var(--cyan);
        }
        .contact__socials {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .contact__social {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .contact__social:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .contact__form-wrap {
          border-radius: var(--radius-lg);
          padding: clamp(1.6rem, 4vw, 2.6rem);
        }
        .contact__form-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          margin-bottom: 1.6rem;
        }
        .contact__submit {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .contact__submit:disabled {
          opacity: 0.7;
          cursor: wait;
        }
        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 2rem 0;
        }
        .contact__success-icon {
          display: grid;
          place-items: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--grad-ice);
          color: #07080d;
          box-shadow: var(--glow-cyan);
        }
        .contact__success h3 {
          font-family: var(--font-display);
          font-size: 1.6rem;
        }
        .contact__success p {
          color: var(--ink-dim);
          max-width: 36ch;
        }
        @media (max-width: 880px) {
          .contact { grid-template-columns: 1fr; }
        }
      `})]})};export{M as default};
//# sourceMappingURL=Contact-CauTGV82.js.map
