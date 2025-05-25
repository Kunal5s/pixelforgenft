
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { aspectRatios, styleCategories } from '@/data/imageGeneratorData';

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
      </div>

      {/* New Style Categories */}
      <div className="space-y-6 mb-6">
        {/* Styles */}
        <div>
          <label className="text-sm text-white/80 mb-3 block">Styles</label>
          <ToggleGroup type="single" value={style} onValueChange={setStyle} className="flex flex-wrap gap-2">
            {styleCategories.styles.map((styleOption) => (
              <ToggleGroupItem
                key={styleOption.value}
                value={styleOption.value}
                className="bg-futuristic-darkgray border-futuristic-gray text-white hover:bg-futuristic-yellow/20 data-[state=on]:bg-futuristic-yellow/30 data-[state=on]:text-futuristic-yellow text-xs px-3 py-1"
              >
                {styleOption.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Moods */}
        <div>
          <label className="text-sm text-white/80 mb-3 block">Moods</label>
          <ToggleGroup type="single" value={style} onValueChange={setStyle} className="flex flex-wrap gap-2">
            {styleCategories.moods.map((moodOption) => (
              <ToggleGroupItem
                key={moodOption.value}
                value={moodOption.value}
                className="bg-futuristic-darkgray border-futuristic-gray text-white hover:bg-futuristic-yellow/20 data-[state=on]:bg-futuristic-yellow/30 data-[state=on]:text-futuristic-yellow text-xs px-3 py-1"
              >
                {moodOption.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Lighting */}
        <div>
          <label className="text-sm text-white/80 mb-3 block">Lighting</label>
          <ToggleGroup type="single" value={style} onValueChange={setStyle} className="flex flex-wrap gap-2">
            {styleCategories.lighting.map((lightingOption) => (
              <ToggleGroupItem
                key={lightingOption.value}
                value={lightingOption.value}
                className="bg-futuristic-darkgray border-futuristic-gray text-white hover:bg-futuristic-yellow/20 data-[state=on]:bg-futuristic-yellow/30 data-[state=on]:text-futuristic-yellow text-xs px-3 py-1"
              >
                {lightingOption.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Colors */}
        <div>
          <label className="text-sm text-white/80 mb-3 block">Colors</label>
          <ToggleGroup type="single" value={style} onValueChange={setStyle} className="flex flex-wrap gap-2">
            {styleCategories.colors.map((colorOption) => (
              <ToggleGroupItem
                key={colorOption.value}
                value={colorOption.value}
                className="bg-futuristic-darkgray border-futuristic-gray text-white hover:bg-futuristic-yellow/20 data-[state=on]:bg-futuristic-yellow/30 data-[state=on]:text-futuristic-yellow text-xs px-3 py-1"
              >
                {colorOption.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default PromptForm;
