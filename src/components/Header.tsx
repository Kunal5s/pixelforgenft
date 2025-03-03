
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-glass-dark backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-futuristic-yellow rounded-md flex items-center justify-center">
            <span className="text-futuristic-black font-bold text-lg">AI</span>
          </div>
          <span className="text-white font-semibold text-xl">PixelForge</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/80 hover:text-futuristic-yellow transition-colors">
            Features
          </a>
          <a href="#models" className="text-white/80 hover:text-futuristic-yellow transition-colors">
            Models
          </a>
          <a href="#gallery" className="text-white/80 hover:text-futuristic-yellow transition-colors">
            Gallery
          </a>
          <a href="#blog" className="text-white/80 hover:text-futuristic-yellow transition-colors">
            Blog
          </a>
          <a href="#create" className="button-primary">
            Create Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-glass-dark backdrop-blur-md border-t border-glass-light animate-slide-down">
          <nav className="container-custom flex flex-col py-4 gap-4">
            <a 
              href="#features" 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#models" 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Models
            </a>
            <a 
              href="#gallery" 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </a>
            <a 
              href="#blog" 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a 
              href="#create" 
              className="button-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
