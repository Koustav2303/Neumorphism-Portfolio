import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBookOpen, FiTerminal, FiAward, FiCode } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// Enriched Education Data
const educationData = [
  {
    title: "Java Fullstack Development",
    type: "Professional Certification",
    institution: "JSpider, BTM Layout, Bengaluru",
    date: "Currently Pursuing",
    description: "An intensive, industry-focused training program dedicated to enterprise-level backend architecture and modern frontend integration.",
    focus: ["Java Core", "Spring Boot", "Hibernate", "React", "MySQL"],
    grade: "Ongoing",
    icon: FiTerminal
  },
  {
    title: "B.Tech in Computer Science & Eng.",
    type: "Undergraduate Degree",
    institution: "Bankura Unnayani Institute of Engineering",
    date: "2021 - 2025 (July)",
    description: "Comprehensive study of computer architecture, algorithms, and software engineering principles. Affiliated to Maulana Abul Kalam Azad University.",
    focus: ["Data Structures", "Algorithms", "OS", "DBMS", "Networks"],
    grade: "7.34 CGPA",
    icon: FiCode
  },
  {
    title: "Higher Secondary Examination",
    type: "Class XII (Science)",
    institution: "Garhbeta High School",
    date: "2019 - 2021",
    description: "Advanced coursework in core sciences and mathematics under the West Bengal Council of Higher Secondary Education.",
    focus: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    grade: "88% Score",
    icon: FiBookOpen
  },
  {
    title: "Secondary Examination",
    type: "Class X",
    institution: "Panchagrami Saradamoni Vidyapith",
    date: "2019",
    description: "Foundational academic studies under the West Bengal Board of Secondary Education, establishing strong analytical skills.",
    focus: ["Mathematics", "Physical Science", "Life Science"],
    grade: "81% Score",
    icon: FiAward
  }
];

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToDots = (el) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial states
      gsap.set(cardsRef.current, { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      });
      gsap.set(dotsRef.current, { scale: 0, opacity: 0 });

      // 2. The Master Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000', // Long scroll for a relaxed, premium pace
          scrub: 1,
          pin: true,
        },
      });

      // 3. Draw the center line
      tl.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        duration: 1,
      }, 0);

      // 4. Animate Cards and Dots syncing with the line
      cardsRef.current.forEach((card, index) => {
        // Calculate the relative trigger point based on the index
        const triggerTime = index * (1 / cardsRef.current.length);

        // Pop the dot in
        tl.to(dotsRef.current[index], {
          scale: 1,
          opacity: 1,
          duration: 0.1,
          ease: 'back.out(2)',
        }, triggerTime);

        // Slide and fade the card in
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: 'power3.out',
        }, triggerTime);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center py-20 px-6 bg-gray-300/20 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gray-400/10 rounded-full blur-3xl pointer-events-none translate-x-1/3"></div>

      <div className="text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter mb-4">
          Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Journey.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          The foundational steps and continuous learning that shaped my engineering mindset.
        </p>
      </div>

      <div className="relative w-full max-w-6xl flex flex-col items-center h-full justify-center">
        
        {/* Desktop Central Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] rounded-full hidden md:block z-0">
          <div ref={lineRef} className="w-full h-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Mobile Left-Aligned Line */}
        <div className="absolute top-0 left-6 w-3 h-full bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] rounded-full md:hidden z-0">
          <div ref={lineRef} className="w-full h-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Timeline Items Container */}
        <div className="w-full flex flex-col gap-16 md:gap-24 relative z-10">
          {educationData.map((item, index) => (
            <div 
              key={index}
              className={`relative flex w-full md:w-1/2 pl-16 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-16 md:self-start md:justify-end text-left md:text-right' : 'md:pl-16 md:self-end text-left'
              }`}
            >
              {/* The Glowing Timeline Dot */}
              <div 
                ref={addToDots}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] flex items-center justify-center border-[3px] border-blue-500 z-20 ${
                  index % 2 === 0 ? 'left-[13px] md:-right-[16px] md:left-auto' : 'left-[13px] md:-left-[16px]'
                }`}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse"></div>
              </div>

              {/* The Interactive 3D Card */}
              <EducationCard item={item} addToCards={addToCards} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Sub-component: 3D Interactive Card
// ==========================================
function EducationCard({ item, addToCards, index }) {
  const cardRef = useRef(null);

  // 3D Tilt Physics on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.3)",
      duration: 1
    });
  };

  return (
    <div 
      ref={(el) => { cardRef.current = el; addToCards(el); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full p-8 md:p-10 rounded-[2.5rem] bg-neuBase shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff] border border-gray-100/50 group transition-shadow duration-300 hover:shadow-[20px_20px_40px_#a3b1c6,-20px_-20px_40px_#ffffff] flex flex-col ${
        index % 2 === 0 ? 'md:items-end' : 'md:items-start'
      }`}
    >
      
      {/* Top Meta Info (Date & Type) */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] text-blue-500 text-xl">
          <item.icon />
        </div>
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{item.type}</span>
          <span className="text-sm font-bold text-blue-600 bg-blue-500/10 px-3 py-1 rounded-md mt-1 w-max">
            {item.date}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-2 leading-tight">
        {item.title}
      </h3>
      <h4 className="text-lg font-bold text-gray-600 mb-4">
        {item.institution}
      </h4>
      <p className="text-gray-500 font-medium mb-8 leading-relaxed max-w-md">
        {item.description}
      </p>

      {/* Footer Area: Tags & Grade */}
      <div className={`w-full flex flex-col xl:flex-row gap-6 mt-auto ${index % 2 === 0 ? 'xl:flex-row-reverse' : ''}`}>
        
        {/* Core Focus Tags */}
        <div className={`flex flex-wrap gap-2 flex-1 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
          {item.focus.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1.5 text-xs font-bold text-gray-600 rounded-lg bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Digital Grade Readout */}
        <div className="flex-shrink-0">
          <div className="px-5 py-3 rounded-xl bg-neuBase shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] border border-gray-200 flex items-center gap-3 w-max">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-bold text-gray-700 text-sm tracking-widest uppercase">Score:</span>
            <span className="font-black text-blue-600 text-lg">{item.grade}</span>
          </div>
        </div>

      </div>

    </div>
  );
}