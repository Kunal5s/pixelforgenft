
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface BloggerPost {
  title: {
    $t: string;
  };
  link: Array<{
    rel: string;
    href: string;
  }>;
  media$thumbnail?: {
    url: string;
  };
}

interface BloggerFeedProps {
  onViewFullPost: (url: string) => void;
}

const BloggerFeed = ({ onViewFullPost }: BloggerFeedProps) => {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBloggerPosts() {
      const blogUrl = "https://pixelforgenow.blogspot.com/feeds/posts/default?alt=json";
      
      try {
        const response = await fetch(blogUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.feed.entry || []);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBloggerPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-futuristic-yellow" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        const title = post.title.$t;
        const link = post.link.find(l => l.rel === "alternate")?.href || "#";
        const thumbnailUrl = post.media$thumbnail?.url || "https://via.placeholder.com/150";
        
        return (
          <div 
            key={index} 
            className="glass-panel p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,209,0,0.1)] cursor-pointer"
            onClick={() => onViewFullPost(link)}
          >
            <div className="aspect-video rounded-md mb-4 bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailUrl})` }}></div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="flex justify-end mt-4">
              <button className="text-futuristic-yellow text-sm font-medium hover:underline">
                Read Premium Article
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BloggerFeed;
