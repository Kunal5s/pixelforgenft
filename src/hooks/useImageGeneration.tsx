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

// API keys
const HUGGING_FACE_API_KEY = "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";
const GOOGLE_GEMINI_API_KEY = "AIzaSyAsLXOYK78GiFdjHFje-s0otuFTZ-ncXGI";

// API endpoint base URLs
const HUGGING_FACE_BASE_URL = "https://api-inference.huggingface.co/models/";
const GOOGLE_GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateWithGoogleImagen = async (options: GenerationOptions, batchSize: number) => {
    const [widthRatio, heightRatio] = options.aspectRatio.split(':').map(Number);
    let width = 1024, height = 1024;
    
    if (widthRatio > heightRatio) {
      width = 1024;
      height = Math.floor(1024 * (heightRatio / widthRatio));
    } else {
      height = 1024;
      width = Math.floor(1024 * (widthRatio / heightRatio));
    }

    // Apply style to prompt with better style integration
    let stylePrompt = options.prompt;
    if (options.stylePreset) {
      // Handle new categorized styles
      const styleMappings = {
        // Styles
        '3d': '3D rendered style',
        '8-bit': '8-bit pixel art style',
        'analogue': 'analogue photography style',
        'anime': 'anime art style',
        'cartoon': 'cartoon illustration style',
        'collage': 'collage art style',
        'cookie': 'cookie dough texture style',
        'crayon': 'crayon drawing style',
        'doodle': 'doodle sketch style',
        'dough': 'clay dough sculpture style',
        'felt': 'felt fabric texture style',
        'illustrated': 'hand illustrated style',
        'marker': 'marker drawing style',
        'mechanical': 'mechanical blueprint style',
        'painting': 'traditional painting style',
        'paper': 'paper craft style',
        'pin': 'pin-up art style',
        'plushie': 'plushie toy style',
        'realistic': 'photorealistic style',
        'tattoo': 'tattoo art style',
        'woodblock': 'woodblock print style',
        // Moods
        'sweets': 'sweet candy-like mood',
        'classical': 'classical elegant mood',
        'cyberpunk': 'cyberpunk futuristic mood',
        'dreamy': 'dreamy ethereal mood',
        'glowy': 'glowing luminous mood',
        'gothic': 'gothic dark mood',
        'kawaii': 'kawaii cute mood',
        'mystical': 'mystical magical mood',
        'trippy': 'trippy psychedelic mood',
        'tropical': 'tropical vibrant mood',
        'steampunk': 'steampunk industrial mood',
        'wasteland': 'post-apocalyptic wasteland mood',
        // Lighting
        'bright': 'bright lighting',
        'dark': 'dark moody lighting',
        'neon': 'neon lighting',
        'sunset': 'sunset golden hour lighting',
        'misty': 'misty atmospheric lighting',
        'ethereal': 'ethereal soft lighting',
        // Colors
        'cool': 'cool color palette',
        'earthy': 'earthy natural color palette',
        'indigo': 'indigo blue color palette',
        'infrared': 'infrared thermal color palette',
        'pastel': 'pastel soft color palette',
        'warm': 'warm color palette',
      };
      
      const styleDescription = styleMappings[options.stylePreset] || options.stylePreset;
      stylePrompt = `${options.prompt}, ${styleDescription}, high quality, detailed, professional`;
    }

    const modelEndpoint = options.model === "google-imagen-3" ? "imagen-3.0-generate-001" : "imagen-3.0-fast-generate-001";
    
    const imageUrls = [];
    
    for (let i = 0; i < batchSize; i++) {
      try {
        const response = await fetch(`${GOOGLE_GEMINI_BASE_URL}${modelEndpoint}:generateImage?key=${GOOGLE_GEMINI_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: stylePrompt,
            config: {
              width: width,
              height: height,
              aspectRatio: options.aspectRatio.replace(':', '_'),
              guidanceScale: options.guidanceScale,
              steps: options.steps,
              seed: Math.floor(Math.random() * 2147483647),
              negativePrompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, cut off, low res"
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown API error" }));
          console.error("Google Imagen API error:", errorData);
          throw new Error(errorData.error?.message || "Failed to generate image with Google Imagen");
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates[0] && result.candidates[0].image) {
          // Convert base64 to blob URL
          const base64Data = result.candidates[0].image.data;
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let j = 0; j < byteCharacters.length; j++) {
            byteNumbers[j] = byteCharacters.charCodeAt(j);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
          imageUrls.push(imageUrl);
        } else {
          throw new Error("No image data received from Google Imagen");
        }

        // Pause between requests
        if (i < batchSize - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      } catch (err) {
        console.error("Google Imagen generation error:", err);
        if (imageUrls.length === 0 && i === batchSize - 1) {
          throw err;
        }
      }
    }

    return imageUrls;
  };

  const generateWithHuggingFace = async (options: GenerationOptions, batchSize: number) => {
    const modelMap: Record<string, string> = {
      "sdxl-turbo": "stabilityai/sdxl-turbo",
      "sdxl-1.5": "stabilityai/stable-diffusion-xl-base-1.0",
      "sd-lightning": "ByteDance/SDXL-Lightning",
      "flux": "stabilityai/stable-diffusion-xl-base-1.0",
      "realvis": "SG161222/RealVisXL_V4.0",
      "dreamshaper": "Lykon/dreamshaper-xl-1-0",
      "deepfloyd": "stabilityai/stable-diffusion-xl-base-1.0",
      "openjourney": "prompthero/openjourney-v4",
      "controlnet": "stabilityai/stable-diffusion-xl-base-1.0",
      "playground": "playgroundai/playground-v2.5-1024px-aesthetic",
      "julibrain": "stabilityai/stable-diffusion-xl-base-1.0",
      "pixart": "stabilityai/stable-diffusion-xl-base-1.0",
    };
    
    const actualModelId = modelMap[options.model] || "stabilityai/stable-diffusion-xl-base-1.0";
    
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
    
    width = Math.floor(width / 8) * 8;
    height = Math.floor(height / 8) * 8;
    
    let stylePrompt = options.prompt;
    if (options.stylePreset) {
      stylePrompt = `${options.prompt}, ${options.stylePreset} style, high quality, detailed, professional`;
    }
    
    const endpoint = `${HUGGING_FACE_BASE_URL}${actualModelId}`;
    const imageUrls = [];
    
    for (let i = 0; i < batchSize; i++) {
      try {
        const randomSeed = Math.floor(Math.random() * 2147483647);
        
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
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
              seed: randomSeed,
            }
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown API error" }));
          console.error("HuggingFace API error response:", errorData);
          
          if (errorData.error && errorData.error.includes("exceeded your monthly included credits")) {
            throw new Error("API usage limit reached. This is a demo with limited generations per month.");
          } else if (errorData.error && errorData.error.includes("does not exist")) {
            console.log("Model not found, using fallback...");
            const fallbackResponse = await fetch(`${HUGGING_FACE_BASE_URL}stabilityai/stable-diffusion-xl-base-1.0`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
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
                  seed: randomSeed,
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
        
        if (i < batchSize - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } catch (err) {
        console.error("Individual image generation error:", err);
        if (imageUrls.length === 0 && i === batchSize - 1) {
          throw err;
        }
      }
    }

    return imageUrls;
  };

  const generateImage = async (options: GenerationOptions, batchSize: number = 1) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const isGoogleModel = options.model.startsWith("google-imagen");
      
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} image${batchSize > 1 ? 's' : ''} with ${isGoogleModel ? 'Google Imagen 3' : 'Hugging Face models'}`,
      });
      
      console.log(`Attempting to generate image with model: ${options.model}`);
      
      let imageUrls;
      
      if (isGoogleModel) {
        imageUrls = await generateWithGoogleImagen(options, batchSize);
      } else {
        imageUrls = await generateWithHuggingFace(options, batchSize);
      }
      
      if (imageUrls.length === 0) {
        throw new Error("Failed to generate any images. Please try again.");
      }
      
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Created ${imageUrls.length} unique image${imageUrls.length > 1 ? 's' : ''} using ${isGoogleModel ? 'Google Imagen 3' : 'AI models'}`,
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

import { styleCategories } from '@/data/imageGeneratorData';

export default useImageGeneration;
