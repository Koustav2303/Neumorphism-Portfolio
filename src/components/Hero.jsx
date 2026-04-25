import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

export default function Hero() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const buttonRefs = useRef([]);
  const lenis = useLenis();

  // Helper function to add refs to arrays
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial state setup (hide elements before animating)
      gsap.set([...textRefs.current, ...buttonRefs.current], { 
        y: 50, 
        opacity: 0 
      });

      // 2. Animate elements in with a stagger
      gsap.to([...textRefs.current, ...buttonRefs.current], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2, // Slight delay to ensure preloader (added later) finishes
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 pt-20"
    >
      {/* Neumorphic Main Card */}
      <div className="w-full max-w-4xl p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-neuBase shadow-[20px_20px_60px_#a3b1c6,-20px_-20px_60px_#ffffff] flex flex-col items-center text-center">
        
        {/* Intro text */}
        <p 
          ref={(el) => addToRefs(el, textRefs)}
          className="text-lg md:text-xl font-medium text-gray-500 mb-2"
        >
          Hi, I’m
        </p>

        {/* Name */}
        <h1 
          ref={(el) => addToRefs(el, textRefs)}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-800 mb-4"
        >
          Koustav Pan
        </h1>

        {/* Role */}
        <h2 
          ref={(el) => addToRefs(el, textRefs)}
          className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 mb-8"
        >
          Frontend Developer
        </h2>

        {/* Short description */}
        <p 
          ref={(el) => addToRefs(el, textRefs)}
          className="max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed mb-10"
        >
          Specializing in crafting high-end, animation-rich, and fully responsive digital experiences. I bring designs to life using modern web architecture and fluid motion.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button 
            ref={(el) => addToRefs(el, buttonRefs)}
            onClick={() => lenis?.scrollTo('#projects')}
            className="px-8 py-4 rounded-xl font-semibold text-gray-700 bg-neuBase shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] active:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]"
          >
            View Projects
          </button>
          
          <button 
            ref={(el) => addToRefs(el, buttonRefs)}
            onClick={() => lenis?.scrollTo('#contact')}
            className="px-8 py-4 rounded-xl font-semibold text-blue-600 bg-neuBase shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] active:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]"
          >
            Contact Me
          </button>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
        <span className="text-sm font-medium text-gray-500 mb-2">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-neuBase shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] overflow-hidden relative">
          <div className="w-full h-1/3 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}