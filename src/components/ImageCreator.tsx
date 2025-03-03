
import { useState } from 'react';
import { Sparkles, Zap, Palette, Infinity } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "16:9", label: "Widescreen (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "21:9", label: "Ultrawide (21:9)" },
];

const stylePresets = [
  { value: "photorealistic", label: "Photorealistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime" },
  { value: "digital-art", label: "Digital Art" },
  { value: "oil-painting", label: "Oil Painting" },
  { value: "watercolor", label: "Watercolor" },
  { value: "pencil-sketch", label: "Pencil Sketch" },
  { value: "3d-render", label: "3D Render" },
];

const models = [
  { value: "flux", label: "FLUX.1-schnell MAX", description: "Fastest generation (4 sec)" },
  { value: "realvis", label: "RealVisXL UHD", description: "Highest realism" },
  { value: "imagen", label: "Google Imagen 3", description: "Best composition" },
  { value: "dalle", label: "DALLE 3", description: "Most creative" },
];

const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("flux");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [style, setStyle] = useState("cinematic");
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // In a real implementation, we would call an API here
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section id="create" className="section-padding bg-futuristic-black relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-futuristic-darkgray to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-futuristic-yellow/10 border border-futuristic-yellow/30 mb-4">
            <span className="text-sm font-medium text-futuristic-yellow">Image Creation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bring Your <span className="text-futuristic-yellow">Vision</span> to Life
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Create stunning AI-generated images with our intuitive creation tool. Just describe what you want to see, customize your settings, and watch as AI brings your ideas to reality.
          </p>
        </div>

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
                      {aspectRatios.map((ratio) => (
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
                    <SelectContent className="bg-futuristic-darkgray border-futuristic-gray text-white">
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
              
              <h3 className="text-xl font-semibold mb-4">Select AI Model</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {models.map((model) => (
                  <button
                    key={model.value}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedModel === model.value
                        ? 'bg-futuristic-yellow/20 border border-futuristic-yellow/50'
                        : 'bg-futuristic-darkgray border border-futuristic-gray hover:border-futuristic-yellow/30'
                    }`}
                    onClick={() => setSelectedModel(model.value)}
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
                        Using {models.find(m => m.value === selectedModel)?.label} with {stylePresets.find(s => s.value === style)?.label} style
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
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-futuristic-darkgray rounded-lg border border-futuristic-gray aspect-square flex items-center justify-center">
                  <Sparkles size={24} className="text-white/30" />
                </div>
                <div className="bg-futuristic-darkgray rounded-lg border border-futuristic-gray aspect-square flex items-center justify-center">
                  <Sparkles size={24} className="text-white/30" />
                </div>
                <div className="bg-futuristic-darkgray rounded-lg border border-futuristic-gray aspect-square flex items-center justify-center">
                  <Sparkles size={24} className="text-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCreator;
