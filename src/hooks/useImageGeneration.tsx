
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

// Hugging Face API key
const HUGGING_FACE_API_KEY = "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";

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateWithHuggingFace = async (options: GenerationOptions, batchSize: number) => {
    console.log('=== HUGGING FACE GENERATION START ===');
    console.log('Options:', options);
    console.log('API Key Status:', HUGGING_FACE_API_KEY ? 'Present' : 'Missing');
    
    // Enhanced prompt with comprehensive style integration
    let enhancedPrompt = options.prompt.trim();
    
    if (options.stylePreset && options.stylePreset !== '') {
      const styleMappings: Record<string, string> = {
        // Styles
        '3d': '3D rendered style, volumetric lighting, detailed 3D textures, realistic materials',
        '8-bit': 'retro 8-bit pixel art style, classic video game aesthetics, pixelated graphics',
        'analogue': 'vintage analogue film photography, film grain, classic camera look',
        'anime': 'high quality anime art style, cel-shaded animation, manga inspired illustration',
        'cartoon': 'vibrant cartoon illustration style, bold colors, stylized characters',
        'collage': 'artistic mixed media collage, layered composition, creative assembly',
        'cookie': 'cute cookie dough texture style, sweet confectionery aesthetic',
        'crayon': 'hand-drawn crayon art style, waxy texture, childlike artistic expression',
        'doodle': 'casual hand-drawn doodle style, sketch-like lines, informal drawing',
        'dough': 'clay sculpture style, malleable texture, handcrafted pottery look',
        'felt': 'soft felt fabric texture, textile art style, crafted appearance',
        'illustrated': 'professional digital illustration, polished artwork, detailed rendering',
        'marker': 'bold marker pen drawing style, vibrant strokes, graphic design',
        'mechanical': 'technical blueprint style, precise engineering lines, technical drawing',
        'painting': 'traditional oil painting style, visible brushstrokes, artistic masterpiece',
        'paper': 'paper craft origami style, folded paper art, geometric shapes',
        'pin': 'vintage pin-up art style, retro poster design, classic glamour',
        'plushie': 'soft toy plushie appearance, cuddly fabric texture, cute stuffed animal',
        'realistic': 'ultra-photorealistic style, lifelike details, professional photography',
        'tattoo': 'bold tattoo art style, ink design, traditional body art',
        'woodblock': 'traditional woodblock print style, carved texture, printmaking art',
        
        // Moods
        'sweets': 'candy-colored sweet aesthetic, pastel tones, confectionery theme',
        'classical': 'elegant classical art style, timeless beauty, refined composition',
        'cyberpunk': 'futuristic cyberpunk aesthetic, neon lights, high-tech atmosphere',
        'dreamy': 'soft dreamy atmosphere, ethereal quality, fantasy-like mood',
        'glowy': 'magical luminous glow, radiant lighting, enchanted illumination',
        'gothic': 'dark gothic atmosphere, dramatic shadows, mysterious mood',
        'kawaii': 'adorable kawaii cute style, Japanese pop culture, charming characters',
        'mystical': 'mystical magical atmosphere, enchanted elements, supernatural mood',
        'trippy': 'psychedelic surreal patterns, mind-bending visuals, abstract geometry',
        'tropical': 'vibrant tropical paradise, exotic nature, warm atmosphere',
        'steampunk': 'vintage steampunk design, brass machinery, Victorian technology',
        'wasteland': 'post-apocalyptic wasteland, desolate landscape, survival atmosphere',
        
        // Lighting
        'bright': 'bright daylight illumination, well-lit scene, clear visibility',
        'dark': 'dramatic dark lighting, moody shadows, low-key illumination',
        'neon': 'vibrant neon lighting, electric glow, urban night scene',
        'sunset': 'warm golden hour sunset, romantic lighting, soft glow',
        'misty': 'atmospheric misty fog, mysterious ambiance, soft diffused light',
        'ethereal': 'divine ethereal lighting, heavenly glow, spiritual illumination',
        
        // Colors
        'cool': 'cool color palette, blues and greens, calming tones',
        'earthy': 'natural earthy colors, browns and greens, organic palette',
        'indigo': 'deep indigo blue tones, night sky colors, rich blue palette',
        'infrared': 'infrared thermal imaging style, heat signature colors, false color',
        'pastel': 'soft pastel color scheme, gentle hues, light color palette',
        'warm': 'warm color palette, reds and oranges, cozy atmosphere'
      };
      
      const styleDescription = styleMappings[options.stylePreset] || `${options.stylePreset} style`;
      enhancedPrompt = `${enhancedPrompt}, ${styleDescription}, high quality, professional, detailed artwork`;
    }

    // Add quality and detail enhancers
    enhancedPrompt += ', masterpiece, best quality, ultra detailed, sharp focus, professional lighting';

    console.log('Final enhanced prompt:', enhancedPrompt);

    // Updated model mapping for better Hugging Face models
    const modelMappings: Record<string, string> = {
      'google-imagen-3': 'black-forest-labs/FLUX.1-schnell',
      'google-imagen-3-fast': 'black-forest-labs/FLUX.1-schnell',
      'google-imagen-4': 'black-forest-labs/FLUX.1-dev',
      'sdxl-1.5': 'stabilityai/stable-diffusion-xl-base-1.0',
      'sdxl-turbo': 'stabilityai/sdxl-turbo',
      'flux': 'black-forest-labs/FLUX.1-schnell',
      'sd-lightning': 'ByteDance/SDXL-Lightning',
      'realvis': 'SG161222/RealVisXL_V4.0',
      'dreamshaper': 'Lykon/DreamShaper',
      'openjourney': 'prompthero/openjourney',
      'deepfloyd': 'DeepFloyd/IF-I-XL-v1.0',
      'controlnet': 'diffusers/controlnet-canny-sdxl-1.0',
      'playground': 'playgroundai/playground-v2.5-1024px-aesthetic',
      'pixart': 'PixArt-alpha/PixArt-Sigma-XL-2-1024-MS',
      'julibrain': 'stabilityai/stable-diffusion-xl-base-1.0'
    };

    const huggingFaceModel = modelMappings[options.model] || 'black-forest-labs/FLUX.1-schnell';
    console.log('Using Hugging Face model:', huggingFaceModel);

    const imageUrls = [];
    
    for (let i = 0; i < batchSize; i++) {
      try {
        console.log(`=== Generating image ${i + 1}/${batchSize} ===`);

        // Calculate dimensions based on aspect ratio
        const [widthRatio, heightRatio] = options.aspectRatio.split(':').map(Number);
        let width = 1024;
        let height = 1024;
        
        if (widthRatio && heightRatio) {
          const aspectValue = widthRatio / heightRatio;
          if (aspectValue > 1) {
            // Landscape
            width = 1024;
            height = Math.round(1024 / aspectValue);
          } else if (aspectValue < 1) {
            // Portrait
            width = Math.round(1024 * aspectValue);
            height = 1024;
          }
        }

        // Ensure dimensions are within acceptable range
        width = Math.min(Math.max(width, 512), 1024);
        height = Math.min(Math.max(height, 512), 1024);

        const requestBody = {
          inputs: enhancedPrompt,
          parameters: {
            guidance_scale: options.guidanceScale,
            num_inference_steps: Math.min(options.steps, 50), // Limit steps for faster generation
            width: width,
            height: height,
            negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, text, logo, cut off, low res, pixelated, grainy, artifacts, noise, oversaturated, undersaturated"
          }
        };

        console.log('Request body:', JSON.stringify(requestBody, null, 2));

        const apiUrl = `https://api-inference.huggingface.co/models/${huggingFaceModel}`;
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ImageGenerator/1.0)"
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Hugging Face API error - Status:", response.status);
          console.error("Hugging Face API error - Response:", errorText);
          
          if (response.status === 401) {
            throw new Error("API key authentication failed. Please verify your Hugging Face API key has the required permissions.");
          } else if (response.status === 400) {
            throw new Error("Invalid request parameters. Please try different settings or a simpler prompt.");
          } else if (response.status === 503) {
            throw new Error("Model is currently loading. Please wait a moment and try again.");
          } else if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please wait before generating more images.");
          } else {
            throw new Error(`API Error (${response.status}): ${errorText || 'Unknown error occurred'}`);
          }
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        console.log('Content type:', contentType);
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('JSON Error response:', errorData);
          if (errorData.error) {
            throw new Error(errorData.error);
          }
        }

        // Handle image response
        const blob = await response.blob();
        console.log('Blob size:', blob.size, 'bytes');
        console.log('Blob type:', blob.type);
        
        if (blob.size === 0) {
          throw new Error("Empty response from Hugging Face API. Please try again.");
        }

        const imageUrl = URL.createObjectURL(blob);
        imageUrls.push(imageUrl);
        console.log(`✅ Image ${i + 1} generated successfully`);

        // Add delay between requests to avoid rate limiting
        if (i < batchSize - 1) {
          console.log('Waiting 3 seconds before next request...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (err) {
        console.error(`❌ Generation error for image ${i + 1}:`, err);
        // Continue with other images if this one fails
        if (imageUrls.length === 0 && i === batchSize - 1) {
          throw err; // Only throw if no images were generated at all
        }
      }
    }

    console.log(`=== GENERATION COMPLETE: ${imageUrls.length}/${batchSize} images generated ===`);
    return imageUrls;
  };

  const generateImage = async (options: GenerationOptions, batchSize: number = 1) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      console.log('🚀 Starting image generation with Hugging Face:', { 
        model: options.model, 
        batchSize,
        aspectRatio: options.aspectRatio,
        style: options.stylePreset,
        prompt: options.prompt.substring(0, 50) + '...'
      });
      
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} high-quality image${batchSize > 1 ? 's' : ''} with Hugging Face AI`,
      });
      
      const imageUrls = await generateWithHuggingFace(options, batchSize);
      
      if (!imageUrls || imageUrls.length === 0) {
        throw new Error("Failed to generate any images. Please check your API key permissions and try again.");
      }
      
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Generated ${imageUrls.length} unique image${imageUrls.length > 1 ? 's' : ''} using Hugging Face AI`,
        variant: "default",
      });
      
      return imageUrls;
    } catch (err: any) {
      console.error("❌ Image generation error:", err);
      const errorMessage = err.message || 'Failed to generate image. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Image generation failed",
        description: errorMessage,
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
