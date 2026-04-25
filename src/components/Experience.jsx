import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: "Freelance Frontend Developer",
    period: "2024 - Present",
    desc: "Architecting high-fidelity, animation-rich user interfaces for diverse clients using React, GSAP, and Tailwind CSS."
  },
  {
    role: "UI/UX Engineering Intern",
    period: "2023 - 2024",
    desc: "Collaborated with design teams to translate static Figma prototypes into fully interactive, responsive web applications."
  },
  {
    role: "Open Source Contributor",
    period: "2022 - Present",
    desc: "Active contributor to various frontend libraries, focusing on accessibility, smooth animations, and state management optimization."
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the stacking effect timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000", // Length of the scroll
          scrub: 1,
          pin: true,
        }
      });

      // Animate each card to stack, scale down slightly, and fade
      cardsRef.current.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, { y: window.innerHeight, opacity: 0.5, scale: 0.8 });
          tl.to(card, {
            y: index * 20, // Stagger them vertically
            opacity: 1,
            scale: 1 - (cardsRef.current.length - index - 1) * 0.05, // Slight scale back for depth
            duration: 1,
            ease: "none"
          }, "-=0.5");
        } else {
          // Base card
          gsap.set(card, { y: 0, scale: 1 - (cardsRef.current.length - 1) * 0.05 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-neuBase flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 text-center z-10 w-full px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Experience & Growth</h2>
        <p className="text-lg text-gray-500">Scroll to unfold my professional journey</p>
      </div>

      <div className="relative w-full max-w-2xl h-[400px] mt-20 flex justify-center items-end">
        {experienceData.map((exp, index) => (
          <div 
            key={index}
            ref={addToRefs}
            className="absolute bottom-0 w-full p-8 md:p-12 rounded-[2rem] bg-neuBase shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] border border-gray-100/50"
            style={{ zIndex: index }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold text-blue-600 bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] rounded-lg">
              {exp.period}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{exp.role}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}