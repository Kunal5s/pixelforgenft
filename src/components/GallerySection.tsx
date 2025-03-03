
import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    category: "Photorealistic",
    images: [
      { alt: "Photorealistic mountain landscape", description: "Hyper-detailed mountain landscape at sunset" },
      { alt: "Photorealistic portrait", description: "Studio portrait with natural lighting" },
      { alt: "Photorealistic architecture", description: "Modern architecture with glass facade" },
    ]
  },
  {
    category: "Cinematic",
    images: [
      { alt: "Cinematic sci-fi scene", description: "Futuristic city at night with neon lights" },
      { alt: "Cinematic action scene", description: "Epic battle scene with dramatic lighting" },
      { alt: "Cinematic nature scene", description: "Sweeping vista of a magical forest" },
    ]
  },
  {
    category: "Stylized",
    images: [
      { alt: "Anime style artwork", description: "Character in anime art style" },
      { alt: "Watercolor style artwork", description: "Landscape in watercolor style" },
      { alt: "Abstract style artwork", description: "Abstract composition with vibrant colors" },
    ]
  }
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("Photorealistic");

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-futuristic-black to-futuristic-darkgray relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
            <span className="text-sm font-medium text-futuristic-yellow">Inspiration Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What You Can <span className="text-futuristic-yellow">Create</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Browse our gallery of AI-generated images across various styles and categories to spark your creativity.
          </p>
        </div>

        <div className="flex justify-center mb-8 gap-2">
          {galleryItems.map((item) => (
            <button
              key={item.category}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                activeCategory === item.category
                  ? 'bg-futuristic-yellow text-futuristic-black'
                  : 'bg-futuristic-darkgray hover:bg-futuristic-gray text-white'
              }`}
              onClick={() => setActiveCategory(item.category)}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems
            .find(item => item.category === activeCategory)?.images
            .map((image, index) => (
              <div 
                key={index} 
                className="glass-panel overflow-hidden group transition-all duration-500"
              >
                <div className="relative aspect-[4/3] bg-futuristic-darkgray overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-futuristic-yellow/20 to-transparent opacity-70"></div>
                  <div className="absolute inset-0 bg-noise opacity-10"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeCategory === "Photorealistic" ? (
                      <Camera className="text-futuristic-yellow/60" size={48} />
                    ) : (
                      <Sparkles className="text-futuristic-yellow/60" size={48} />
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-glass-black to-transparent">
                    <p className="text-white text-sm">
                      {image.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-glass-dark rounded-full px-2 py-1 text-xs">
                    {activeCategory}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
        <div className="text-center mt-12">
          <a href="#create" className="button-secondary">
            Create Your Own
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
