
import { Download, Sparkles, Zap } from 'lucide-react';
import { modelsList, stylePresets } from '@/data/imageGeneratorData';

interface ImagePreviewProps {
  generatedImagesUrls: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  handleDownload: (index?: number) => void;
  isGenerating: boolean;
  prompt: string;
  selectedModel: string;
  style: string;
}

const ImagePreview = ({
  generatedImagesUrls,
  selectedImageIndex,
  setSelectedImageIndex,
  handleDownload,
  isGenerating,
  prompt,
  selectedModel,
  style
}: ImagePreviewProps) => {
  return (
    <div>
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
  );
};

export default ImagePreview;
