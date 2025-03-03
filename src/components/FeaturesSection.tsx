
import { Camera, Zap, Palette, Infinity } from 'lucide-react';

const features = [
  {
    icon: <Camera className="text-futuristic-yellow" size={28} />,
    title: "Real-time Previews",
    description: "See your creations evolve in real-time with our advanced preview system, allowing instant adjustments to your vision."
  },
  {
    icon: <Palette className="text-futuristic-yellow" size={28} />,
    title: "100+ Art Styles",
    description: "Choose from over 100 different artistic styles, from photorealistic to abstract, vintage to futuristic, and everything in between."
  },
  {
    icon: <Zap className="text-futuristic-yellow" size={28} />,
    title: "Lightning-Fast Generation",
    description: "Our optimized AI pipeline delivers stunning results in seconds, not minutes, keeping your creative flow uninterrupted."
  },
  {
    icon: <Infinity className="text-futuristic-yellow" size={28} />,
    title: "20+ Aspect Ratios",
    description: "Create perfect images for any medium with support for portrait, landscape, square, panoramic, and custom aspect ratios."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-futuristic-black to-futuristic-darkgray relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
            <span className="text-sm font-medium text-futuristic-yellow">Premium Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced Tools for <span className="text-futuristic-yellow">Creative Freedom</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with intuitive controls, giving you the power to create exactly what you envision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 overflow-hidden group transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,209,0,0.1)]"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-futuristic-yellow/10 group-hover:bg-futuristic-yellow/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-futuristic-yellow transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-futuristic-yellow/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 glass-panel overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">
                AI-Driven <span className="text-futuristic-yellow">Lighting & Texture Control</span>
              </h3>
              <p className="text-white/70 mb-6">
                Take your images to the next level with precise control over lighting conditions, texture patterns, and environmental effects - all powered by our advanced AI understanding of visual composition.
              </p>
              <ul className="space-y-3">
                {["Dynamic lighting scenarios", "Material and texture synthesis", "Environmental effect generation", "Ultra-high resolution rendering"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-futuristic-yellow"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 h-64 md:h-80 bg-futuristic-darkgray rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-futuristic-yellow/20 to-transparent opacity-70"></div>
              <div className="absolute inset-0 bg-noise opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-futuristic-yellow/80">Lighting & Texture Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
