import{j as e}from"./motion-BCcaUrQT.js";import{r as s}from"./paths-Bu_35hHc.js";const r=["I am a results-driven Full Stack Developer with 6 years of experience designing and deploying scalable applications, optimizing system performance, and leading teams. My expertise spans frontend, backend, cloud infrastructure, and DevOps — letting me build high-impact solutions for Fortune-50 companies and cutting-edge research alike.","With a strong foundation in Python, Java, JavaScript, and Rust, I specialize in performant, secure, and maintainable software: AWS pipelines that move faster, React apps that feel effortless, and microservices that scale cleanly.","I love the hard problems — end-to-end ownership from system design to deployment, always balancing engineering rigor with delightful user experience."],n=[{name:"JavaScript / TypeScript / ReactJS",level:95},{name:"Python",level:95},{name:"React / Next.js",level:95},{name:"Node.js / GraphQL",level:88},{name:"Java",level:90},{name:"Rust / C++",level:70},{name:"TensorFlow / PyTorch",level:75},{name:"AWS / Docker",level:80},{name:"SQL / NoSQL",level:90}],o=[{role:"Frontend Engineer",company:"AICA",date:"Mar 2025 — Present",points:["Built AICA’s frontend architecture and UI using ReactJS, TypeScript, and Flowbite, including new interfaces, animations, and reusablecomponents.","Contributed to backend APIs and Go middleware to support frontend integration and robotics-related workflows.","Reviewed pull requests and wrote test cases/test suites to improve code quality and application reliability."]},{role:"Senior Full Stack Software Developer",company:"EPFL",date:"Mar 2024 — Feb 2025",points:["Designed and deployed scalable data infrastructure for GBDI (Global Building Data Initiative), improving data processing speed by 30% via optimized AWS pipelines.","Engineered ReactJS apps and APIs resolving critical user pain points for a global building-materials database."]},{role:"Lead Full Stack Developer",company:"IBM",date:"Jul 2022 — Nov 2023",points:["Led development of a microservices architecture, reducing deployment time by 75%.","Designed CI/CD pipelines for containerized applications on AWS, dramatically increasing delivery speed."]},{role:"Full Stack Developer",company:"Shanghai Zixel",date:"Apr 2022 — Jul 2022",points:["Built microservices-based applications, reducing response time by 40%.","Modernized server-side architecture with Spring Boot and MySQL."]},{role:"Full Stack Developer",company:"Think Vision",date:"Sep 2020 — Mar 2022",points:["Built a ReactJS site integrated with a mobile app for real-time notifications via a linked database.","Deployed a Kubernetes microservice, improving monitoring and updates by 20%."]}],m=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"aurora","aria-hidden":"true"}),e.jsxs("section",{className:"section container page-top",children:[e.jsxs("div",{className:"about-head",children:[e.jsxs("div",{className:"about-head__text",children:[e.jsx("span",{className:"eyebrow","data-reveal":!0,children:"About me"}),e.jsxs("h1",{className:"page-title display","data-reveal":!0,"data-reveal-delay":80,children:["Engineer.",e.jsx("br",{}),e.jsx("span",{className:"gradient-text",children:"Builder."})," Problem-solver."]})]}),e.jsxs("div",{className:"about-portrait","data-reveal":!0,"data-reveal-delay":160,children:[e.jsx("img",{src:s("images/profile.jpg"),alt:"Hassan Shahzad"}),e.jsx("div",{className:"about-portrait__glow"})]})]}),e.jsx("div",{className:"about-bio",children:r.map((a,i)=>e.jsx("p",{className:"about-bio__p","data-reveal":!0,"data-reveal-delay":i*80,children:a},i))})]}),e.jsxs("section",{className:"section container",children:[e.jsx("div",{className:"section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"section-index","data-reveal":!0,children:"Capabilities"}),e.jsx("h2",{className:"section-title","data-reveal":!0,"data-reveal-delay":80,children:"Skills & tools"})]})}),e.jsx("div",{className:"skills",children:n.map((a,i)=>e.jsxs("div",{className:"skill","data-reveal":!0,"data-reveal-delay":i%3*90,style:{"--lvl":`${a.level}%`},children:[e.jsxs("div",{className:"skill__row",children:[e.jsx("span",{className:"skill__name",children:a.name}),e.jsxs("span",{className:"skill__pct",children:[a.level,"%"]})]}),e.jsx("div",{className:"skill__bar",children:e.jsx("span",{className:"skill__fill"})})]},a.name))})]}),e.jsxs("section",{className:"section container",children:[e.jsx("div",{className:"section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"section-index","data-reveal":!0,children:"Journey"}),e.jsx("h2",{className:"section-title","data-reveal":!0,"data-reveal-delay":80,children:"Experience"})]})}),e.jsx("div",{className:"timeline",children:o.map((a,i)=>e.jsxs("div",{className:"tl-item","data-reveal":!0,"data-reveal-delay":i*60,children:[e.jsx("div",{className:"tl-item__marker",children:e.jsx("span",{})}),e.jsxs("div",{className:"tl-item__content",children:[e.jsxs("div",{className:"tl-item__head",children:[e.jsx("h3",{className:"tl-item__role",children:a.role}),e.jsx("span",{className:"tl-item__date",children:a.date})]}),e.jsx("p",{className:"tl-item__company gradient-text",children:a.company}),e.jsx("ul",{className:"tl-item__points",children:a.points.map((t,l)=>e.jsx("li",{children:t},l))})]})]},a.company))})]}),e.jsx("style",{children:`
        .about-head {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: clamp(2rem, 6vw, 4rem);
          align-items: center;
          margin-bottom: 3.5rem;
        }
        .page-title {
          font-size: clamp(2.6rem, 8vw, 6rem);
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin-top: 1rem;
        }
        .about-portrait {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .about-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.2) contrast(1.05);
        }
        .about-portrait__glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(155, 107, 255, 0.4));
          mix-blend-mode: screen;
        }
        .about-bio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1000px;
        }
        .about-bio__p {
          color: var(--ink-dim);
          font-size: 0.98rem;
          line-height: 1.7;
        }
        .skills {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem 3rem;
        }
        .skill__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.6rem;
        }
        .skill__name {
          font-weight: 500;
          font-size: 0.95rem;
        }
        .skill__pct {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-mute);
        }
        .skill__bar {
          height: 4px;
          border-radius: 99px;
          background: var(--line);
          overflow: hidden;
        }
        .skill__fill {
          display: block;
          height: 100%;
          width: 0;
          border-radius: 99px;
          background: var(--grad-ice);
          transition: width 1.2s var(--ease-out) 0.1s;
        }
        .skill.is-visible .skill__fill {
          width: var(--lvl);
        }
        .timeline {
          position: relative;
          padding-left: 1.5rem;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(var(--violet), var(--cyan), transparent);
        }
        .tl-item {
          position: relative;
          padding-left: 2rem;
          padding-bottom: 2.8rem;
        }
        .tl-item:last-child {
          padding-bottom: 0;
        }
        .tl-item__marker {
          position: absolute;
          left: -1.5rem;
          top: 6px;
        }
        .tl-item__marker span {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: var(--glow-cyan);
        }
        .tl-item__head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .tl-item__role {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
        }
        .tl-item__date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-mute);
          white-space: nowrap;
        }
        .tl-item__company {
          font-weight: 600;
          margin-block: 0.2rem 0.8rem;
        }
        .tl-item__points {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tl-item__points li {
          position: relative;
          padding-left: 1.1rem;
          color: var(--ink-dim);
          font-size: 0.94rem;
          line-height: 1.6;
        }
        .tl-item__points li::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--cyan);
        }
        @media (max-width: 900px) {
          .about-head { grid-template-columns: 1fr; }
          .about-portrait { max-width: 320px; }
          .about-bio { grid-template-columns: 1fr; gap: 1.2rem; max-width: 640px; }
          .skills { grid-template-columns: 1fr; }
        }
      `})]});export{m as default};
//# sourceMappingURL=About-Vf-v7Abn.js.map
