
import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    category: "Photorealistic",
    images: [
      { 
        alt: "Photorealistic mountain landscape", 
        description: "Hyper-detailed mountain landscape at sunset",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      { 
        alt: "Photorealistic portrait", 
        description: "Studio portrait with natural lighting",
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      },
      { 
        alt: "Photorealistic architecture", 
        description: "Modern architecture with glass facade",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
    ]
  },
  {
    category: "Cinematic",
    images: [
      { 
        alt: "Cinematic sci-fi scene", 
        description: "Futuristic city at night with neon lights",
        url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      { 
        alt: "Cinematic action scene", 
        description: "Epic battle scene with dramatic lighting",
        url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
      },
      { 
        alt: "Cinematic nature scene", 
        description: "Sweeping vista of a magical forest",
        url: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80"
      },
    ]
  },
  {
    category: "Stylized",
    images: [
      { 
        alt: "Anime style artwork", 
        description: "Character in anime art style",
        url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      { 
        alt: "Watercolor style artwork", 
        description: "Landscape in watercolor style",
        url: "https://images.unsplash.com/photo-1579541671172-43429ce17aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80"
      },
      { 
        alt: "Abstract style artwork", 
        description: "Abstract composition with vibrant colors",
        url: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
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
                  {image.url ? (
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-futuristic-yellow/20 to-transparent opacity-70"></div>
                      <div className="absolute inset-0 bg-noise opacity-10"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        {activeCategory === "Photorealistic" ? (
                          <Camera className="text-futuristic-yellow/60" size={48} />
                        ) : (
                          <Sparkles className="text-futuristic-yellow/60" size={48} />
                        )}
                      </div>
                    </>
                  )}
                  
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
