import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiGreensock, SiThreedotjs } from 'react-icons/si';

// ==========================================
// 1. 3D Scene Component (The Centerpiece)
// ==========================================
function NeumorphicShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2}>
        {/* Icosahedron gives a highly technical, architectural feel */}
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#e0e5ec" 
          roughness={0.2} 
          metalness={0.8}
          wireframe={false}
        />
        {/* Subtle wireframe overlay for tech vibe */}
        <mesh scale={1.001}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#3b82f6" wireframe={true} transparent opacity={0.15} />
        </mesh>
      </mesh>
    </Float>
  );
}

// ==========================================
// 2. Magnetic Button Component
// ==========================================
function MagneticButton({ children, className, onClick, isPrimary }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const moveEvent = (e) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      // Move the button slightly towards the mouse
      gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power3.out' });
      // Move the text inside a bit further for a parallax effect
      gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power3.out' });
    };

    const leaveEvent = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      gsap.to(text, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    button.addEventListener('mousemove', moveEvent);
    button.addEventListener('mouseleave', leaveEvent);

    return () => {
      button.removeEventListener('mousemove', moveEvent);
      button.removeEventListener('mouseleave', leaveEvent);
    };
  }, []);

  const baseStyle = "relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-shadow duration-300 z-20";
  const primaryStyle = "text-white bg-blue-500 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#1e3a8a,inset_-4px_-4px_8px_#3b82f6]";
  const secondaryStyle = "text-gray-700 bg-neuBase shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] hover:text-blue-600 active:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

  return (
    <button 
      ref={buttonRef} 
      onClick={onClick}
      className={`${baseStyle} ${isPrimary ? primaryStyle : secondaryStyle} ${className}`}
    >
      <span ref={textRef} className="flex items-center gap-2">{children}</span>
    </button>
  );
}

// ==========================================
// 3. Floating Tech Badges Component
// ==========================================
function FloatingBadge({ icon: Icon, text, color, position, mousePos }) {
  const badgeRef = useRef(null);

  useEffect(() => {
    // Parallax effect running in reverse to mouse movement
    const xOffset = (mousePos.x - window.innerWidth / 2) * position.parallaxFactor;
    const yOffset = (mousePos.y - window.innerHeight / 2) * position.parallaxFactor;

    gsap.to(badgeRef.current, {
      x: xOffset,
      y: yOffset,
      duration: 1,
      ease: 'power2.out'
    });
  }, [mousePos, position.parallaxFactor]);

  return (
    <div 
      ref={badgeRef}
      className={`absolute hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-neuBase shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] z-10 border border-gray-100/40 ${position.classes}`}
    >
      <Icon className={`text-2xl ${color}`} />
      <span className="font-bold text-gray-700 tracking-wide">{text}</span>
    </div>
  );
}

// ==========================================
// 4. MAIN HERO COMPONENT
// ==========================================
export default function Hero() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const lenis = useLenis();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  // Track global mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementsRef.current, 
        { y: 60, opacity: 0, rotationX: -10 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: 'power4.out', 
          delay: 0.1 
        }
      );
      
      // Animate the 3D container scaling in
      gsap.fromTo('.canvas-container',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'back.out(1.2)', delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden"
    >
      {/* Dynamic Background Gradient reacting to mouse */}
      <div 
        className="absolute inset-0 opacity-40 transition-transform duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.8), transparent 40%)`
        }}
      />

      {/* Floating Parallax Badges (Desktop Only) */}
      <FloatingBadge 
        icon={FaReact} text="React.js Core" color="text-[#61DAFB]" 
        position={{ classes: "top-[15%] left-[10%]", parallaxFactor: -0.02 }} 
        mousePos={mousePos} 
      />
      <FloatingBadge 
        icon={SiGreensock} text="GSAP Motion" color="text-[#88CE02]" 
        position={{ classes: "bottom-[20%] left-[8%]", parallaxFactor: 0.03 }} 
        mousePos={mousePos} 
      />
      <FloatingBadge 
        icon={SiThreedotjs} text="WebGL / Three.js" color="text-gray-800" 
        position={{ classes: "top-[25%] right-[8%]", parallaxFactor: -0.04 }} 
        mousePos={mousePos} 
      />
      <FloatingBadge 
        icon={SiTailwindcss} text="Tailwind Architecture" color="text-[#06B6D4]" 
        position={{ classes: "bottom-[15%] right-[12%]", parallaxFactor: 0.02 }} 
        mousePos={mousePos} 
      />

      {/* The Massive Main Card */}
      <div className="relative z-10 w-full max-w-7xl p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3.5rem] bg-neuBase shadow-[20px_20px_60px_#a3b1c6,-20px_-20px_60px_#ffffff] flex flex-col lg:flex-row items-center gap-12 lg:gap-8 border border-gray-100/50">
        
        {/* Left Side: Typography & Interactions */}
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div ref={addToRefs} className="flex items-center gap-4 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p className="text-sm md:text-base font-bold text-gray-500 tracking-widest uppercase">
              Available for new projects
            </p>
          </div>

          <h1 
            ref={addToRefs}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-gray-800 mb-4 leading-[1.1]"
          >
            Creative <br className="hidden lg:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Frontend Engineer.
            </span>
          </h1>

          <h2 
            ref={addToRefs}
            className="text-xl md:text-3xl font-bold text-gray-600 mb-8"
          >
            Hi, I’m <span className="text-gray-800 border-b-4 border-blue-500">Koustav Pan</span>
          </h2>

          <p 
            ref={addToRefs}
            className="max-w-2xl text-base md:text-xl text-gray-500 leading-relaxed mb-10 font-medium"
          >
            I architect high-fidelity digital experiences. Specializing in advanced UI architecture, fluid physics-based animations, and responsive interactive web environments.
          </p>

          {/* Action Area with Magnetic Buttons */}
          <div ref={addToRefs} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
            <MagneticButton isPrimary={true} onClick={() => lenis?.scrollTo('#projects')}>
              Explore Work <FiArrowRight size={22} />
            </MagneticButton>
            
            <MagneticButton isPrimary={false} onClick={() => window.open('#', '_blank')}>
              Resume <FiDownload size={22} />
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: 3D Visual Sandbox */}
        <div className="w-full lg:w-2/5 h-[350px] md:h-[450px] lg:h-[550px] canvas-container">
          <div className="w-full h-full rounded-[2rem] bg-neuBase shadow-[inset_15px_15px_30px_#a3b1c6,inset_-15px_-15px_30px_#ffffff] relative overflow-hidden flex items-center justify-center group">
            
            {/* The 3D Canvas */}
            <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
                <Environment preset="city" />
                <NeumorphicShape />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
              </Canvas>
            </div>

            {/* Glassmorphism Overlay UI inside the 3D window */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Interactive Mesh</span>
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            </div>

          </div>
        </div>

      </div>

      {/* Global Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Scroll to explore</span>
        <div className="w-[2px] h-12 bg-gray-300/50 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-blue-500 rounded-full animate-[bounce_2s_infinite]"></div>
        </div>
      </div>

    </section>
  );
}