
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

// API key for Hugging Face
const API_KEY = "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";

// API endpoint base URL
const API_BASE_URL = "https://api-inference.huggingface.co/models/";

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
        "deepfloyd": "stabilityai/stable-diffusion-xl-base-1.0", // Changed to SDXL as fallback
        "openjourney": "prompthero/openjourney-v4",
        "controlnet": "stabilityai/stable-diffusion-xl-base-1.0", // Changed to SDXL as fallback
        "playground": "playgroundai/playground-v2.5-1024px-aesthetic",
        "julibrain": "stabilityai/stable-diffusion-xl-base-1.0", // Changed to SDXL as fallback
        "pixart": "stabilityai/stable-diffusion-xl-base-1.0", // Changed to SDXL as fallback
      };
      
      // Get actual model ID with fallback to SDXL
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
      
      // Create a more refined style prompt based on the selected style
      let stylePrompt = options.prompt;
      if (options.stylePreset) {
        // Extract the style name without the emoji
        const styleName = stylePresets.find(s => s.value === options.stylePreset)?.label.split(' ').slice(0, -1).join(' ');
        if (styleName) {
          stylePrompt = `${options.prompt}, in ${styleName} style, high quality, detailed, professional`;
        }
      }
      
      // Show toast notification
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} image${batchSize > 1 ? 's' : ''} with ${actualModelId}`,
      });
      
      console.log(`Attempting to generate image with model: ${actualModelId}`);
      
      // Prepare single API endpoint for reliability
      const endpoint = `${API_BASE_URL}${actualModelId}`;
      
      // Process all image requests with varied seeds for uniqueness
      const imageUrls = [];
      
      for (let i = 0; i < batchSize; i++) {
        try {
          // Generate a random seed for each image to ensure uniqueness
          const randomSeed = Math.floor(Math.random() * 2147483647);
          
          const response = await fetch(endpoint, {
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
                negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, cut off, low res",
                seed: randomSeed, // Using unique seed for each image
              }
            }),
          });
          
          if (!response.ok) {
            // Try to parse the error message
            const errorData = await response.json().catch(() => ({ error: "Unknown API error" }));
            console.error("API error response:", errorData);
            
            if (errorData.error && errorData.error.includes("exceeded your monthly included credits")) {
              throw new Error("API usage limit reached. This is a demo with limited generations per month.");
            } else if (errorData.error && errorData.error.includes("does not exist")) {
              console.log("Model not found, using fallback...");
              // Try again with the fallback model
              const fallbackResponse = await fetch(`${API_BASE_URL}stabilityai/stable-diffusion-xl-base-1.0`, {
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
                    negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, cut off, low res",
                    seed: randomSeed, // Using unique seed for each image
                  }
                }),
              });
              
              if (!fallbackResponse.ok) {
                throw new Error("Fallback model also failed. Please try again later.");
              }
              
              const fallbackBlob = await fallbackResponse.blob();
              const fallbackUrl = URL.createObjectURL(fallbackBlob);
              imageUrls.push(fallbackUrl);
              continue;
            } else if (errorData.error) {
              throw new Error(errorData.error);
            } else {
              throw new Error("Failed to generate image. Please try again.");
            }
          }
          
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          imageUrls.push(imageUrl);
          
          // Pause briefly between requests to avoid rate limits
          if (i < batchSize - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        } catch (err) {
          console.error("Individual image generation error:", err);
          // Continue with other images if possible
          if (imageUrls.length === 0 && i === batchSize - 1) {
            throw err; // Re-throw if all images failed
          }
        }
      }
      
      if (imageUrls.length === 0) {
        throw new Error("Failed to generate any images. Please try again.");
      }
      
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Created ${imageUrls.length} unique image${imageUrls.length > 1 ? 's' : ''}`,
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

// Get style presets for better style prompting
import { stylePresets } from '@/data/imageGeneratorData';

export default useImageGeneration;
