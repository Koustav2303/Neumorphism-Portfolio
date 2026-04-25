import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiTarget, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. Massive Detailed Experience Data
// ==========================================
const experienceData = [
  {
    id: "01",
    year: "2024",
    role: "Freelance Frontend Architect",
    company: "Global Client Base",
    duration: "Jan 2024 - Present",
    description: "Designing and engineering high-fidelity, animation-rich user interfaces for diverse international clients. Specializing in bridging the gap between Figma prototypes and highly performant React/GSAP codebases.",
    impact: [
      "Engineered 10+ premium landing pages with 90+ Lighthouse scores.",
      "Implemented complex GSAP ScrollTrigger and Flip animations.",
      "Architected scalable Tailwind Neumorphic and Glassmorphic UI systems."
    ],
    metrics: [
      { label: "Client Satisfaction", value: "100", suffix: "%" },
      { label: "Delivery Time", value: "-20", suffix: "%" }
    ],
    tech: ["React", "GSAP", "Tailwind CSS", "Three.js"]
  },
  {
    id: "02",
    year: "2023",
    role: "UI/UX Engineering Intern",
    company: "TechNova Solutions",
    duration: "May 2023 - Dec 2023",
    description: "Collaborated directly with senior product designers to translate static wireframes into fully interactive, responsive web applications used by thousands of internal employees.",
    impact: [
      "Refactored legacy CSS into a modern, utility-first Tailwind architecture.",
      "Reduced main-thread blocking time by optimizing React re-renders.",
      "Built a library of 20+ reusable, highly accessible UI components."
    ],
    metrics: [
      { label: "Code Coverage", value: "85", suffix: "%" },
      { label: "Bundle Size", value: "-30", suffix: "%" }
    ],
    tech: ["React", "JavaScript", "Figma", "Jest"]
  },
  {
    id: "03",
    year: "2022",
    role: "Open Source Contributor",
    company: "Various Repositories",
    duration: "2022 - Present",
    description: "Active contributor to the open-source frontend community, focusing on improving accessibility standards, bug fixing in state management libraries, and writing comprehensive documentation.",
    impact: [
      "Merged 15+ pull requests in major frontend ecosystem libraries.",
      "Identified and resolved memory leaks in complex React hooks.",
      "Wrote comprehensive unit tests improving repository stability."
    ],
    metrics: [
      { label: "Merged PRs", value: "15", suffix: "+" },
      { label: "Community", value: "Top 5", suffix: "%" }
    ],
    tech: ["Git", "React", "Node.js", "Markdown"]
  }
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function Experience() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeYear, setActiveYear] = useState(experienceData[0].year);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * experienceData.length),
              experienceData.length - 1
            );
            setActiveYear(experienceData[index].year);
          }
        }
      });

      cardsRef.current.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { 
            opacity: 0, 
            y: 150, 
            scale: 0.8, 
            filter: 'blur(20px)',
            pointerEvents: 'none'
          });
          
          tl.to(card, { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            filter: 'blur(0px)', 
            pointerEvents: 'auto',
            duration: 1,
            ease: 'power2.out'
          }, i * 2 - 0.5);
        } else {
          gsap.set(card, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
        }

        if (i < cardsRef.current.length - 1) {
          tl.to(card, { 
            opacity: 0, 
            y: -150, 
            scale: 1.15, 
            filter: 'blur(15px)',
            pointerEvents: 'none',
            duration: 1,
            ease: 'power2.in'
          }, i * 2 + 0.8);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="h-screen w-full bg-neuBase overflow-hidden relative flex flex-col items-center justify-center"
    >
      {/* Background Odometer (z-0) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-40">
        <span className="text-[25vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-neuBase leading-none tracking-tighter transition-all duration-700 ease-out">
          {activeYear}
        </span>
      </div>

      {/* Header - Changed to z-10 so it sits BELOW the cards */}
      <div className="absolute top-10 md:top-20 left-6 md:left-20 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter mb-2 pointer-events-auto">Professional<br/>Experience.</h2>
        <div className="w-20 h-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
      </div>

      {/* Cards Container - Changed to z-30 and increased height so cards fly OVER the text */}
      <div ref={containerRef} className="relative w-full max-w-6xl h-[85vh] lg:h-[75vh] mt-24 flex items-center justify-center z-30 perspective-1000">
        {experienceData.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} addToCards={addToCards} zIndex={experienceData.length - index} />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Scroll Depth</span>
        <div className="w-[2px] h-10 bg-neuBase shadow-[inset_1px_1px_2px_#a3b1c6,inset_-1px_-1px_2px_#ffffff] rounded-full overflow-hidden">
          <div className="w-full h-1/3 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. Sub-Component: Massive Dashboard Card
// ==========================================
function ExperienceCard({ exp, addToCards, zIndex }) {
  return (
    <div 
      ref={addToCards}
      style={{ zIndex: zIndex }}
      /* ADDED: overflow-y-auto and scrollbar-hide techniques globally so tall content scrolls safely inside the box */
      className="absolute w-[90vw] md:w-[85vw] lg:w-[100%] h-full max-h-[85vh] p-6 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-neuBase shadow-[20px_20px_60px_#a3b1c6,-20px_-20px_60px_#ffffff] border border-gray-100/50 flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
      
      {/* Left Column: Core Info */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center h-auto">
        <div className="flex items-center gap-3 mb-6 w-max px-4 py-2 rounded-xl bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">{exp.duration}</span>
        </div>

        <h3 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 leading-tight tracking-tight">
          {exp.role}
        </h3>
        
        <div className="flex items-center gap-3 mb-6 text-xl font-bold text-blue-600">
          <FiBriefcase />
          <h4>{exp.company}</h4>
        </div>

        <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed mb-8">
          {exp.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {exp.tech.map((t, i) => (
            <span key={i} className="px-3 py-1.5 text-xs font-bold text-gray-500 rounded-lg bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Deep Analytics & Impact Panel */}
      <div className="w-full lg:w-7/12 h-auto flex flex-col justify-center gap-6">
        
        {/* Key Impacts Inset Screen */}
        <div className="flex-1 p-6 md:p-8 rounded-[2rem] bg-neuBase shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] flex flex-col justify-center min-h-[250px]">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <FiTarget className="text-blue-500" /> Key Engineering Impacts
          </h4>
          <ul className="flex flex-col gap-4">
            {exp.impact.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-gray-700 font-medium text-base md:text-lg leading-relaxed">
                <FiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quantifiable Metrics Row */}
        <div className="flex gap-4 md:gap-6">
          {exp.metrics.map((metric, i) => (
            <div key={i} className="flex-1 py-6 px-4 rounded-[2rem] bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] flex flex-col justify-center items-center text-center group hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-shadow duration-300">
              <div className="flex items-baseline gap-1 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl md:text-3xl font-black">{metric.value}</span>
                <span className="text-lg md:text-xl font-bold">{metric.suffix}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">{metric.label}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}