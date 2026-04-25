import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar, FiCheckCircle, FiPlayCircle, FiBriefcase } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. Enriched Client Data
// ==========================================
const testimonialsData = [
  {
    id: 1,
    name: "Alexander M.",
    role: "Senior Product Designer",
    company: "Nexus Dynamics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    project: "E-Commerce Dashboard",
    rating: 5,
    quote: "Koustav's ability to bridge the gap between complex design and flawless code is unmatched. I've worked with many frontend devs, but he brings a unique understanding of motion and space. The GSAP animations he implemented elevated the entire user experience to an enterprise level."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Chief Technology Officer",
    company: "Aura Fintech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    project: "Financial Analytics App",
    rating: 5,
    quote: "A true master of modern React and state management architectures. Koustav architected a data-heavy dashboard for us. His implementation of Zustand alongside custom Vite configurations resulted in a blazing fast, bug-free delivery that our stakeholders loved."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Founder & CEO",
    company: "OmniTravel",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    project: "Booking Platform Architecture",
    rating: 5,
    quote: "We handed Koustav a massive scope: integrating bus, train, and flight APIs into a single cohesive UI. He not only delivered it ahead of schedule but added a Neumorphic design system that completely separated us from our competitors. Highly recommended."
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Lead Creative Director",
    company: "Studio Vertex",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    project: "Interactive 3D Portfolio",
    rating: 4.5,
    quote: "Working with Koustav on WebGL and Three.js integrations was a breeze. He understands how to balance heavy 3D rendering with incredibly smooth DOM interactions. The physical cursor physics he built for our site still blows my mind."
  }
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function Testimonial() {
  const sectionRef = useRef(null);
  const displayRef = useRef(null);
  
  // State for the active dock item
  const [activeIndex, setActiveIndex] = useState(0);
  // State for the data currently rendering in the DOM (allows for out-animations)
  const [displayData, setDisplayData] = useState(testimonialsData[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Entrance Animation for the whole section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.test-header', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.test-dashboard', 
        { scale: 0.95, opacity: 0, y: 50 }, 
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.2)', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.test-dock', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Custom GSAP State Engine for smooth data swapping
  const handleClientChange = (index) => {
    if (index === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Swap the data only AFTER the out-animation completes
          setDisplayData(testimonialsData[index]);
          
          // Animate the new data IN
          gsap.fromTo(displayRef.current, 
            { opacity: 0, y: 30, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', onComplete: () => setIsAnimating(false) }
          );
        }
      });

      // Animate the old data OUT
      tl.to(displayRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.98,
        duration: 0.4,
        ease: 'power3.in'
      });
    }, sectionRef);

    return () => ctx.revert();
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="min-h-screen w-full bg-neuBase flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden"
    >
      {/* Massive Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-gray-300/10 pointer-events-none whitespace-nowrap z-0 font-serif leading-none">
        "
      </div>

      {/* Header */}
      <div className="test-header text-center mb-12 md:mb-16 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter mb-4">
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Feedback.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Insights and endorsements from the people I've engineered solutions for.
        </p>
      </div>

      {/* Main Interactive Dashboard */}
      <div className="test-dashboard relative z-10 w-full max-w-5xl p-8 md:p-14 rounded-[3rem] bg-neuBase shadow-[20px_20px_50px_#a3b1c6,-20px_-20px_50px_#ffffff] border border-gray-100/50 flex flex-col items-center">
        
        {/* The Animated Display Container */}
        <div ref={displayRef} className="w-full flex flex-col items-center text-center min-h-[350px] justify-center">
          
          {/* Top Metadata Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
              <FiCheckCircle className="text-blue-500" />
              <span className="text-sm font-bold text-gray-600 tracking-wider uppercase">Verified Project</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
              <FiBriefcase className="text-blue-500" />
              <span className="text-sm font-bold text-gray-600">{displayData.project}</span>
            </div>
            
            {/* LED Star Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`text-lg ${i < Math.floor(displayData.rating) ? 'text-blue-500 fill-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'text-gray-400'}`} 
                />
              ))}
            </div>
          </div>

          {/* The Quote */}
          <p className="text-xl md:text-3xl font-medium text-gray-700 leading-relaxed mb-10 max-w-4xl italic">
            "{displayData.quote}"
          </p>

          {/* Client Identity & Audio Player Frame */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 pr-8 rounded-full bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
            
            <img 
              src={displayData.image} 
              alt={displayData.name} 
              className="w-16 h-16 rounded-full object-cover shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] border-2 border-neuBase"
            />
            
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black text-gray-800">{displayData.name}</h4>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{displayData.role}</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-gray-300 mx-4"></div>

            {/* Fake Media Player Visualizer */}
            <div className="flex items-center gap-4">
              <FiPlayCircle className="text-4xl text-blue-500 drop-shadow-md cursor-pointer hover:scale-110 transition-transform" />
              <AudioWaveform isAnimating={!isAnimating} />
            </div>

          </div>

        </div>
      </div>

      {/* The Neumorphic Selector Dock */}
      <div className="test-dock relative z-20 mt-12 md:mt-16 flex items-center gap-4 p-4 rounded-[2rem] bg-neuBase shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] overflow-x-auto max-w-full">
        {testimonialsData.map((client, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={client.id}
              onClick={() => handleClientChange(index)}
              className={`relative flex items-center gap-3 p-2 pr-5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-neuBase shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]' 
                  : 'bg-neuBase shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] hover:-translate-y-1 hover:shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]'
              }`}
            >
              {/* Glowing Active Ring */}
              <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 pointer-events-none ${isActive ? 'border-blue-500 opacity-50 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-transparent'}`}></div>
              
              <img 
                src={client.image} 
                alt={client.name} 
                className={`w-10 h-10 rounded-full object-cover transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}
              />
              <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {client.company}
              </span>
            </button>
          );
        })}
      </div>

    </section>
  );
}

// ==========================================
// 3. Sub-Component: Animated Audio Waveform
// ==========================================
function AudioWaveform({ isAnimating }) {
  const barsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isAnimating) {
        barsRef.current.forEach((bar) => {
          gsap.to(bar, {
            height: "random(8, 32)", // Randomly fluctuate heights
            duration: "random(0.2, 0.5)",
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        });
      } else {
        // Flatline when not active
        gsap.to(barsRef.current, { height: 4, duration: 0.3, ease: "power2.out" });
      }
    });
    return () => ctx.revert();
  }, [isAnimating]);

  return (
    <div className="flex items-center gap-1 h-8 w-32">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          ref={(el) => barsRef.current[i] = el}
          className="w-1.5 h-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"
        ></div>
      ))}
    </div>
  );
}