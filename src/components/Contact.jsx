import { FiMail, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Contact() {
  const socials = [
    { icon: FaFacebookF, link: "https://www.facebook.com/ug.koustav?rdid=GeBUnWVdeVDhz5Jt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FiqXBqdiE%2F#" },
    { icon: FaInstagram, link: "https://www.instagram.com/devnewton_/" },
    { icon: FaTwitter, link: "https://x.com/Koustav2303" },
    { icon: FaLinkedinIn, link: "https://www.linkedin.com/in/koustav-pan-7576a3237/" },
    { icon: FaGithub, link: "https://github.com/Koustav2303" },
  ];

  return (
    <section id="contact" className="min-h-screen w-full bg-neuBase flex flex-col items-center justify-center py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Let's Connect</h2>
        <p className="text-lg text-gray-500">Ready to build something amazing?</p>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
        {/* Contact Info Card */}
        <div className="w-full lg:w-1/3 p-8 rounded-[2rem] bg-neuBase shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Info</h3>
          
          <div className="flex items-center gap-4 mb-6 group cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] text-blue-600 transition-all group-hover:text-blue-800">
              <FiMail size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a href="mailto:pankoustav@gmail.com" className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors">pankoustav@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10 group cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neuBase shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] text-blue-600 transition-all group-hover:text-blue-800">
              <FiPhone size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp / Phone</p>
              <a href="tel:+917501795902" className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors">+91 7501795902</a>
            </div>
          </div>

          <h4 className="text-lg font-bold text-gray-700 mb-4">Socials</h4>
          <div className="flex flex-wrap gap-4">
            {socials.map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-neuBase text-gray-600 shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] transition-all hover:-translate-y-1 hover:text-blue-600 hover:shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] active:translate-y-0 active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3 p-8 md:p-12 rounded-[2rem] bg-neuBase shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff]">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col md:flex-row gap-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 rounded-xl bg-neuBase text-gray-700 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-shadow placeholder-gray-400"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-4 rounded-xl bg-neuBase text-gray-700 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-shadow placeholder-gray-400"
              />
            </div>
            <textarea 
              rows="6" 
              placeholder="Your Message" 
              className="w-full p-4 rounded-xl bg-neuBase text-gray-700 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-shadow resize-none placeholder-gray-400"
            ></textarea>
            <button 
              type="submit"
              className="mt-2 w-full md:w-auto self-end px-10 py-4 rounded-xl font-bold text-white bg-blue-500 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] transition-all hover:bg-blue-600 hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_4px_4px_8px_#1e3a8a,inset_-4px_-4px_8px_#3b82f6]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}