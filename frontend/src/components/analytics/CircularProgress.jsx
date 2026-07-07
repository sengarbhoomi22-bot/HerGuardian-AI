const CircularProgress = ({ score = 75, size = 140 }) => {
  const radius = 54;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="grad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#B85CA8" />
            <stop offset="100%" stopColor="#E89BB5" />
          </linearGradient>
        </defs>
        <circle
          stroke="#F3F4F6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-2xl font-bold fill-current text-gray-800">
          <tspan>{score}</tspan>
          <tspan fontSize="14">%</tspan>
        </text>
      </svg>
      <p className="mt-3 text-sm text-gray-600">Weekly Wellness Score</p>
    </div>
  );
};

export default CircularProgress;
