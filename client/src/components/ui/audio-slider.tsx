import ProgressBar from "@/components/ui/progress-bar";

interface AudioSliderProps {
  value: number;
  onChange: (value: number) => void;
  icon: string;
  id: string;
  label: string;
}

export default function AudioSlider({ value, onChange, icon, id, label }: AudioSliderProps) {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <span className="text-white text-xl">{label}</span>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <img 
          src={icon}
          alt={label.toLowerCase()} 
          className="h-12 w-12 [filter:brightness(0)_invert(1)]"
        />
        <div 
          id={id}
          className="h-6 w-[400px] relative cursor-pointer"
          onMouseDown={() => onChange(value)}
        >
          <ProgressBar percentage={value} color="bg-orange-400" />
          <img 
            src="/icons/fish.png" 
            alt="fish" 
            className="absolute h-14 w-14 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ 
              left: `${value}%`, 
              filter: 'brightness(0) saturate(100%) invert(52%) sepia(19%) saturate(4307%) hue-rotate(355deg) brightness(92%) contrast(83%)' 
            }}
          />
        </div>
      </div>
    </div>
  );
} 