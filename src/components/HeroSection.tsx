
import { useEffect, useRef } from 'react';
import { Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      bgRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
      {/* Background Elements */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255, 209, 0, 0.15) 0%, transparent 40%), 
                            radial-gradient(circle at 70% 70%, rgba(255, 209, 0, 0.1) 0%, transparent 40%)` 
        }}
      />
      
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-futuristic-yellow/10 rounded-full filter blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-futuristic-yellow/5 rounded-full filter blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_50%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-glass-dark border border-futuristic-yellow/30 animate-slide-down">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-futuristic-yellow" />
              <span className="text-sm font-medium">Next-Generation AI Image Creation</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            Create Stunning
            <span className="relative">
              <span className="absolute -inset-1 blur-lg bg-futuristic-yellow/30 rounded-lg"></span>
              <span className="relative text-futuristic-yellow"> AI Images </span>
            </span>
            in Seconds
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Experience the future of creative expression with our cutting-edge AI models, delivering photorealistic, cinematic, and stylized results with precision and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a href="#create" className="button-primary flex items-center justify-center gap-2 group">
              <span>Start Creating</span>
              <Zap size={18} className="transition-transform duration-300 group-hover:rotate-12" />
            </a>
            <a href="#models" className="button-glass">
              Explore AI Models
            </a>
          </div>
          
          <div className="mt-12 p-6 glass-panel animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-futuristic-darkgray">
              <div className="absolute inset-0 bg-noise opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-lg overflow-hidden bg-gradient-to-br from-futuristic-yellow/80 to-futuristic-yellow/40 p-[1px]">
                  <div className="w-full h-full bg-futuristic-darkgray rounded-lg flex items-center justify-center">
                    <p className="text-futuristic-yellow">AI generated preview will appear here</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="px-3 py-1 bg-glass-dark rounded-md text-xs text-white/80 backdrop-blur-md">
                  Style: Cinematic
                </div>
                <div className="px-3 py-1 bg-glass-dark rounded-md text-xs text-white/80 backdrop-blur-md">
                  Model: FLUX.1-schnell MAX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
