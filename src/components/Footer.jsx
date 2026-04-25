import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { FiArrowUp, FiMail, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Sub-Component: Magnetic Back To Top Button
// ==========================================
function MagneticBackToTop({ lenis }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    
    const moveEvent = (e) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power3.out' });
    };

    const leaveEvent = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    button.addEventListener('mousemove', moveEvent);
    button.addEventListener('mouseleave', leaveEvent);

    return () => {
      button.removeEventListener('mousemove', moveEvent);
      button.removeEventListener('mouseleave', leaveEvent);
    };
  }, []);

  return (
    <button 
      ref={buttonRef}
      onClick={() => lenis?.scrollTo('top', { duration: 2, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })}
      className="group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] transition-colors hover:bg-blue-500 hover:text-white active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2)] text-gray-600 z-20"
      aria-label="Back to top"
    >
      <FiArrowUp size={28} className="transition-transform duration-300 group-hover:-translate-y-2" />
      
      {/* Orbiting Ring on Hover */}
      <div className="absolute inset-0 rounded-full border border-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] scale-125 pointer-events-none"></div>
    </button>
  );
}

// ==========================================
// MAIN FOOTER COMPONENT
// ==========================================
export default function Footer() {
  const footerRef = useRef(null);
  const lenis = useLenis();

  // Reveal Animation on Scroll into View
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-item',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%', // Trigger slightly before it fully enters
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'About & Hero', target: '#about' },
    { name: 'Technical Skills', target: '#skills' },
    { name: 'Education', target: '#education' },
    { name: 'Featured Projects', target: '#projects' },
    { name: 'Experience', target: '#experience' },
    { name: 'Testimonials', target: '#testimonials' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-neuBase pt-24 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden shadow-[inset_0_20px_40px_rgba(163,177,198,0.3)]"
    >
      {/* Massive Background Typography */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center overflow-hidden pointer-events-none select-none z-0 mt-4">
        <h1 className="text-[22vw] font-black text-gray-300/10 tracking-tighter leading-none">
          KOUSTAV.
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1: Brand & Ethos (Spans 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col">
            <h2 className="footer-item text-3xl font-black text-gray-800 tracking-tighter mb-4 flex items-center gap-2">
              Koustav Pan<span className="text-blue-500">.</span>
            </h2>
            <p className="footer-item text-gray-500 font-medium leading-relaxed max-w-sm mb-8">
              A passionate frontend architect specializing in high-fidelity interfaces, fluid animations, and scalable web infrastructure.
            </p>
            
            <div className="footer-item flex items-center gap-4 text-sm font-bold text-gray-600 mb-2">
              <span className="w-10 h-10 rounded-full bg-neuBase shadow-[inset_2px_2px_5px_#a3b1c6,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center text-blue-500">
                <FiMapPin />
              </span>
              Bengaluru, Karnataka, India
            </div>
            
            <div className="footer-item flex items-center gap-4 text-sm font-bold text-gray-600">
              <span className="w-10 h-10 rounded-full bg-neuBase shadow-[inset_2px_2px_5px_#a3b1c6,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center text-blue-500">
                <FiMail />
              </span>
              pankoustav@gmail.com
            </div>
          </div>

          {/* Col 2: Navigation Links (Spans 4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col">
            <h3 className="footer-item text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Directory</h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <li key={i} className="footer-item">
                  <button 
                    onClick={() => lenis?.scrollTo(link.target, { offset: -50 })}
                    className="text-gray-600 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-4"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Socials & Back to Top (Spans 3 cols) */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col items-start lg:items-end justify-between h-full gap-8">
            <div className="flex flex-col lg:items-end">
              <h3 className="footer-item text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Connect</h3>
              <div className="footer-item flex flex-wrap gap-4">
                <SocialLink href="https://github.com/Koustav2303" icon={FaGithub} />
                <SocialLink href="https://www.linkedin.com/in/koustav-pan-7576a3237/" icon={FaLinkedinIn} />
                <SocialLink href="https://x.com/Koustav2303" icon={FaXTwitter} />
                <SocialLink href="https://www.instagram.com/devnewton_/" icon={FaInstagram} />
              </div>
            </div>

            {/* Back to Top Orb */}
            <div className="footer-item mt-auto pt-8">
              <MagneticBackToTop lenis={lenis} />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-item w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Bottom Bar: Copyright & Tech */}
        <div className="footer-item flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm font-bold text-gray-500">
            &copy; {new Date().getFullYear()} Koustav Pan. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-gray-400 tracking-wider">
            <span>ENGINEERED WITH</span>
            <span className="px-2 py-1 rounded-md bg-neuBase shadow-[inset_1px_1px_3px_#a3b1c6,inset_-1px_-1px_3px_#ffffff] text-gray-600">REACT</span>
            <span>&</span>
            <span className="px-2 py-1 rounded-md bg-neuBase shadow-[inset_1px_1px_3px_#a3b1c6,inset_-1px_-1px_3px_#ffffff] text-gray-600">GSAP</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Sub-component for Social Links
function SocialLink({ href, icon: Icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-xl bg-neuBase text-gray-600 shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] transition-all hover:-translate-y-1 hover:text-blue-600 hover:shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] active:translate-y-0 active:shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]"
    >
      <Icon size={20} />
    </a>
  );
}