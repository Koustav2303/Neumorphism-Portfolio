import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: "Java Fullstack Development",
    institution: "JSpider, BTM Layout, Bengaluru",
    date: "Currently Pursuing",
    details: "Tech Stack: Java, React, MySQL, Spring, Hibernate",
    grade: null
  },
  {
    title: "B.Tech in Computer Science and Engineering",
    institution: "Bankura Unnayani Institute of Engineering",
    date: "2021 - 2025 (July)",
    details: "Affiliated to Maulana Abul Kalam Azad University",
    grade: "7.34 CGPA"
  },
  {
    title: "Higher Secondary Examination",
    institution: "Garhbeta High School",
    date: "2019 - 2021",
    details: "West Bengal Council of Higher Secondary Education",
    grade: "88%"
  },
  {
    title: "Secondary Examination",
    institution: "Panchagrami Saradamoni Vidyapith",
    date: "2019",
    details: "West Bengal Board of Secondary Education",
    grade: "81%"
  }
];

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide cards initially
      gsap.set(cardsRef.current, { opacity: 0, x: (i) => (i % 2 === 0 ? 50 : -50) });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500', // Pin duration
          scrub: 1,
          pin: true,
        },
      });

      // Animate the timeline line growing down
      tl.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        duration: 1,
      }, 0); // Start at the beginning of the timeline

      // Animate the cards popping in as the line "reaches" them
      cardsRef.current.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, index * (1 / cardsRef.current.length)); // Stagger based on total duration
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 bg-gray-300/20"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Academic Journey</h2>
        <p className="text-lg text-gray-500">My educational background and current pursuits</p>
      </div>

      <div className="relative w-full max-w-5xl flex flex-col items-center">
        
        {/* The Central Timeline Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] rounded-full hidden md:block">
          {/* The Animated Draw Line */}
          <div 
            ref={lineRef} 
            className="w-full h-0 bg-blue-500 rounded-full"
          ></div>
        </div>

        {/* Mobile Timeline Line (Left aligned) */}
        <div className="absolute top-0 left-6 w-2 h-full bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] rounded-full md:hidden">
          <div ref={lineRef} className="w-full h-0 bg-blue-500 rounded-full"></div>
        </div>

        {/* Timeline Items */}
        <div className="w-full flex flex-col gap-10">
          {educationData.map((item, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className={`relative flex w-full md:w-1/2 pl-16 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-12 md:self-start md:justify-end text-left md:text-right' : 'md:pl-12 md:self-end text-left'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-6 w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10 ${
                index % 2 === 0 ? 'left-[19px] md:-right-[10px] md:left-auto' : 'left-[19px] md:-left-[10px]'
              }`}></div>

              {/* Neumorphic Card */}
              <div className="p-6 md:p-8 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] w-full group transition-all duration-300 hover:shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff]">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] rounded-full">
                  {item.date}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <h4 className="text-lg font-medium text-gray-600 mb-3">{item.institution}</h4>
                <p className="text-gray-500 mb-4">{item.details}</p>
                {item.grade && (
                  <div className="inline-block px-4 py-2 rounded-lg bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]">
                    <span className="font-bold text-gray-700">Score: </span>
                    <span className="text-blue-600 font-semibold">{item.grade}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}