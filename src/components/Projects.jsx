import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiActivity, FiCpu, FiGlobe } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. Massive Detailed Project Data
// ==========================================
const projectsData = [
  {
    id: "01",
    title: "OmniTravel Platform",
    role: "Lead Frontend Engineer",
    timeline: "Feb 2026",
    description: "A highly complex multi-service booking engine integrating real-time APIs for airlines and trains, featuring a groundbreaking PNR-based food delivery module.",
    tech: ["React", "Tailwind", "Redux", "Node"],
    metrics: [
      { label: "Lighthouse", value: 98, suffix: "%", icon: FiActivity },
      { label: "API Latency", value: 42, suffix: "ms", icon: FiGlobe },
      { label: "Render", value: 16, suffix: "ms", icon: FiCpu }
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "02",
    title: "SyncBoard Kanban",
    role: "Fullstack Architect",
    timeline: "Mar 2026",
    description: "An enterprise-grade task management system built entirely on the frontend. Features highly optimized drag-and-drop physics and robust local data persistence.",
    tech: ["React", "Zustand", "GSAP", "IndexedDB"],
    metrics: [
      { label: "FPS", value: 60, suffix: "fps", icon: FiActivity },
      { label: "State Sync", value: 12, suffix: "ms", icon: FiGlobe },
      { label: "Load Time", value: 0.8, suffix: "s", icon: FiCpu }
    ],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "03",
    title: "DataViz Playground",
    role: "UI/UX Developer",
    timeline: "Late Mar 2026",
    description: "A production-grade dashboard visualizing complex datasets. Animations are tied strictly to data updates via WebSockets, providing seamless transitions.",
    tech: ["React", "Recharts", "Zustand", "Vite"],
    metrics: [
      { label: "Data Nodes", value: 10, suffix: "k+", icon: FiActivity },
      { label: "Socket Ping", value: 8, suffix: "ms", icon: FiGlobe },
      { label: "Memory", value: 45, suffix: "MB", icon: FiCpu }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "04",
    title: "Holographic Forms",
    role: "Creative Developer",
    timeline: "Apr 2026",
    description: "A multi-step interactive flow pushing the boundaries of form design. Uses 3D canvas elements interacting with standard DOM inputs for deep immersion.",
    tech: ["React", "Three.js", "GSAP", "Motion"],
    metrics: [
      { label: "WebGL Draw", value: 120, suffix: "calls", icon: FiActivity },
      { label: "Triangles", value: 450, suffix: "k", icon: FiGlobe },
      { label: "Physics", value: 60, suffix: "hz", icon: FiCpu }
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  }
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function Projects() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cursorRef = useRef(null);
  const [activeProject, setActiveProject] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sliderWidth = sliderRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxScroll = sliderWidth - windowWidth;

      // Master Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${maxScroll + 800}`, // Ample scroll room to prevent getting stuck
          onUpdate: (self) => {
            const progress = self.progress;
            const currentItem = Math.min(
              Math.ceil(progress * projectsData.length) || 1, 
              projectsData.length
            );
            setActiveProject(currentItem);
          }
        }
      });

      tl.to(sliderRef.current, {
        x: -maxScroll,
        ease: 'none',
      });

      // Desktop Parallax target (ignored on mobile layout)
      gsap.utils.toArray('.desktop-parallax-img').forEach((img) => {
        gsap.to(img, {
          x: 150, 
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1.5,
            start: 'top top',
            end: () => `+=${maxScroll + 800}`,
          }
        });
      });

      gsap.utils.toArray('.desktop-parallax-text').forEach((content) => {
        gsap.to(content, {
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 2, 
            start: 'top top',
            end: () => `+=${maxScroll + 800}`,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Custom Cursor Logic (Hidden via CSS on touch devices)
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    };

    const section = sectionRef.current;
    const handleMouseEnter = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    const handleMouseLeave = () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

    section.addEventListener('mousemove', moveCursor);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', moveCursor);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="h-screen w-full bg-neuBase overflow-hidden relative flex flex-col justify-center md:cursor-none"
    >
      {/* Custom Cursor Orb */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-24 h-24 -ml-12 -mt-12 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)] hidden lg:flex items-center justify-center text-blue-800 font-bold tracking-widest text-[10px] uppercase pointer-events-none z-50 opacity-0 scale-0 mix-blend-color-burn"
      >
        Drag
      </div>

      {/* Background Ambience (z-0) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] lg:text-[20vw] font-black text-gray-300/10 pointer-events-none whitespace-nowrap z-0">
        ARCHITECTURE
      </div>

      {/* Header (z-10) - Securely below cards */}
      <div className="absolute top-6 lg:top-20 left-6 lg:left-20 z-10 pointer-events-none">
        <h2 className="text-4xl lg:text-7xl font-black text-gray-800 tracking-tighter mb-2 pointer-events-auto">Featured<br/>Projects.</h2>
        <div className="w-16 lg:w-24 h-1 lg:h-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
      </div>

      {/* Main Horizontal Slider (z-30) - Securely above header */}
      <div 
        ref={sliderRef} 
        className="flex h-[75vh] md:h-[80vh] items-center gap-6 md:gap-10 lg:gap-32 px-6 lg:px-32 mt-20 lg:mt-24 w-max relative z-30"
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Global Progress HUD (z-40) */}
      <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 lg:gap-4 bg-neuBase/90 backdrop-blur-md px-6 py-3 rounded-full shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] border border-gray-100/50">
        <span className="font-bold text-gray-800 text-sm lg:text-lg">0{activeProject}</span>
        <div className="flex gap-1.5 lg:gap-2">
          {projectsData.map((_, i) => (
            <div 
              key={i}
              className={`w-8 lg:w-12 h-1.5 rounded-full transition-all duration-500 ${
                activeProject === i + 1 
                ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                : 'bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]'
              }`}
            ></div>
          ))}
        </div>
        <span className="font-bold text-gray-400 text-sm lg:text-lg">0{projectsData.length}</span>
      </div>
    </section>
  );
}

// ==========================================
// 3. Dual-Architecture Project Card
// ==========================================
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const desktopImageRef = useRef(null);

  // Desktop CSS 3D Tilt Effect
  const handleMouseMove = (e) => {
    if (!desktopImageRef.current || window.innerWidth < 1024) return;
    const rect = desktopImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(desktopImageRef.current, { rotateX, rotateY, transformPerspective: 1500, ease: "power2.out", duration: 0.5 });
  };

  const handleMouseLeave = () => {
    if (!desktopImageRef.current || window.innerWidth < 1024) return;
    gsap.to(desktopImageRef.current, { rotateX: 0, rotateY: 0, ease: "elastic.out(1, 0.3)", duration: 1.5 });
  };

  // GSAP Counters
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.metric-value');
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'left 75%', 
        onEnter: () => {
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            gsap.fromTo(counter, 
              { innerHTML: 0 }, 
              { innerHTML: target, duration: 2, ease: 'power3.out', snap: { innerHTML: 1 }, stagger: 0.1 }
            );
          });
        }
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="relative w-[88vw] md:w-[70vw] lg:w-[85vw] h-full lg:h-[80%] flex items-center justify-center group">
      
      {/* ========================================================================= */}
      {/* MOBILE / TABLET DESIGN: Streamlined & Guaranteed Button Visibility        */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col w-full h-[95%] p-5 sm:p-8 rounded-[2rem] bg-neuBase shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff] border border-gray-100/50">
        
        {/* Top Image Banner */}
        <div className="w-full h-[25%] min-h-[140px] rounded-[1.5rem] overflow-hidden mb-5 relative shadow-[inset_4px_4px_10px_rgba(0,0,0,0.3)] flex-shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <span className="text-white font-black text-4xl leading-none">{project.id}</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-tight mb-1">{project.title}</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{project.role}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-xs font-bold text-gray-500">{project.timeline}</span>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 font-medium line-clamp-3 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Mini Metrics Row */}
          <div className="flex gap-2 mb-4">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
                <span className="metric-value text-lg font-black text-gray-800" data-target={metric.value}>0</span>
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ALWAYS VISIBLE BUTTONS (mt-auto forces them to the absolute bottom) */}
        <div className="flex gap-3 mt-auto pt-2 w-full flex-shrink-0">
          <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-black text-white bg-blue-500 shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:scale-95 transition-transform">
            DEPLOYMENT <FiExternalLink size={16} />
          </a>
          <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-black text-gray-700 bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:scale-95 transition-transform">
            REPO <FiGithub size={16} />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP DESIGN: Massive 3D Bento Layout (Hidden on Mobile)                */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex flex-row items-center gap-16 w-full h-full">
        
        {/* Left: Content & Data */}
        <div className="desktop-parallax-text w-[45%] flex flex-col justify-center h-full relative z-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-neuBase drop-shadow-sm">{project.id}</span>
            <div className="h-[2px] w-12 bg-blue-500"></div>
            <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">{project.timeline}</span>
          </div>

          <h3 className="text-5xl xl:text-6xl font-black text-gray-800 mb-4 tracking-tight leading-none">{project.title}</h3>
          <p className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-wider">{project.role}</p>
          <p className="text-lg text-gray-600 font-medium mb-10 leading-relaxed max-w-xl">{project.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-[2rem] bg-neuBase shadow-[inset_8px_8px_16px_#a3b1c6,inset_-8px_-8px_16px_#ffffff] border border-gray-200/50">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <metric.icon className="text-blue-500 text-2xl mb-2" />
                <div className="flex items-baseline gap-1">
                  <span className="metric-value text-3xl font-black text-gray-800" data-target={metric.value}>0</span>
                  <span className="text-sm font-bold text-gray-500">{metric.suffix}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-3 py-5 rounded-2xl font-black text-white bg-blue-500 shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] transition-all hover:-translate-y-1 active:translate-y-0">
              DEPLOYMENT <FiExternalLink size={20} />
            </a>
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-3 py-5 rounded-2xl font-black text-gray-700 bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] transition-all hover:-translate-y-1 hover:text-blue-600 active:translate-y-0 active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
              REPOSITORY <FiGithub size={20} />
            </a>
          </div>
        </div>

        {/* Right: Massive 3D Screen */}
        <div className="w-[55%] h-full perspective-1000 flex items-center justify-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div ref={desktopImageRef} className="w-full h-[85%] rounded-[3rem] p-4 bg-neuBase shadow-[25px_25px_50px_#a3b1c6,-25px_-25px_50px_#ffffff] border-4 border-gray-100/30 transform-style-3d relative flex items-center justify-center">
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black shadow-[inset_10px_10px_30px_rgba(0,0,0,0.5)] relative">
              <div className="absolute top-0 -left-[150px] w-[calc(100%+300px)] h-full">
                <img src={project.image} alt={project.title} className="desktop-parallax-img w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute top-6 right-6 flex flex-col gap-2 transform translate-z-12">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-bold text-white bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-right shadow-lg">
                    {t}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}