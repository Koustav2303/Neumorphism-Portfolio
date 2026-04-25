import { useState } from 'react';

const testimonials = [
  {
    name: "Alex M.",
    role: "Senior Product Designer",
    quote: "Koustav's ability to bridge the gap between complex design and flawless code is unmatched.",
    full: "I've worked with many frontend devs, but Koustav brings a unique understanding of motion and space. The GSAP animations he implemented on our last project elevated the entire user experience."
  },
  {
    name: "Sarah J.",
    role: "Tech Lead",
    quote: "A true master of modern React and state management architectures.",
    full: "Koustav architected a data-heavy dashboard for us. His implementation of Zustand alongside custom Vite configurations resulted in a blazing fast, bug-free delivery."
  }
];

export default function Testimonial() {
  return (
    <section className="py-32 w-full bg-gray-300/20 flex flex-col items-center justify-center px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Client Feedback</h2>
        <p className="text-lg text-gray-500">Hover over the cards to read more</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl perspective-1000">
        {testimonials.map((test, i) => (
          <FlipCard key={i} data={test} />
        ))}
      </div>
    </section>
  );
}

// Sub-component for the Flip Card logic
function FlipCard({ data }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full md:w-1/2 h-[300px] relative group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="w-full h-full absolute transition-transform duration-700 shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff] rounded-3xl"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-neuBase rounded-3xl p-8 flex flex-col justify-center text-center backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h3>
          <p className="text-blue-500 font-medium mb-6">{data.role}</p>
          <p className="text-gray-600 italic">"{data.quote}"</p>
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full bg-neuBase rounded-3xl p-8 flex flex-col justify-center text-center backface-hidden" 
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-gray-700 leading-relaxed font-medium">
            {data.full}
          </p>
        </div>
      </div>
    </div>
  );
}