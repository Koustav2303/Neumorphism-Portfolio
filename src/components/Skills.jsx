import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiTailwindcss, SiGreensock, SiThreedotjs } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'HTML5', icon: FaHtml5, color: 'text-[#E34F26]', level: 95 },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-[#1572B6]', level: 90 },
  { name: 'JavaScript', icon: IoLogoJavascript, color: 'text-[#F7DF1E]', level: 85 },
  { name: 'React', icon: FaReact, color: 'text-[#61DAFB]', level: 85 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]', level: 90 },
  { name: 'GSAP', icon: SiGreensock, color: 'text-[#88CE02]', level: 80 },
  { name: 'Three.js', icon: SiThreedotjs, color: 'text-gray-800', level: 60 },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Helper to push refs into the array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for cards
      gsap.set(cardsRef.current, { opacity: 0, y: 80, scale: 0.9 });

      // Create the scrubbed timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', // Pin when the top of the section hits the top of the viewport
          end: '+=1500', // How long the user needs to scroll to finish the animation (adds extra scroll distance)
          scrub: 1, // 1 second smoothing on the scrub
          pin: true, // Lock the section in place
        },
      });

      // Animate the cards in sequentially
      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        ease: 'back.out(1.5)',
        duration: 1,
      });

      // Add a slight pause at the end of the timeline before unpinning
      tl.to({}, { duration: 0.2 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 bg-neuBase"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Technical Arsenal</h2>
        <p className="text-lg text-gray-500">The tools I use to build digital experiences</p>
      </div>

      {/* Grid for Skill Cards */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="flex flex-col items-center p-6 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] transition-all duration-300 hover:shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] group"
          >
            {/* Icon */}
            <div className={`text-5xl md:text-6xl mb-4 ${skill.color} drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
              <skill.icon />
            </div>
            
            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{skill.name}</h3>
            
            {/* Neumorphic Progress Bar Track */}
            <div className="w-full h-3 rounded-full bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] overflow-hidden p-[2px]">
              {/* Progress Bar Fill */}
              <div 
                className="h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600 shadow-sm"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}