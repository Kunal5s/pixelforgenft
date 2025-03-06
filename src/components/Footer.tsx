
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-futuristic-black py-12 border-t border-futuristic-gray">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-futuristic-yellow rounded-md flex items-center justify-center">
              <span className="text-futuristic-black font-bold text-lg">AI</span>
            </div>
            <span className="text-white font-semibold text-xl">PixelForge</span>
          </a>
          
          <p className="text-white/60 max-w-md mb-8">
            Experience the future of AI image generation with our cutting-edge platform, powered by the latest AI models.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-10 text-center">
            <a href="#features" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Features
            </a>
            <a href="#models" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Models
            </a>
            <a href="#gallery" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Gallery
            </a>
            <a href="#blog" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Blog
            </a>
            <a href="#create" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Create
            </a>
          </div>
          
          <div className="w-full h-px bg-futuristic-gray/30 mb-8"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-center">
            <Link to="/about" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/70 hover:text-futuristic-yellow transition-colors">
              Terms of Service
            </Link>
          </div>
          
          <div className="inline-block px-4 py-2 rounded-full bg-glass-dark border border-futuristic-yellow/20 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-futuristic-yellow" />
              <span className="text-sm">Start creating stunning AI images today</span>
            </div>
          </div>
          
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} PixelForge AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
