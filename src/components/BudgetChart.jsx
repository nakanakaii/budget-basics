const colors = ["#173f35", "#b57918", "#4f7c55"];
export default function BudgetChart({ parts }) {
  return (
    <div className="budget-chart">
      <svg viewBox="0 0 42 42" role="img" aria-label="50 30 20 budget chart">
        <circle
          cx="21"
          cy="21"
          r="15.9"
          fill="none"
          stroke="#e6e9e6"
          strokeWidth="6"
        />
        {parts.map(({ label, percent }, index) => (
          <circle
            key={label}
            cx="21"
            cy="21"
            r="15.9"
            fill="none"
            stroke={colors[index]}
            strokeWidth="6"
            strokeDasharray={`${percent} ${100 - percent}`}
            strokeDashoffset={
              -parts
                .slice(0, index)
                .reduce((sum, part) => sum + part.percent, 0)
            }
          />
        ))}
      </svg>
      <div className="chart-bars">
        {parts.map(({ label, percent }) => (
          <div key={label}>
            <span>
              {label} ({percent}%)
            </span>
            <progress max="100" value={percent}>
              {percent}%
            </progress>
          </div>
        ))}
      </div>
    </div>
  );
}
