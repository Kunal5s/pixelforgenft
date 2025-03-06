
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedSettingsProps {
  quality: number[];
  setQuality: (quality: number[]) => void;
  guidanceScale: number[];
  setGuidanceScale: (scale: number[]) => void;
  steps: number[];
  setSteps: (steps: number[]) => void;
  batchSize: number;
  setBatchSize: (size: number) => void;
}

const AdvancedSettings = ({
  quality,
  setQuality,
  guidanceScale,
  setGuidanceScale,
  steps,
  setSteps,
  batchSize,
  setBatchSize
}: AdvancedSettingsProps) => {
  return (
    <div>
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
        <label className="text-sm text-white/80 mb-2 block">Batch Size (Unique Images)</label>
        <Select value={batchSize.toString()} onValueChange={(value) => setBatchSize(Number(value))}>
          <SelectTrigger className="bg-futuristic-darkgray border-futuristic-gray text-white">
            <SelectValue placeholder="Select batch size" />
          </SelectTrigger>
          <SelectContent className="bg-futuristic-darkgray border-futuristic-gray text-white">
            {[1, 2, 4, 6, 8, 10].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} {size > 1 ? "unique images" : "image"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-white/60 mt-2">
          Generate multiple unique images with different variations of your prompt.
        </p>
      </div>
    </div>
  );
};

export default AdvancedSettings;
