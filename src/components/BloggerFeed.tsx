
import { ExternalLink } from 'lucide-react';

interface BloggerFeedProps {
  onViewFullPost: (url: string) => void;
}

const BloggerFeed = ({ onViewFullPost }: BloggerFeedProps) => {
  const bloggerUrl = "https://pixelforgenow.blogspot.com/?m=1";

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center glass-panel p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Premium Content</h2>
      <p className="text-white/70 text-lg mb-8 max-w-2xl">
        Access our exclusive premium articles and in-depth tutorials on our Blogger platform.
        Unlock advanced techniques, expert interviews, and cutting-edge research in AI image generation.
      </p>
      
      <button 
        onClick={() => onViewFullPost(bloggerUrl)}
        className="flex items-center gap-2 bg-futuristic-yellow text-black px-6 py-3 rounded-md hover:bg-futuristic-yellow/90 transition-colors font-medium"
      >
        Visit Premium Blog <ExternalLink size={18} />
      </button>
    </div>
  );
};

export default BloggerFeed;
