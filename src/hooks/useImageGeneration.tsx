
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

interface GenerationOptions {
  prompt: string;
  model: string;
  aspectRatio: string;
  stylePreset: string;
  quality: number;
  guidanceScale: number;
  steps: number;
}

// Using a free API key from Hugging Face - suitable for demo purposes
const API_KEY = "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";

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (options: GenerationOptions, batchSize: number = 1) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Map our model values to Hugging Face model IDs
      const modelMap: Record<string, string> = {
        "sdxl-turbo": "stabilityai/sdxl-turbo",
        "sdxl-1.5": "stabilityai/stable-diffusion-xl-base-1.0",
        "sd-lightning": "ByteDance/SDXL-Lightning",
        "flux": "stabilityai/stable-diffusion-xl-base-1.0", // Using SDXL as fallback
        "realvis": "SG161222/RealVisXL_V4.0",
        "dreamshaper": "Lykon/dreamshaper-xl-1-0",
        "deepfloyd": "DeepFloyd/IF-I-XL-v1.0",
        "openjourney": "prompthero/openjourney-v4",
        "controlnet": "lllyasviel/sd-controlnet-depth",
        "playground": "playgroundai/playground-v2.5-1024px-aesthetic",
        "julibrain": "julibrain/julibrain-photoreal",
        "pixart": "PixArt-alpha/PixArt-XL-2-1024-MS",
      };
      
      // Get actual model ID
      const actualModelId = modelMap[options.model] || "stabilityai/stable-diffusion-xl-base-1.0";
      
      // Parse aspect ratio to get width and height
      const [widthRatio, heightRatio] = options.aspectRatio.split(':').map(Number);
      const baseSize = 768;
      let width, height;
      
      if (widthRatio > heightRatio) {
        width = baseSize;
        height = Math.floor(baseSize * (heightRatio / widthRatio));
      } else {
        height = baseSize;
        width = Math.floor(baseSize * (widthRatio / heightRatio));
      }
      
      // Width and height must be divisible by 8 for most models
      width = Math.floor(width / 8) * 8;
      height = Math.floor(height / 8) * 8;
      
      // Create style prompt based on the selected style
      const stylePrompt = options.stylePreset ? `${options.prompt}, ${options.stylePreset} style` : options.prompt;
      
      // Show toast notification
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} image${batchSize > 1 ? 's' : ''} with ${actualModelId}`,
      });
      
      // Prepare requests for batch processing
      const urls = [];
      for (let i = 0; i < batchSize; i++) {
        urls.push(`https://api-inference.huggingface.co/models/${actualModelId}`);
      }
      
      // Process all image requests in parallel
      const imageRequests = urls.map((url) => 
        fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: stylePrompt,
            parameters: {
              width: width,
              height: height,
              num_inference_steps: options.steps,
              guidance_scale: options.guidanceScale,
              negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy",
            }
          }),
        })
      );
      
      const responses = await Promise.all(imageRequests);
      
      // Check if any response has an error
      for (const response of responses) {
        if (!response.ok) {
          // Try to parse the error message
          const errorData = await response.json();
          console.error("API error response:", errorData);
          
          if (errorData.error && errorData.error.includes("exceeded your monthly included credits")) {
            throw new Error("API usage limit reached. This is a demo with limited generations per month.");
          } else if (errorData.error) {
            throw new Error(errorData.error);
          } else {
            throw new Error("Failed to generate image. Please try again.");
          }
        }
      }
      
      // Process all blob data
      const imageBlobs = await Promise.all(responses.map(response => response.blob()));
      
      // Convert blobs to URLs
      const imageUrls = imageBlobs.map(blob => URL.createObjectURL(blob));
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Created ${imageUrls.length} image${imageUrls.length > 1 ? 's' : ''}`,
        variant: "default",
      });
      
      return imageUrls;
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || 'Failed to generate image. Please try again.');
      
      toast({
        title: "Image generation failed",
        description: err.message || 'Failed to generate image. Please try again.',
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating,
    generatedImages,
    error,
    reset: () => {
      setGeneratedImages([]);
      setError(null);
    }
  };
};

export default useImageGeneration;
