
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  handleGenerate: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
  batchSize: number;
}

const GenerateButton = ({
  handleGenerate,
  isGenerating,
  isDisabled,
  batchSize
}: GenerateButtonProps) => {
  return (
    <button
      className={`button-primary w-full flex items-center justify-center gap-2 ${
        isGenerating || isDisabled ? 'opacity-80 cursor-not-allowed' : ''
      }`}
      onClick={handleGenerate}
      disabled={isGenerating || isDisabled}
    >
      {isGenerating ? (
        <>
          <div className="animate-spin w-5 h-5 border-2 border-futuristic-black border-t-transparent rounded-full"></div>
          <span>Generating Unique Images...</span>
        </>
      ) : (
        <>
          <Sparkles size={18} />
          <span>Generate {batchSize > 1 ? `${batchSize} Unique Images` : 'Image'}</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
