import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiTailwindcss, SiGreensock, SiThreedotjs, SiRedux, SiVite } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// Highly detailed categorized skill data
const skillCategories = [
  {
    title: "Frontend & Styling Architecture",
    description: "Building robust, accessible, and pixel-perfect user interfaces.",
    skills: [
      { name: 'React.js', icon: FaReact, color: 'text-[#61DAFB]', level: 9, tags: ['Hooks', 'Context API', 'Component Lifecycle'] },
      { name: 'JavaScript (ES6+)', icon: IoLogoJavascript, color: 'text-[#F7DF1E]', level: 9, tags: ['Async/Await', 'DOM Manipulation', 'ESModules'] },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]', level: 10, tags: ['Custom Config', 'Utility-First', 'Responsive Design'] },
      { name: 'HTML5 & CSS3', icon: FaHtml5, color: 'text-[#E34F26]', level: 10, tags: ['Semantic Markup', 'Flexbox/Grid', 'CSS Variables'] },
    ]
  },
  {
    title: "Motion & 3D Engineering",
    description: "Bringing static designs to life with fluid mathematics and physics.",
    skills: [
      { name: 'GSAP', icon: SiGreensock, color: 'text-[#88CE02]', level: 8, tags: ['ScrollTrigger', 'Timelines', 'Parallax'] },
      { name: 'Three.js / R3F', icon: SiThreedotjs, color: 'text-gray-800', level: 6, tags: ['Canvas', 'Lighting/Shadows', 'Geometries'] },
      { name: 'CSS Animations', icon: FaCss3Alt, color: 'text-[#1572B6]', level: 9, tags: ['Keyframes', 'Transitions', 'Transforms'] },
    ]
  },
  {
    title: "State Management & Tooling",
    description: "Orchestrating data flow and optimizing the development pipeline.",
    skills: [
      { name: 'Zustand / Redux', icon: SiRedux, color: 'text-[#764ABC]', level: 8, tags: ['Global State', 'Slices', 'Middleware'] },
      { name: 'Vite', icon: SiVite, color: 'text-[#646CFF]', level: 9, tags: ['HMR', 'Build Optimization', 'Rollup'] },
      { name: 'Node.js (Basic)', icon: FaNodeJs, color: 'text-[#339933]', level: 5, tags: ['REST APIs', 'Express', 'NPM/Yarn'] },
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToIcons = (el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Scroll Entrance Animation for the Bento Cards
      gsap.set(cardsRef.current, { y: 100, opacity: 0, scale: 0.9 });
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        animation: gsap.to(cardsRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          ease: 'power3.out',
          duration: 1,
        })
      });

      // 2. Continuous Floating Physics for Icons
      iconsRef.current.forEach((icon) => {
        gsap.to(icon, {
          y: "-=10",
          duration: "random(1.5, 3)",
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: "random(0, 2)"
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen w-full bg-neuBase flex flex-col items-center justify-center py-20 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="w-full max-w-7xl flex flex-col h-full">
        
        {/* Header Area */}
        <div className="text-left md:text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 tracking-tighter mb-4">
            Technical <span className="text-blue-500">Arsenal.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl md:mx-auto font-medium">
            A comprehensive breakdown of the core technologies, libraries, and architectural patterns I use to engineer digital products.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 h-full">
          
          {skillCategories.map((category, catIndex) => (
            <div 
              key={catIndex}
              ref={addToCards}
              className={`flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-neuBase shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff] border border-gray-100/50 
                ${catIndex === 0 ? 'lg:col-span-12' : 'lg:col-span-6'}
              `}
            >
              {/* Category Header */}
              <div className="mb-8 border-b border-gray-300/40 pb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-500 font-medium">{category.description}</p>
              </div>

              {/* Skills Container */}
              <div className={`grid grid-cols-1 gap-8 ${catIndex === 0 ? 'md:grid-cols-2' : ''}`}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col sm:flex-row gap-6 group relative">
                    
                    {/* Icon Block */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]">
                        <div ref={addToIcons} className={`text-4xl ${skill.color} drop-shadow-md`}>
                          <skill.icon />
                        </div>
                      </div>
                    </div>

                    {/* Details Block */}
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-end mb-2">
                        <h4 className="text-xl font-bold text-gray-800">{skill.name}</h4>
                        <span className="text-sm font-bold text-blue-500">{skill.level * 10}%</span>
                      </div>
                      
                      {/* Technical LED Matrix (Instead of standard progress bar) */}
                      <LEDMatrix level={skill.level} />

                      {/* Sub-skill Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {skill.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-lg bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

// ==========================================
// Sub-component: LED Proficiency Matrix
// ==========================================
// Renders 10 small hardware-like dots. 'level' dictates how many are "lit up"
function LEDMatrix({ level }) {
  const totalDots = 10;
  
  return (
    <div className="flex gap-1.5 w-full">
      {[...Array(totalDots)].map((_, i) => {
        const isLit = i < level;
        return (
          <div 
            key={i} 
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${
              isLit 
                ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
                : 'bg-neuBase shadow-[inset_1px_1px_3px_#a3b1c6,inset_-1px_-1px_3px_#ffffff]'
            }`}
          ></div>
        );
      })}
    </div>
  );
}