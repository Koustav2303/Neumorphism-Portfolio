export default function Footer() {
  return (
    <footer className="w-full py-8 text-center bg-neuBase border-t border-gray-300/30">
      <p className="text-gray-500 font-medium">
        © {new Date().getFullYear()} Koustav Pan. Crafted with React & GSAP.
      </p>
    </footer>
  );
}