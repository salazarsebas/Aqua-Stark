type ProgressBarProps = {
  percentage: number;
  color: string;
};

export default function ProgressBar({ percentage, color }: ProgressBarProps) {
  return (
    <div className="w-full bg-white h-full rounded-full overflow-hidden">
      <div className={`${color} h-full rounded-full transition-all  border-[3px] border-white` } style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
