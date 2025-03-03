
import { useState } from "react";
import { Heading2 } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Mastering Prompt Engineering for AI Image Generation",
    excerpt: "Learn how to craft the perfect prompts to get exactly the images you want from AI models.",
    category: "Tutorial",
    date: "April 12, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray to-futuristic-black"
  },
  {
    id: 2,
    title: "The Evolution of AI Image Models: From DALLE to FLUX.1",
    excerpt: "Explore the rapid advancements in AI image generation technology over the past few years.",
    category: "Research",
    date: "March 28, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/80 to-futuristic-black"
  },
  {
    id: 3,
    title: "10 Creative Ways Artists Are Using AI in Their Workflow",
    excerpt: "Discover how professional artists are incorporating AI tools into their creative processes.",
    category: "Inspiration",
    date: "March 15, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/60 to-futuristic-black"
  },
  {
    id: 4,
    title: "Ethical Considerations in AI-Generated Art",
    excerpt: "A deep dive into the ethical implications and considerations when using AI to create artwork.",
    category: "Opinion",
    date: "February 22, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/40 to-futuristic-black"
  },
  {
    id: 5,
    title: "How to Fine-Tune AI Models for Your Specific Art Style",
    excerpt: "Advanced techniques for customizing AI image generators to match your unique artistic vision.",
    category: "Advanced",
    date: "February 10, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/20 to-futuristic-black"
  },
  {
    id: 6,
    title: "Behind the Scenes: Building PixelForge's FLUX.1 Model",
    excerpt: "An insider look at the development process of our flagship AI image generation model.",
    category: "Technology",
    date: "January 30, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/10 to-futuristic-black"
  }
];

const BlogSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  
  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, blogPosts.length));
  };

  return (
    <section id="blog" className="section-padding bg-futuristic-black">
      <div className="container-custom">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-md bg-glass-dark border border-futuristic-yellow/20 flex items-center justify-center">
            <Heading2 size={20} className="text-futuristic-yellow" />
          </div>
          <h2 className="text-2xl font-bold">Latest Articles</h2>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Insights from the <span className="text-futuristic-yellow">PixelForge</span> team
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Discover the latest trends, techniques, and inspiration for AI image generation.
            Stay updated with our cutting-edge research and creative explorations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogPosts.slice(0, visiblePosts).map(post => (
            <div key={post.id} className="glass-panel p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,209,0,0.1)]">
              <div className={`aspect-video ${post.imageClass} rounded-md mb-4`}></div>
              <div className="inline-block px-3 py-1 bg-futuristic-yellow/10 rounded-full text-futuristic-yellow text-xs font-medium mb-3">
                {post.category}
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-white/60 text-sm mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs">{post.date}</span>
                <a href="#" className="text-futuristic-yellow text-sm font-medium hover:underline">Read More</a>
              </div>
            </div>
          ))}
        </div>
        
        {visiblePosts < blogPosts.length && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="button-secondary"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
