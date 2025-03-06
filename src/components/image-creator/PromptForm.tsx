
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aspectRatios, stylePresets } from '@/data/imageGeneratorData';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  style: string;
  setStyle: (style: string) => void;
  availableRatios: string[];
}

const PromptForm = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  style,
  setStyle,
  availableRatios
}: PromptFormProps) => {
  // Filter aspect ratios based on the selected model's supported ratios
  const filteredAspectRatios = aspectRatios.filter(ratio => availableRatios.includes(ratio.value));

  return (
    <div>
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
    </div>
  );
};

export default PromptForm;
