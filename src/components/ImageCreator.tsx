import { useState, useEffect } from 'react';
import { Sparkles, Zap, Palette, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { modelsList, stylePresets, aspectRatios } from '@/data/imageGeneratorData';
import { useImageGeneration } from '@/hooks/useImageGeneration';

const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("flux");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [style, setStyle] = useState("cinematic");
  const [quality, setQuality] = useState([80]);
  const [guidanceScale, setGuidanceScale] = useState([9]);
  const [steps, setSteps] = useState([45]);
  const [batchSize, setBatchSize] = useState(1);
  const [generatedImagesUrls, setGeneratedImagesUrls] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { 
    generateImage, 
    isGenerating, 
    generatedImages, 
    error 
  } = useImageGeneration();

  useEffect(() => {
    if (generatedImages.length > 0) {
      setGeneratedImagesUrls(generatedImages);
    }
  }, [generatedImages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const result = await generateImage({
      prompt: prompt,
      model: selectedModel,
      aspectRatio: aspectRatio,
      stylePreset: style,
      quality: quality[0],
      guidanceScale: guidanceScale[0],
      steps: steps[0],
    }, batchSize);
    
    if (result) {
      setGeneratedImagesUrls(result);
      setSelectedImageIndex(0);
    }
  };

  const handleDownload = (index = selectedImageIndex) => {
    if (generatedImagesUrls.length <= index) return;
    
    const link = document.createElement('a');
    link.href = generatedImagesUrls[index];
    link.download = `ai-generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedModelData = modelsList.find(model => model.value === selectedModel);
  const availableRatios = selectedModelData?.supportedRatios || aspectRatios.map(r => r.value);
  const filteredAspectRatios = aspectRatios.filter(ratio => availableRatios.includes(ratio.value));

  return (
    <section id="create" className="section-padding bg-futuristic-black relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-futuristic-darkgray to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
            <span className="text-sm font-medium text-futuristic-yellow">AI Image Generator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create Stunning, <span className="text-futuristic-yellow">High-Quality</span> Artwork
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our Advanced AI Image Generator allows you to create professional, ultra-detailed images with multiple aspect ratios, artistic styles, and AI models. Customize your generation settings for the best results!
          </p>
        </div>

        <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-500">Best Practices</AlertTitle>
          <AlertDescription>
            For best results, try using the "Stable Diffusion XL 1.5+" model which is most reliable. If a model fails, 
            the system will automatically fall back to SDXL to ensure you always get an image.
          </AlertDescription>
        </Alert>

        <div className="glass-panel p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Describe Your Image</h3>
              
              <div className="mb-6">
                <Textarea
                  placeholder="Describe the image you want to create in detail..."
                  className="min-h-[120px] bg-futuristic-darkgray border-futuristic-gray text-white focus-visible:ring-futuristic-yellow"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-xs text-white/60 mt-2">
                  Be specific about subjects, style, lighting, composition, and mood for best results.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-white/80 mb-2 block">Aspect Ratio</label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger className="bg-futuristic-darkgray border-futuristic-gray text-white">
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent className="bg-futuristic-darkgray border-futuristic-gray text-white">
                      {filteredAspectRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          {ratio.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-white/80 mb-2 block">Style Preset</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-futuristic-darkgray border-futuristic-gray text-white">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="bg-futuristic-darkgray border-futuristic-gray text-white max-h-[300px]">
                      {stylePresets.map((stylePreset) => (
                        <SelectItem key={stylePreset.value} value={stylePreset.value}>
                          {stylePreset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-white/80 mb-2 block">Quality Level: {quality}%</label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-white/80 mb-2 block">Guidance Scale: {guidanceScale}</label>
                <Slider
                  value={guidanceScale}
                  onValueChange={setGuidanceScale}
                  max={15}
                  min={1}
                  step={0.1}
                  className="py-4"
                />
                <p className="text-xs text-white/60 mt-2">
                  Higher values make images follow your prompt more closely.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-white/80 mb-2 block">Steps: {steps}</label>
                <Slider
                  value={steps}
                  onValueChange={setSteps}
                  max={100}
                  min={10}
                  step={1}
                  className="py-4"
                />
                <p className="text-xs text-white/60 mt-2">
                  More steps result in higher-quality and more detailed images.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-white/80 mb-2 block">Batch Size</label>
                <Select value={batchSize.toString()} onValueChange={(value) => setBatchSize(Number(value))}>
                  <SelectTrigger className="bg-futuristic-darkgray border-futuristic-gray text-white">
                    <SelectValue placeholder="Select batch size" />
                  </SelectTrigger>
                  <SelectContent className="bg-futuristic-darkgray border-futuristic-gray text-white">
                    {[1, 2, 4, 6, 8, 10].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {size > 1 ? "images" : "image"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-white/60 mt-2">
                  Generate multiple unique images in one go.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Select AI Model</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {modelsList.map((model) => (
                  <button
                    key={model.value}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedModel === model.value
                        ? 'bg-futuristic-yellow/20 border border-futuristic-yellow/50'
                        : 'bg-futuristic-darkgray border border-futuristic-gray hover:border-futuristic-yellow/30'
                    }`}
                    onClick={() => {
                      setSelectedModel(model.value);
                      if (!model.supportedRatios.includes(aspectRatio)) {
                        setAspectRatio(model.supportedRatios[0]);
                      }
                    }}
                  >
                    <div className="font-medium">{model.label}</div>
                    <div className="text-xs text-white/60">{model.description}</div>
                  </button>
                ))}
              </div>
              
              <button
                className={`button-primary w-full flex items-center justify-center gap-2 ${
                  isGenerating ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-futuristic-black border-t-transparent rounded-full"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Preview</h3>
              <div className="bg-futuristic-darkgray rounded-lg border border-futuristic-gray h-[450px] overflow-hidden relative">
                {generatedImagesUrls.length > 0 && selectedImageIndex < generatedImagesUrls.length ? (
                  <div className="relative h-full">
                    <img 
                      src={generatedImagesUrls[selectedImageIndex]} 
                      alt={`AI generated ${prompt}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button 
                        onClick={() => handleDownload()} 
                        className="p-2 bg-futuristic-black/70 hover:bg-futuristic-yellow/80 rounded-full transition-colors"
                        title="Download image"
                      >
                        <Download size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                    {isGenerating ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-futuristic-yellow/20 border-t-futuristic-yellow rounded-full animate-spin mb-4"></div>
                        <p className="text-white/70">Generating your masterpiece...</p>
                      </div>
                    ) : prompt ? (
                      <div className="flex flex-col items-center">
                        <Sparkles size={48} className="text-futuristic-yellow/50 mb-4" />
                        <p className="text-white/70 text-center">Your image will appear here</p>
                        <p className="text-xs text-white/50 mt-2 text-center max-w-xs">
                          Using {modelsList.find(m => m.value === selectedModel)?.label} with {stylePresets.find(s => s.value === style)?.label} style
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <Zap size={48} className="text-futuristic-yellow/50 mb-4" />
                        <p className="text-white/70">Enter a prompt to create your image</p>
                        <p className="text-xs text-white/50 mt-2 max-w-xs">
                          Be descriptive for best results - include details about subject, style, lighting, and composition
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {generatedImagesUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {generatedImagesUrls.map((url, index) => (
                    <div 
                      key={index}
                      className={`bg-futuristic-darkgray rounded-lg border overflow-hidden aspect-square cursor-pointer
                        ${index === selectedImageIndex ? 'border-futuristic-yellow' : 'border-futuristic-gray'}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={url} 
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {Array(4 - (generatedImagesUrls.length % 4 || 4)).fill(0).map((_, index) => (
                    <div key={`empty-${index}`} className="bg-futuristic-darkgray rounded-lg border border-futuristic-gray aspect-square flex items-center justify-center">
                      <Sparkles size={24} className="text-white/30" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCreator;
