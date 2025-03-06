
import { useState, useEffect } from 'react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { modelsList, aspectRatios } from '@/data/imageGeneratorData';

// Import refactored components
import ImageCreatorHeader from './image-creator/ImageCreatorHeader';
import PromptForm from './image-creator/PromptForm';
import AdvancedSettings from './image-creator/AdvancedSettings';
import ModelSelector from './image-creator/ModelSelector';
import ImagePreview from './image-creator/ImagePreview';
import GenerateButton from './image-creator/GenerateButton';

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

  return (
    <section id="create" className="section-padding bg-futuristic-black relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-futuristic-darkgray to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <ImageCreatorHeader />

        <div className="glass-panel p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <PromptForm 
                prompt={prompt}
                setPrompt={setPrompt}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                style={style}
                setStyle={setStyle}
                availableRatios={availableRatios}
              />
              
              <AdvancedSettings 
                quality={quality}
                setQuality={setQuality}
                guidanceScale={guidanceScale}
                setGuidanceScale={setGuidanceScale}
                steps={steps}
                setSteps={setSteps}
                batchSize={batchSize}
                setBatchSize={setBatchSize}
              />
              
              <ModelSelector 
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                setAspectRatio={setAspectRatio}
                aspectRatio={aspectRatio}
              />
              
              <GenerateButton 
                handleGenerate={handleGenerate}
                isGenerating={isGenerating}
                isDisabled={!prompt.trim()}
                batchSize={batchSize}
              />
            </div>
            
            <div className="md:w-1/2">
              <ImagePreview 
                generatedImagesUrls={generatedImagesUrls}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                handleDownload={handleDownload}
                isGenerating={isGenerating}
                prompt={prompt}
                selectedModel={selectedModel}
                style={style}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCreator;
