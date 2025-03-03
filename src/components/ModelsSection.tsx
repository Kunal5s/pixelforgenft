
import { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';

const models = [
  {
    id: "flux",
    name: "FLUX.1-schnell MAX",
    description: "Our fastest model, designed for rapid ideation and exploration with excellent quality-to-speed ratio.",
    specs: ["Optimized for speed", "4-second generation time", "Strong concept understanding", "512x512 to 1024x1024 resolution"],
    tag: "Fastest"
  },
  {
    id: "realvis",
    name: "RealVisXL UHD",
    description: "Photorealistic image generation with incredible detail and lighting, perfect for product visualization.",
    specs: ["Hyperrealistic details", "Advanced lighting simulation", "Material accuracy", "Up to 2048x2048 resolution"],
    tag: "Photorealistic"
  },
  {
    id: "imagen",
    name: "Google Imagen 3",
    description: "Google's advanced text-to-image model with exceptional understanding of complex prompts and compositions.",
    specs: ["Complex prompt handling", "Multi-subject compositions", "Coherent scenes", "Up to 1536x1536 resolution"],
    tag: "Versatile"
  },
  {
    id: "dalle",
    name: "DALLE 3",
    description: "OpenAI's latest image generation model with superior artistic style understanding and creative interpretations.",
    specs: ["Artistic style mastery", "Creative interpretation", "Abstract concept visualization", "Up to 1792x1792 resolution"],
    tag: "Creative"
  }
];

const ModelsSection = () => {
  const [activeModel, setActiveModel] = useState("flux");

  return (
    <section id="models" className="section-padding bg-futuristic-black relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-futuristic-darkgray to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
            <span className="text-sm font-medium text-futuristic-yellow">Cutting-Edge AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powered by <span className="text-futuristic-yellow">Industry-Leading</span> Models
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choose from multiple state-of-the-art AI models, each optimized for different types of image generation tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {models.map((model) => (
            <button
              key={model.id}
              className={`p-4 rounded-lg transition-all duration-300 text-left ${
                activeModel === model.id
                  ? 'bg-glass-dark border border-futuristic-yellow/50 shadow-[0_0_15px_rgba(255,209,0,0.2)]'
                  : 'bg-futuristic-darkgray hover:bg-glass-dark border border-transparent'
              }`}
              onClick={() => setActiveModel(model.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{model.name}</h3>
                {activeModel === model.id && (
                  <div className="w-2 h-2 rounded-full bg-futuristic-yellow animate-pulse"></div>
                )}
              </div>
              <div className="inline-block px-2 py-0.5 bg-futuristic-yellow/10 rounded text-xs text-futuristic-yellow mb-2">
                {model.tag}
              </div>
              <p className="text-sm text-white/60 line-clamp-2">
                {model.description}
              </p>
            </button>
          ))}
        </div>

        <div className="glass-panel p-6 md:p-8 overflow-hidden">
          {models.map((model) => (
            <div 
              key={model.id} 
              className={`${activeModel === model.id ? 'block' : 'hidden'}`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-futuristic-yellow/20 flex items-center justify-center">
                      {model.tag === "Fastest" ? (
                        <Zap className="text-futuristic-yellow" size={20} />
                      ) : (
                        <Sparkles className="text-futuristic-yellow" size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{model.name}</h3>
                      <div className="text-sm text-futuristic-yellow">{model.tag} Model</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6">{model.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-3">Model Specifications:</h4>
                  <ul className="space-y-2 mb-6">
                    {model.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-futuristic-yellow mt-2"></div>
                        <span className="text-white/70">{spec}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#create" className="button-primary inline-flex">
                    Create with {model.name.split(' ')[0]}
                  </a>
                </div>
                
                <div className="md:w-1/2 bg-futuristic-darkgray rounded-lg overflow-hidden relative h-72 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-futuristic-yellow/10 to-transparent opacity-70"></div>
                  <div className="absolute inset-0 bg-noise opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-lg font-medium text-futuristic-yellow/80">
                      {model.name} Sample Output
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
