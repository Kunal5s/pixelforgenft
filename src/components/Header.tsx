
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-glass-dark backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-futuristic-yellow rounded-md flex items-center justify-center">
            <span className="text-futuristic-black font-bold text-lg">AI</span>
          </div>
          <span className="text-white font-semibold text-xl">PixelForge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-white/80 hover:text-futuristic-yellow transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('models')} 
            className="text-white/80 hover:text-futuristic-yellow transition-colors"
          >
            Models
          </button>
          <button 
            onClick={() => scrollToSection('gallery')} 
            className="text-white/80 hover:text-futuristic-yellow transition-colors"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('blog')} 
            className="text-white/80 hover:text-futuristic-yellow transition-colors"
          >
            Blog
          </button>
          <button 
            onClick={() => scrollToSection('create')} 
            className="button-primary"
          >
            Create Now
          </button>
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
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('models')} 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
            >
              Models
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="text-white/80 hover:text-futuristic-yellow transition-colors py-2"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('create')} 
              className="button-primary text-center"
            >
              Create Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
