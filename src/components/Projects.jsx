import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// Enhanced Data with Images, Roles, and Features
const projectsData = [
  {
    title: "OmniTravel Platform",
    role: "Lead Frontend Engineer",
    timeline: "Feb 2026",
    description: "A highly complex multi-service booking engine. Integrates real-time APIs for airlines and trains, featuring a groundbreaking PNR-based food delivery module.",
    tech: ["React", "Tailwind CSS", "Redux", "Node.js"],
    features: ["Real-time seat mapping", "Complex state management", "Dynamic pricing charts"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "SyncBoard Kanban",
    role: "Fullstack Architect",
    timeline: "Mar 2026",
    description: "An enterprise-grade task management system built entirely on the frontend. Features highly optimized drag-and-drop physics and robust local persistence.",
    tech: ["React", "Zustand", "GSAP", "Tailwind"],
    features: ["Physics-based drag & drop", "Optimistic UI updates", "Local storage sync"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "DataViz Playground",
    role: "UI/UX Developer",
    timeline: "Late Mar 2026",
    description: "A production-grade dashboard visualizing complex datasets. Animations are tied strictly to data updates, providing seamless transitions without frame drops.",
    tech: ["React", "Recharts", "Zustand", "Vite"],
    features: ["60fps SVG animations", "Real-time socket data", "Custom theming engine"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Holographic Forms",
    role: "Creative Developer",
    timeline: "Apr 2026",
    description: "A multi-step interactive flow pushing the boundaries of form design. Uses 3D canvas elements interacting with standard DOM inputs.",
    tech: ["React", "Three.js", "GSAP", "Framer Motion"],
    features: ["3D particle interactions", "Custom cursor physics", "Seamless route transitions"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sliderWidth = sliderRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // 1. The Main Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${sliderWidth - windowWidth}`, 
        }
      });

      tl.to(sliderRef.current, {
        x: () => -(sliderWidth - windowWidth),
        ease: 'none',
      });

      // 2. The Internal Image Parallax Effect
      // This makes the image pan slightly in the opposite direction of the scroll
      gsap.utils.toArray('.project-image-inner').forEach((img) => {
        gsap.to(img, {
          x: 150, // Image shifts right as card moves left
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1,
            start: 'top top',
            end: () => `+=${sliderWidth - windowWidth}`,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="h-screen w-full bg-neuBase overflow-hidden relative flex flex-col justify-center"
    >
      {/* Background Ambient Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-gray-300/10 pointer-events-none whitespace-nowrap">
        SELECTED WORKS
      </div>

      <div className="absolute top-10 md:top-20 left-6 md:left-20 z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter mb-2">Featured Projects</h2>
        <div className="w-20 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      </div>

      {/* Horizontal Slider */}
      <div 
        ref={sliderRef} 
        className="flex h-[75vh] items-center gap-10 md:gap-20 px-6 md:px-20 mt-20 w-max"
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} addToRefs={addToRefs} />
        ))}
      </div>
    </section>
  );
}

// Sub-component for individual cards to handle isolated MouseMove state cleanly
function ProjectCard({ project, addToRefs }) {
  const cardRef = useRef(null);

  // Mouse tracking logic for the subtle light glow effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={(el) => { cardRef.current = el; addToRefs(el); }}
      onMouseMove={handleMouseMove}
      className="project-card relative w-[90vw] md:w-[75vw] lg:w-[65vw] h-full rounded-[2.5rem] bg-neuBase shadow-[20px_20px_40px_#a3b1c6,-20px_-20px_40px_#ffffff] p-6 md:p-10 flex flex-col lg:flex-row gap-8 overflow-hidden group border border-gray-100/50"
    >
      {/* Interactive Light Glow Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
           style={{
             background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)'
           }}
      ></div>

      {/* Left Column: Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between relative z-10 h-full">
        <div>
          {/* Top Meta Info */}
          <div className="flex justify-between items-center mb-6">
            <span className="px-4 py-2 text-sm font-bold text-blue-600 bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] rounded-lg">
              {project.timeline}
            </span>
            <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
              {project.role}
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 tracking-tight leading-none">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Key Features List */}
          <div className="mb-8 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Key Architectures</h4>
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <FiCheckCircle className="text-blue-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((techItem, i) => (
              <span 
                key={i} 
                className="px-4 py-2 text-sm font-bold text-gray-700 rounded-xl bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-auto">
          <a 
            href={project.liveLink}
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-white bg-blue-500 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] active:translate-y-0 active:shadow-[inset_4px_4px_8px_#1e3a8a,inset_-4px_-4px_8px_#3b82f6]"
          >
            Launch Project <FiExternalLink size={20} />
          </a>
          <a 
            href={project.githubLink}
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-gray-700 bg-neuBase shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-all hover:-translate-y-1 hover:text-blue-600 hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] active:translate-y-0 active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]"
          >
            Source Code <FiGithub size={20} />
          </a>
        </div>
      </div>

      {/* Right Column: Inset Image Screen */}
      <div className="hidden lg:block w-1/2 h-full rounded-[2rem] p-3 bg-neuBase shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] relative z-10">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
          {/* The image itself is scaled up to allow room for the parallax translation */}
          <div className="project-image-inner absolute top-0 -left-[100px] w-[calc(100%+200px)] h-full">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Color Overlay to keep it looking slightly branded/soft */}
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-0"></div>
          </div>
        </div>
      </div>

    </div>
  );
}