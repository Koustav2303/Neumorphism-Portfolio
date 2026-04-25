import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import All Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Register global GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Master GSAP + Lenis Sync
  useEffect(() => {
    const updateScrollTrigger = (time) => {
      ScrollTrigger.update();
    };
    gsap.ticker.add(updateScrollTrigger);
    return () => {
      gsap.ticker.remove(updateScrollTrigger);
    };
  }, []);

  return (
    // Lenis Smooth Scroll Wrapper
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}>
      
      <Navbar />
      
      <main className="min-h-screen w-full bg-neuBase text-neuDark font-sans selection:bg-neuDark selection:text-neuLight overflow-hidden">
        
        {/* The Storyline */}
        <Hero />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
        
      </main>

      <Footer />

    </ReactLenis>
  );
}

export default App;