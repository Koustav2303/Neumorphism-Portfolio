import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';

const navLinks = [
  { title: 'About', id: '#about' },
  { title: 'Skills', id: '#skills' },
  { title: 'Education', id: '#education' },
  { title: 'Projects', id: '#projects' },
  { title: 'Contact', id: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  
  const lenis = useLenis();

  // Handle smooth scrolling to sections
  const handleScrollTo = (id) => {
    setIsOpen(false); // Close mobile menu if open
    if (lenis) {
      lenis.scrollTo(id, { offset: -80, duration: 1.5 });
    }
  };

  // Detect scroll to change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Open animation
        gsap.to(mobileMenuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          display: 'flex'
        });
        // Stagger links in
        gsap.fromTo(linksRef.current, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
        );
      } else {
        // Close animation
        gsap.to(mobileMenuRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-neuBase/90 backdrop-blur-md shadow-[0_10px_20px_rgba(163,177,198,0.5)]' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => lenis?.scrollTo('top')}
            className="cursor-pointer text-2xl font-bold tracking-tighter text-gray-800"
          >
            Koustav Pan<span className="text-blue-500">.</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleScrollTo(link.id)}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                {link.title}
                {/* Neumorphic hover indicator */}
                <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-gray-500 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 rounded-xl bg-neuBase shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] flex flex-col items-center justify-center gap-1.5 active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-neuBase hidden flex-col items-center justify-center transform -translate-y-full opacity-0"
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, index) => (
            <button
              key={index}
              ref={el => linksRef.current[index] = el}
              onClick={() => handleScrollTo(link.id)}
              className="text-4xl font-semibold text-gray-700 active:text-blue-500"
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}