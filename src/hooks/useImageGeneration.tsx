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

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateWithGoogleImagen = async (options: GenerationOptions, batchSize: number) => {
    console.log('=== GOOGLE IMAGEN 3 GENERATION START ===');
    console.log('Options:', options);
    console.log('API Key (first 10 chars):', GOOGLE_GEMINI_API_KEY.substring(0, 10));
    
    // Enhanced prompt with style integration
    let enhancedPrompt = options.prompt;
    if (options.stylePreset && options.stylePreset !== '') {
      const styleMappings: Record<string, string> = {
        // Styles
        '3d': '3D rendered, volumetric lighting, detailed textures',
        '8-bit': '8-bit pixel art, retro gaming style, pixelated',
        'analogue': 'analogue film photography, vintage camera, film grain',
        'anime': 'anime art style, cel-shaded, manga inspired',
        'cartoon': 'cartoon illustration, vibrant colors, simplified forms',
        'collage': 'artistic collage, mixed media, layered composition',
        'cookie': 'cookie dough texture, edible art, confectionery style',
        'crayon': 'crayon drawing, waxy texture, child-like artistic style',
        'doodle': 'hand-drawn doodle, sketch-like, informal drawing',
        'dough': 'clay sculpture, malleable texture, handcrafted appearance',
        'felt': 'felt fabric texture, soft materials, textile art',
        'illustrated': 'professional illustration, detailed artwork, polished',
        'marker': 'marker pen drawing, bold strokes, vibrant colors',
        'mechanical': 'technical blueprint, precise lines, engineering drawing',
        'painting': 'traditional oil painting, brushstrokes, artistic masterpiece',
        'paper': 'paper craft, origami style, folded paper art',
        'pin': 'pin-up art style, vintage poster, retro glamour',
        'plushie': 'soft toy appearance, cuddly texture, fabric materials',
        'realistic': 'photorealistic, high detail, lifelike rendering',
        'tattoo': 'tattoo art style, bold lines, traditional ink design',
        'woodblock': 'woodblock print, traditional printmaking, carved texture',
        // Moods
        'sweets': 'candy-colored, sweet confectionery, pastel tones',
        'classical': 'classical art style, elegant composition, timeless beauty',
        'cyberpunk': 'cyberpunk aesthetic, neon lights, futuristic technology',
        'dreamy': 'dreamy atmosphere, soft focus, ethereal quality',
        'glowy': 'luminous glow, radiant lighting, magical illumination',
        'gothic': 'gothic style, dark atmosphere, dramatic shadows',
        'kawaii': 'kawaii cute style, adorable characters, Japanese pop culture',
        'mystical': 'mystical atmosphere, magical elements, enchanted mood',
        'trippy': 'psychedelic, surreal patterns, mind-bending visuals',
        'tropical': 'tropical paradise, vibrant nature, exotic atmosphere',
        'steampunk': 'steampunk design, brass machinery, Victorian technology',
        'wasteland': 'post-apocalyptic wasteland, desolate landscape, survival theme',
        // Lighting
        'bright': 'bright daylight, well-lit, clear visibility',
        'dark': 'dark moody lighting, dramatic shadows, low-key illumination',
        'neon': 'neon lighting, electric glow, urban night scene',
        'sunset': 'golden hour sunset, warm lighting, romantic atmosphere',
        'misty': 'misty atmosphere, fog effects, mysterious ambiance',
        'ethereal': 'ethereal soft lighting, divine glow, heavenly illumination',
        // Colors
        'cool': 'cool color palette, blues and greens, calming tones',
        'earthy': 'earthy natural colors, browns and greens, organic palette',
        'indigo': 'indigo blue tones, deep blue palette, night sky colors',
        'infrared': 'infrared thermal imaging, heat signature colors, false color',
        'pastel': 'soft pastel colors, gentle hues, light color palette',
        'warm': 'warm color palette, reds and oranges, cozy atmosphere'
      };
      
      const styleDescription = styleMappings[options.stylePreset] || options.stylePreset;
      enhancedPrompt = `${options.prompt}, ${styleDescription}, high quality, professional, detailed`;
    }

    console.log('Enhanced prompt:', enhancedPrompt);

    const imageUrls = [];
    
    for (let i = 0; i < batchSize; i++) {
      try {
        console.log(`=== Generating image ${i + 1}/${batchSize} ===`);

        const requestBody = {
          prompt: enhancedPrompt,
          config: {
            aspectRatio: options.aspectRatio.replace(':', '_'),
            negativePrompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, text, logo, cut off, low res, pixelated, grainy",
            personGeneration: "allow_adult",
            safetyFilterLevel: "block_only_high",
            includeRaiInfo: false
          }
        };

        console.log('Request body:', JSON.stringify(requestBody, null, 2));

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage?key=${GOOGLE_GEMINI_API_KEY}`;
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
          console.error("Google Imagen API error - Status:", response.status);
          console.error("Google Imagen API error - Response:", responseText);
          
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch {
            errorData = { error: { message: responseText } };
          }
          
          if (response.status === 403) {
            throw new Error("API key authentication failed. Please check your Google Gemini API key permissions for Imagen 3.");
          } else if (response.status === 400) {
            throw new Error("Invalid request format. Please try a different prompt or settings.");
          } else {
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${responseText}`);
          }
        }

        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          throw new Error('Invalid response format from Google Imagen API');
        }

        console.log('Parsed API Response:', result);
        
        if (result.candidates && result.candidates[0] && result.candidates[0].image && result.candidates[0].image.data) {
          // Convert base64 to blob URL
          const base64Data = result.candidates[0].image.data;
          console.log('Base64 data length:', base64Data.length);
          
          try {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let j = 0; j < byteCharacters.length; j++) {
              byteNumbers[j] = byteCharacters.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            imageUrls.push(imageUrl);
            console.log('✅ Image generated successfully:', i + 1);
          } catch (conversionError) {
            console.error('Error converting base64 to blob:', conversionError);
            throw new Error('Failed to process generated image data');
          }
        } else {
          console.error('❌ No image data in response. Response structure:', JSON.stringify(result, null, 2));
          throw new Error("No image data received from Google Imagen. The API may be experiencing issues.");
        }

        // Small delay between requests
        if (i < batchSize - 1) {
          console.log('Waiting 1 second before next request...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (err) {
        console.error(`❌ Google Imagen generation error for image ${i + 1}:`, err);
        // If this is the first image and it fails, throw the error
        if (imageUrls.length === 0 && i === batchSize - 1) {
          throw err;
        }
      }
    }

    console.log(`=== GENERATION COMPLETE: ${imageUrls.length}/${batchSize} images generated ===`);
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
      
      console.log('🚀 Starting image generation:', { 
        model: options.model, 
        isGoogleModel, 
        batchSize,
        aspectRatio: options.aspectRatio,
        style: options.stylePreset,
        prompt: options.prompt.substring(0, 50) + '...'
      });
      
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} image${batchSize > 1 ? 's' : ''} with ${isGoogleModel ? 'Google Imagen 3' : 'Hugging Face models'}`,
      });
      
      let imageUrls;
      
      if (isGoogleModel) {
        imageUrls = await generateWithGoogleImagen(options, batchSize);
      } else {
        imageUrls = await generateWithHuggingFace(options, batchSize);
      }
      
      if (!imageUrls || imageUrls.length === 0) {
        throw new Error("Failed to generate any images. Please try again with a different prompt or settings.");
      }
      
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Created ${imageUrls.length} unique image${imageUrls.length > 1 ? 's' : ''} using ${isGoogleModel ? 'Google Imagen 3' : 'AI models'}`,
        variant: "default",
      });
      
      return imageUrls;
    } catch (err: any) {
      console.error("❌ Image generation error:", err);
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
