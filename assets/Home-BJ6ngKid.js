import{c as b,r as s,u as j,g as l,j as e,B as g,C as u,T as c,a as v,G as w,b as f,I as y,d as k,e as S,R as F,L as C,f as z}from"./index-Clw2IeF5.js";import{G as p,A as R}from"./AnimatedSection-CPqV3i1N.js";import{u as E,E as N}from"./useGetProjects-B9r5JbH7.js";import{S as B}from"./SponsorshipSection-DDmpVn1j.js";import{S as I}from"./SimpleGrid-B_H44Zh0.js";import"./Badge-nQBO078G.js";import"./projects-BDOO29ja.js";/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var W=b("outline","arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Y=b("outline","download","IconDownload",[["path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",key:"svg-0"}],["path",{d:"M7 11l5 5l5 -5",key:"svg-1"}],["path",{d:"M12 4l0 12",key:"svg-2"}]]);const D=()=>{const x=s.useRef(null),t=s.useRef(null),i=s.useRef(null),m=s.useRef(null),{colorScheme:h}=j(),a=h==="dark";return s.useEffect(()=>{if(!t.current||!i.current)return;l.set(t.current.querySelectorAll(".animate-item"),{y:50,opacity:0}),l.set(i.current,{scale:.8,opacity:0,rotationY:-15});const n=l.timeline({defaults:{duration:.8,ease:"power3.out"}});n.to(t.current.querySelectorAll(".animate-item"),{y:0,opacity:1,stagger:.2}),n.to(i.current,{scale:1,opacity:1,rotationY:0,duration:1.2},"-=0.5");const d=()=>{const o=window.scrollY*.15;l.to(i.current,{y:-o*.5,duration:.1}),l.to(t.current,{y:o*.3,duration:.1})};return window.addEventListener("scroll",d),()=>{window.removeEventListener("scroll",d)}},[]),e.jsxs(g,{ref:x,style:{position:"relative",padding:"80px 0 100px",overflow:"hidden",background:a?"radial-gradient(circle at 30% 50%, rgba(155, 0, 255, 0.15), transparent 70%)":"radial-gradient(circle at 30% 50%, rgba(155, 0, 255, 0.05), transparent 70%)"},children:[e.jsx("div",{className:"orb orb-1"}),e.jsx("div",{className:"orb orb-2"}),e.jsx("div",{className:"orb orb-3"}),e.jsx(u,{size:"lg",children:e.jsxs(p,{gutter:60,children:[e.jsxs(p.Col,{md:7,ref:t,children:[e.jsx(g,{className:"animate-item",mb:20,children:e.jsx(c,{component:"span",size:"lg",style:{background:"linear-gradient(45deg, #00F5FF, #9B00FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:700},children:"Full Stack Developer & ML Engineer"})}),e.jsx(v,{className:"animate-item",style:{fontSize:"4rem",fontWeight:900,lineHeight:1.1,backgroundImage:"linear-gradient(45deg, #6200EE, #03DAC5)",backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"1.5rem"},children:"Hi, I'm Hassan Shahzad"}),e.jsx(c,{className:"animate-item",size:"xl",color:a?"dimmed":"dark",style:{maxWidth:"600px",lineHeight:1.6,marginBottom:"2rem"},children:"Specializing in creating intelligent, intuitive applications that solve real-world problems with a passion for clean code and innovative solutions."}),e.jsxs(w,{position:"left",spacing:"md",className:"animate-item",ref:m,children:[e.jsx(f,{component:"a",href:"/hxndev.github.io/assets/resume/hassan_resume.pdf",size:"lg",leftSection:e.jsx(Y,{size:20}),radius:"xl",style:{background:"linear-gradient(45deg, #6200EE, #9B00FF)",boxShadow:"0 4px 15px rgba(155, 0, 255, 0.3)",transition:"all 0.3s ease"},sx:{"&:hover":{transform:"translateY(-3px)",boxShadow:"0 8px 20px rgba(155, 0, 255, 0.4)"}},download:!0,children:"Download Resume"}),e.jsx(f,{component:"a",href:"https://github.com/HxnDev",target:"_blank",size:"lg",variant:a?"outline":"filled",leftSection:e.jsx(y,{size:20}),rightSection:e.jsx(W,{size:16}),radius:"xl",style:{borderColor:"#9B00FF",color:a?"#00F5FF":"white",backgroundColor:a?"transparent":"#9B00FF",transition:"all 0.3s ease"},sx:{"&:hover":{transform:"translateY(-3px)",background:a?"rgba(155, 0, 255, 0.1)":"#8100d9",boxShadow:"0 8px 20px rgba(0, 0, 0, 0.1)"}},children:"GitHub Profile"})]})]}),e.jsx(p.Col,{md:5,style:{position:"relative"},children:e.jsxs("div",{className:"profile-container",ref:i,children:[e.jsx("div",{className:"profile-image-wrapper",children:e.jsx("img",{src:k("images/profile.jpg"),alt:"Hassan Shahzad",className:"profile-image"})}),e.jsx("div",{className:"glow-effect"}),e.jsx("div",{className:"circle-decoration circle-1"}),e.jsx("div",{className:"circle-decoration circle-2"})]})})]})}),e.jsx("style",{children:`
          .profile-container {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px;
          }
          
          .profile-image-wrapper {
            position: relative;
            height: 400px;
            width: 400px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(155, 0, 255, 0.4);
            transform: perspective(1000px) rotateY(-5deg);
            transition: all 0.5s ease;
            border: 4px solid rgba(155, 0, 255, 0.3);
          }
          
          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .profile-image-wrapper:hover .profile-image {
            transform: scale(1.05);
          }
          
          .glow-effect {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(155, 0, 255, 0.2), transparent 70%);
            filter: blur(20px);
            opacity: 0.7;
            z-index: -1;
          }
          
          .circle-decoration {
            position: absolute;
            border-radius: 50%;
            filter: blur(15px);
          }
          
          .circle-1 {
            top: -10%;
            right: -5%;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #00F5FF, transparent);
            opacity: 0.7;
          }
          
          .circle-2 {
            bottom: -10%;
            left: -5%;
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, #9B00FF, transparent);
            opacity: 0.6;
          }
          
          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(30px);
            opacity: 0.4;
            z-index: -1;
          }
          
          .orb-1 {
            top: 20%;
            right: 10%;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle at center, rgba(0, 245, 255, 0.3), transparent);
            animation: float 15s infinite ease-in-out;
          }
          
          .orb-2 {
            bottom: 15%;
            left: 10%;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle at center, rgba(155, 0, 255, 0.3), transparent);
            animation: float 18s infinite ease-in-out reverse;
          }
          
          .orb-3 {
            top: 40%;
            left: 20%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle at center, rgba(255, 56, 100, 0.2), transparent);
            animation: float 12s infinite ease-in-out 2s;
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          
          @media (max-width: 992px) {
            .profile-image-wrapper {
              height: 300px;
              width: 300px;
              margin: 40px auto 0;
            }
          }
          
          @media (max-width: 768px) {
            .profile-image-wrapper {
              height: 250px;
              width: 250px;
            }
          }
        `})]})},X=()=>{const x=S(),{projects:t,loading:i,error:m}=E(),{colorScheme:h}=j(),a=h==="dark",n=F.useMemo(()=>!t||t.length===0?[]:t.filter(r=>r.featured===!0),[t]),d=r=>{x({pathname:z("/projects"),search:`?project=${r}`})};return e.jsxs("div",{children:[e.jsx(D,{}),e.jsxs(u,{size:"lg",style:{padding:"60px 0"},children:[e.jsx(R,{animation:"fadeInUp",duration:.8,children:e.jsx(v,{order:2,mb:50,style:{fontSize:"2.5rem",fontWeight:700,textAlign:"center",position:"relative",backgroundImage:"linear-gradient(45deg, #6200EE, #03DAC5)",backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Featured Projects"})}),i?e.jsxs(g,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px",flexDirection:"column",gap:"1rem"},children:[e.jsx(C,{color:"grape",size:"lg"}),e.jsx(c,{align:"center",children:"Loading projects..."})]}):m?e.jsxs(g,{sx:{textAlign:"center",padding:"40px 0"},children:[e.jsx(c,{color:"red",mb:"lg",children:"There was an error loading projects. Please try again later."}),e.jsx(f,{variant:"outline",color:"grape",onClick:()=>window.location.reload(),children:"Retry"})]}):e.jsx(I,{cols:3,spacing:"lg",breakpoints:[{maxWidth:992,cols:2,spacing:"md"},{maxWidth:768,cols:1,spacing:"sm"}],children:n&&n.length>0?n.map((r,o)=>e.jsx("div",{style:{animation:`fadeInUp 0.5s ease forwards ${.1+o%9*.05}s`,opacity:0},children:e.jsx(N,{...r,image:r.image?r.image.replace(/^\/|^\/public\//,""):null,onViewDetails:d,projectId:r.id})},r.id||o)):e.jsx(p.Col,{span:12,children:e.jsxs(c,{align:"center",c:a?"dimmed":"dark.6",children:["No featured projects found. Total projects: ",t?t.length:0]})})})]}),e.jsx(u,{size:"lg",style:{padding:"20px 0 80px 0"},children:e.jsx(B,{})}),e.jsx("style",{jsx:"true",children:`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})};export{X as default};
//# sourceMappingURL=Home-BJ6ngKid.js.map
