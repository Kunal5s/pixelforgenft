
import { AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ImageCreatorHeader = () => {
  return (
    <>
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
          <span className="text-sm font-medium text-futuristic-yellow">Enhanced AI Image Generator</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Create Stunning, <span className="text-futuristic-yellow">High-Quality</span> Artwork
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Our Advanced AI Image Generator allows you to create professional, ultra-detailed images with multiple aspect ratios, artistic styles, and AI models. Customize your generation settings for the best results!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-500">Best Practices</AlertTitle>
          <AlertDescription>
            For best results, try using the "Stable Diffusion XL 1.5+" model which is most reliable. If a model fails, 
            the system will automatically fall back to SDXL to ensure you always get an image.
          </AlertDescription>
        </Alert>
        
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-500">Enhanced Image Generation</AlertTitle>
          <AlertDescription>
            All models now generate unique images when creating multiple images at once. Each image uses different random seeds to ensure variety and quality.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default ImageCreatorHeader;
