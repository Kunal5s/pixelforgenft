
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
    console.log('API Key (first 10 chars):', HUGGING_FACE_API_KEY.substring(0, 10));
    
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

    // Model mapping for Hugging Face
    const modelMappings: Record<string, string> = {
      'google-imagen-3': 'stabilityai/stable-diffusion-xl-base-1.0',
      'google-imagen-4': 'stabilityai/stable-diffusion-xl-base-1.0',
      'flux': 'black-forest-labs/FLUX.1-schnell',
      'realvis': 'SG161222/RealVisXL_V4.0',
      'sdxl': 'stabilityai/stable-diffusion-xl-base-1.0'
    };

    const huggingFaceModel = modelMappings[options.model] || 'stabilityai/stable-diffusion-xl-base-1.0';
    console.log('Using Hugging Face model:', huggingFaceModel);

    const imageUrls = [];
    
    for (let i = 0; i < batchSize; i++) {
      try {
        console.log(`=== Generating image ${i + 1}/${batchSize} ===`);

        // Parse aspect ratio for dimensions
        const [widthRatio, heightRatio] = options.aspectRatio.split(':').map(Number);
        const baseSize = 512;
        const width = Math.round(baseSize * Math.sqrt((widthRatio * widthRatio) / (widthRatio * widthRatio + heightRatio * heightRatio)) / widthRatio * widthRatio);
        const height = Math.round(baseSize * Math.sqrt((heightRatio * heightRatio) / (widthRatio * widthRatio + heightRatio * heightRatio)) / heightRatio * heightRatio);

        const requestBody = {
          inputs: enhancedPrompt,
          parameters: {
            guidance_scale: options.guidanceScale,
            num_inference_steps: options.steps,
            width: Math.min(width, 1024),
            height: Math.min(height, 1024),
            negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, text, logo, cut off, low res, pixelated, grainy"
          }
        };

        console.log('Request body:', JSON.stringify(requestBody, null, 2));

        const apiUrl = `https://api-inference.huggingface.co/models/${huggingFaceModel}`;
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json"
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
            throw new Error("API key authentication failed. Please check your Hugging Face API key permissions.");
          } else if (response.status === 400) {
            throw new Error("Invalid request format. Please try a different prompt or settings.");
          } else if (response.status === 503) {
            throw new Error("Model is loading. Please wait a moment and try again.");
          } else {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
          }
        }

        // Check if response is JSON (error) or blob (image)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          if (errorData.error) {
            throw new Error(errorData.error);
          }
        }

        // Handle image response
        const blob = await response.blob();
        console.log('Blob size:', blob.size);
        
        if (blob.size === 0) {
          throw new Error("Empty response from Hugging Face API");
        }

        const imageUrl = URL.createObjectURL(blob);
        imageUrls.push(imageUrl);
        console.log('✅ Image generated successfully:', i + 1);

        // Small delay between requests to avoid rate limiting
        if (i < batchSize - 1) {
          console.log('Waiting 2 seconds before next request...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (err) {
        console.error(`❌ Hugging Face generation error for image ${i + 1}:`, err);
        // If this is the first image and it fails, throw the error
        if (imageUrls.length === 0 && i === batchSize - 1) {
          throw err;
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
      
      console.log('🚀 Starting image generation:', { 
        model: options.model, 
        batchSize,
        aspectRatio: options.aspectRatio,
        style: options.stylePreset,
        prompt: options.prompt.substring(0, 50) + '...'
      });
      
      toast({
        title: "Generating images",
        description: `Creating ${batchSize} image${batchSize > 1 ? 's' : ''} with Hugging Face AI`,
      });
      
      const imageUrls = await generateWithHuggingFace(options, batchSize);
      
      if (!imageUrls || imageUrls.length === 0) {
        throw new Error("Failed to generate any images. Please try again with a different prompt or settings.");
      }
      
      setGeneratedImages(imageUrls);
      
      toast({
        title: "Images created successfully",
        description: `Created ${imageUrls.length} unique image${imageUrls.length > 1 ? 's' : ''} using Hugging Face AI`,
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
