type ProgressBarProps = {
  percentage: number;
  color: string;
};

export default function ProgressBar({ percentage, color }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 h-full rounded-full overflow-hidden">
      <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
