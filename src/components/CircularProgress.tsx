interface CircularProgressProps {
  value: number;
  max: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max }) => {
  const radius = 60; 
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = max > 0 ? circumference - (value / max) * circumference : 0;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="blue"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <span className="text-sm font-semibold">{value} / {max}</span>
        <span className="text-xs">Tasks</span>
      </div>
    </div>
  );
};

export default CircularProgress;