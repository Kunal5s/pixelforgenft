
import { useState, useEffect } from "react";
import { Heading2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define TypeScript interfaces for Google Docs API response
interface GoogleDocsInlineObject {
  inlineObjectProperties?: {
    embeddedObject?: {
      imageProperties?: {
        contentUri?: string;
      };
    };
  };
}

interface GoogleDocsParagraphElement {
  textRun?: {
    content: string;
  };
}

interface GoogleDocsParagraph {
  paragraph?: {
    elements?: GoogleDocsParagraphElement[];
  };
}

const blogPosts = [
  {
    id: 1,
    title: "Mastering Prompt Engineering for AI Image Generation",
    excerpt: "Learn how to craft the perfect prompts to get exactly the images you want from AI models.",
    category: "Tutorial",
    date: "April 12, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  },
  {
    id: 2,
    title: "The Evolution of AI Image Models: From DALLE to FLUX.1",
    excerpt: "Explore the rapid advancements in AI image generation technology over the past few years.",
    category: "Research",
    date: "March 28, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/80 to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  },
  {
    id: 3,
    title: "10 Creative Ways Artists Are Using AI in Their Workflow",
    excerpt: "Discover how professional artists are incorporating AI tools into their creative processes.",
    category: "Inspiration",
    date: "March 15, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/60 to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  },
  {
    id: 4,
    title: "Ethical Considerations in AI-Generated Art",
    excerpt: "A deep dive into the ethical implications and considerations when using AI to create artwork.",
    category: "Opinion",
    date: "February 22, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/40 to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  },
  {
    id: 5,
    title: "How to Fine-Tune AI Models for Your Specific Art Style",
    excerpt: "Advanced techniques for customizing AI image generators to match your unique artistic vision.",
    category: "Advanced",
    date: "February 10, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/20 to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  },
  {
    id: 6,
    title: "Behind the Scenes: Building PixelForge's FLUX.1 Model",
    excerpt: "An insider look at the development process of our flagship AI image generation model.",
    category: "Technology",
    date: "January 30, 2023",
    imageClass: "bg-gradient-to-br from-futuristic-darkgray/10 to-futuristic-black",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisl, eu tincidunt nisl nisl sit amet nisl."
  }
];

const BlogSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [googleDocsContent, setGoogleDocsContent] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchGoogleDocs = async () => {
      setIsLoading(true);
      setFetchError(null);
      
      try {
        // Note: Google Docs API requires OAuth2 authentication,
        // a simple API key won't work for accessing private docs
        const apiKey = "AIzaSyDZ5NChmmr6XFiHFr7p5HZIPiLsd9UqYLc";
        const docIds = ["1YBwJFjdP8zy0VyEh09trPRAqCFIDJVeKQxM3sC51Sak"];
        let contentHTML = "";

        for (const docId of docIds) {
          const url = `https://docs.googleapis.com/v1/documents/${docId}?key=${apiKey}`;

          const response = await fetch(url);
          
          if (!response.ok) {
            // Get more detailed error information
            const errorData = await response.json();
            console.log("API Error Details:", errorData);
            
            if (response.status === 401) {
              throw new Error("Authentication error: Google Docs API requires OAuth2 authentication, not just an API key");
            } else {
              throw new Error(`Google Docs API error: ${response.status}`);
            }
          }
          
          const data = await response.json();
          console.log("Fetched Google Doc:", data);
          
          let textContent = "";
          let imagesHTML = "";
          
          if (data.body && data.body.content) {
            for (const element of data.body.content) {
              if ((element as GoogleDocsParagraph).paragraph?.elements) {
                let text = (element as GoogleDocsParagraph).paragraph!.elements!
                  .map((e) => e.textRun?.content || "")
                  .join("");
                textContent += `<p>${text}</p>`;
              }
            }
          }

          if (data.inlineObjects) {
            for (const [key, value] of Object.entries(data.inlineObjects)) {
              // Add type assertion to value
              const typedValue = value as GoogleDocsInlineObject;
              const imageUrl = typedValue.inlineObjectProperties?.embeddedObject?.imageProperties?.contentUri;
              if (imageUrl) {
                imagesHTML += `<img src="${imageUrl}" alt="Blog Image" class="rounded-lg my-4 max-w-full">`;
              }
            }
          }

          let title = data.title || "Untitled Blog Post";

          contentHTML += `<div class="blog-post glass-panel p-6 rounded-lg mb-6">
            <h2 class="text-2xl font-bold mb-4">${title}</h2>
            ${textContent}
            ${imagesHTML}
          </div>`;
        }

        setGoogleDocsContent(contentHTML);
      } catch (error) {
        console.error("Error fetching Google Docs:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setFetchError(errorMessage);
        
        toast({
          title: "Error fetching blog content",
          description: "Could not load content from Google Docs. Displaying local content instead.",
          variant: "destructive",
        });
        
        // Set googleDocsContent to null on error so we fall back to local content
        setGoogleDocsContent(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    // We're directly calling the function now to fetch Google Docs content
    fetchGoogleDocs();
  }, [toast]);
  
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

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-futuristic-yellow"></div>
          </div>
        ) : (
          <>
            {fetchError && (
              <div className="glass-panel p-4 rounded-lg mb-6 border border-red-500/30 bg-red-500/10">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Cannot Load Google Docs Content</h3>
                <p className="text-white/70">{fetchError}</p>
                <p className="text-white/70 mt-2">Showing local blog content instead.</p>
              </div>
            )}
          
            {googleDocsContent ? (
              <div className="blog-container">
                <div id="blog-content" className="mt-8" dangerouslySetInnerHTML={{ __html: googleDocsContent }} />
              </div>
            ) : (
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
            )}

            {!googleDocsContent && visiblePosts < blogPosts.length && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="button-secondary"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
