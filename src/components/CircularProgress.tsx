interface CircularProgressProps {
  completionRate: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ completionRate }) => {
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - completionRate / 100 * circumference;

  return (
    <div className="relative flex items-center justify-center">
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
      <div className="absolute text-sm font-semibold">
        {Math.round(completionRate)}%
      </div>
    </div>
  );
};

export default CircularProgress;