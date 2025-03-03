import { useState, useEffect } from "react";
import { Heading2, Loader2 } from "lucide-react";

const BlogSection = () => {
  const [blogContent, setBlogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = "AIzaSyDZ5NChmmr6XFiHFr7p5HZIPiLsd9UqYLc";
    const docIds = ["1YBwJFjdP8zy0VyEh09trPRAqCFIDJVeKQxM3sC51Sak"];

    const fetchMultipleDocs = async () => {
      setIsLoading(true);
      let content = "";

      try {
        for (const docId of docIds) {
          const url = `https://docs.googleapis.com/v1/documents/${docId}?key=${apiKey}`;
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch document: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (data.error) {
            throw new Error(data.error.message || "Error fetching document");
          }
          
          let text = data.body.content
            .map((e: any) => e.paragraph?.elements?.map((el: any) => el.textRun?.content).join(''))
            .join('<br>');

          let title = data.title || "Untitled Blog Post";

          content += `<h2>${title}</h2>${text}<hr>`;
        }

        setBlogContent(content);
      } catch (error) {
        console.error("Error fetching document:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch blog content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMultipleDocs();
  }, []);

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
          <div className="inline-block">
            <a href="#" className="button-secondary flex items-center gap-2">
              View All Articles
            </a>
          </div>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-futuristic-yellow animate-spin" />
              <span className="ml-3 text-white/70">Loading blog content...</span>
            </div>
          ) : error ? (
            <div className="glass-panel p-6 rounded-lg text-center">
              <p className="text-white/70 mb-2">Unable to load blog content</p>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          ) : (
            <div 
              id="blog-content" 
              className="prose prose-invert max-w-none prose-headings:text-futuristic-yellow prose-hr:border-futuristic-gray"
              dangerouslySetInnerHTML={{ __html: blogContent }}
            />
          )}
        </div>

        {!blogContent && !isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="glass-panel p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,209,0,0.1)]">
              <div className="aspect-video bg-futuristic-darkgray rounded-md mb-4"></div>
              <div className="inline-block px-3 py-1 bg-futuristic-yellow/10 rounded-full text-futuristic-yellow text-xs font-medium mb-3">
                Tutorial
              </div>
              <h3 className="text-xl font-semibold mb-2">Mastering Prompt Engineering for AI Image Generation</h3>
              <p className="text-white/60 text-sm mb-4">Learn how to craft the perfect prompts to get exactly the images you want from AI models.</p>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs">April 12, 2023</span>
                <a href="#" className="text-futuristic-yellow text-sm font-medium hover:underline">Read More</a>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,209,0,0.1)]">
              <div className="aspect-video bg-futuristic-darkgray rounded-md mb-4"></div>
              <div className="inline-block px-3 py-1 bg-futuristic-yellow/10 rounded-full text-futuristic-yellow text-xs font-medium mb-3">
                Research
              </div>
              <h3 className="text-xl font-semibold mb-2">The Evolution of AI Image Models: From DALLE to FLUX.1</h3>
              <p className="text-white/60 text-sm mb-4">Explore the rapid advancements in AI image generation technology over the past few years.</p>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs">March 28, 2023</span>
                <a href="#" className="text-futuristic-yellow text-sm font-medium hover:underline">Read More</a>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,209,0,0.1)]">
              <div className="aspect-video bg-futuristic-darkgray rounded-md mb-4"></div>
              <div className="inline-block px-3 py-1 bg-futuristic-yellow/10 rounded-full text-futuristic-yellow text-xs font-medium mb-3">
                Inspiration
              </div>
              <h3 className="text-xl font-semibold mb-2">10 Creative Ways Artists Are Using AI in Their Workflow</h3>
              <p className="text-white/60 text-sm mb-4">Discover how professional artists are incorporating AI tools into their creative processes.</p>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs">March 15, 2023</span>
                <a href="#" className="text-futuristic-yellow text-sm font-medium hover:underline">Read More</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
