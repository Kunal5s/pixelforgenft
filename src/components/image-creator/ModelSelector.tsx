
import { modelsList } from '@/data/imageGeneratorData';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  setAspectRatio: (ratio: string) => void;
  aspectRatio: string;
}

const ModelSelector = ({
  selectedModel,
  setSelectedModel,
  setAspectRatio,
  aspectRatio
}: ModelSelectorProps) => {
  return (
    <div>
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
    </div>
  );
};

export default ModelSelector;
