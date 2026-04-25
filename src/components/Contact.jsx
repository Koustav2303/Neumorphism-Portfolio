import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiCopy, FiCheck, FiSend, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. Reusable Magnetic Component
// ==========================================
function MagneticSocial({ children, link }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    
    const moveEvent = (e) => {
      const rect = node.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(node, { x: x * 0.5, y: y * 0.5, duration: 0.4, ease: 'power3.out' });
    };

    const leaveEvent = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    node.addEventListener('mousemove', moveEvent);
    node.addEventListener('mouseleave', leaveEvent);

    return () => {
      node.removeEventListener('mousemove', moveEvent);
      node.removeEventListener('mouseleave', leaveEvent);
    };
  }, []);

  return (
    <a 
      ref={nodeRef} 
      href={link} 
      target="_blank" 
      rel="noreferrer"
      className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-neuBase text-gray-600 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-colors hover:text-blue-600 active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] z-10"
    >
      {children}
    </a>
  );
}

// ==========================================
// 2. MAIN CONTACT COMPONENT
// ==========================================
export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  
  // States
  const [time, setTime] = useState("");
  const [copiedItem, setCopiedItem] = useState(null);
  const [formState, setFormState] = useState("idle"); // idle | loading | success

  // Live Clock Logic (Bengaluru / IST)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Copy to Clipboard Interaction
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Form Submission Sequence
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState !== "idle") return;
    
    setFormState("loading");
    
    // Simulate network request
    setTimeout(() => {
      setFormState("success");
      
      // Reset after success
      setTimeout(() => {
        setFormState("idle");
        e.target.reset(); // Clear form
      }, 3000);
    }, 2000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="min-h-screen w-full bg-neuBase flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden"
    >
      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-gray-300/10 pointer-events-none whitespace-nowrap z-0">
        CONNECTION
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: Data & Identity               */}
        {/* ========================================== */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          
          <div className="contact-reveal flex items-center gap-4 mb-8">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            </span>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Accepting New Projects</p>
          </div>

          <h2 className="contact-reveal text-5xl md:text-7xl font-black text-gray-800 tracking-tighter mb-6 leading-tight">
            Let's build <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">together.</span>
          </h2>
          
          <p className="contact-reveal text-lg md:text-xl text-gray-600 font-medium mb-12 max-w-md leading-relaxed">
            Whether you have a massive architectural challenge or just want to connect, my inbox is always open.
          </p>

          {/* Interactive Contact Nodes */}
          <div className="contact-reveal flex flex-col gap-6 mb-12">
            
            {/* Email Copier */}
            <div 
              onClick={() => handleCopy('pankoustav@gmail.com', 'email')}
              className="group flex items-center justify-between p-5 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-neuBase shadow-[inset_2px_2px_5px_#a3b1c6,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center text-blue-500">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">pankoustav@gmail.com</p>
                </div>
              </div>
              <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                {copiedItem === 'email' ? <FiCheck size={24} className="text-green-500" /> : <FiCopy size={24} />}
              </div>
            </div>

            {/* Phone Copier */}
            <div 
              onClick={() => handleCopy('+917501795902', 'phone')}
              className="group flex items-center justify-between p-5 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-neuBase shadow-[inset_2px_2px_5px_#a3b1c6,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center text-blue-500">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone / WhatsApp</p>
                  <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">+91 7501795902</p>
                </div>
              </div>
              <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                {copiedItem === 'phone' ? <FiCheck size={24} className="text-green-500" /> : <FiCopy size={24} />}
              </div>
            </div>

          </div>

          {/* Magnetic Socials Grid */}
          <div className="contact-reveal">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Digital Presence</h4>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <MagneticSocial link="https://github.com/Koustav2303"><FaGithub size={24} /></MagneticSocial>
              <MagneticSocial link="https://www.linkedin.com/in/koustav-pan-7576a3237/"><FaLinkedinIn size={24} /></MagneticSocial>
              <MagneticSocial link="https://x.com/Koustav2303"><FaXTwitter size={24} /></MagneticSocial>
              <MagneticSocial link="https://www.instagram.com/devnewton_/"><FaInstagram size={24} /></MagneticSocial>
              <MagneticSocial link="https://www.facebook.com/ug.koustav?rdid=GeBUnWVdeVDhz5Jt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FiqXBqdiE%2F#"><FaFacebookF size={24} /></MagneticSocial>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: The Tactile Form             */}
        {/* ========================================== */}
        <div className="contact-reveal w-full lg:w-7/12 flex items-center justify-center">
          <div className="w-full p-8 md:p-12 lg:p-16 rounded-[3rem] bg-neuBase shadow-[20px_20px_50px_#a3b1c6,-20px_-20px_50px_#ffffff] border border-gray-100/50">
            
            {/* Status Header */}
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-300/40">
              <div className="flex items-center gap-2 text-gray-500 font-bold">
                <FiMapPin className="text-blue-500" /> Bengaluru, India
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-bold font-mono">
                <FiClock className="text-blue-500" /> {time}
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Neumorphic Input Group */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full p-5 pt-8 rounded-2xl bg-neuBase text-gray-800 font-medium shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] transition-shadow peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-5 top-5 text-gray-500 font-bold tracking-wide transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-translate-y-3 peer-valid:text-xs pointer-events-none">
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full p-5 pt-8 rounded-2xl bg-neuBase text-gray-800 font-medium shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] transition-shadow peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-5 top-5 text-gray-500 font-bold tracking-wide transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-translate-y-3 peer-valid:text-xs pointer-events-none">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows="5"
                  className="w-full p-5 pt-8 rounded-2xl bg-neuBase text-gray-800 font-medium shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:shadow-[inset_10px_10px_20px_#a3b1c6,inset_-10px_-10px_20px_#ffffff] transition-shadow resize-none peer"
                  placeholder=" "
                ></textarea>
                <label htmlFor="message" className="absolute left-5 top-5 text-gray-500 font-bold tracking-wide transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-translate-y-3 peer-valid:text-xs pointer-events-none">
                  Project Details / Message
                </label>
              </div>

              {/* Dynamic Submit Button */}
              <button 
                type="submit"
                disabled={formState !== "idle"}
                className="mt-4 w-full py-5 rounded-2xl font-black text-lg tracking-widest uppercase transition-all duration-300 flex justify-center items-center gap-3 overflow-hidden relative
                  bg-blue-500 text-white shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] hover:shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3)]
                  disabled:opacity-90 disabled:cursor-default"
              >
                {formState === "idle" && (
                  <>Transmit Data <FiSend size={22} /></>
                )}
                
                {formState === "loading" && (
                  <div className="flex gap-2">
                    <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                )}

                {formState === "success" && (
                  <>Message Secured <FiCheck size={26} className="text-green-300" /></>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}