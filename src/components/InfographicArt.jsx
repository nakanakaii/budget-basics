export default function InfographicArt({ topic, label }) {
  const art = {
    "needs-vs-wants": (
      <>
        <circle cx="45" cy="50" r="30" />
        <circle cx="115" cy="50" r="30" />
        <path d="M45 35v30M30 50h30M100 50h30" />
      </>
    ),
    "50-30-20": (
      <>
        <circle cx="80" cy="50" r="35" />
        <path d="M80 50V15A35 35 0 0 1 80 85ZM80 50 50 68" />
        <text x="68" y="55">
          %
        </text>
      </>
    ),
    "budget-cycle": (
      <>
        <path d="M43 28A43 43 0 0 1 121 45l10-5-4 22-20-10 9-4M117 72A43 43 0 0 1 39 55l-10 5 4-22 20 10-9 4" />
        <circle cx="80" cy="50" r="13" />
      </>
    ),
    "saving-challenges": (
      <>
        <path d="M43 40h74v42H43zM55 40c0-22 20-22 25 0M105 40c0-22-20-22-25 0M80 40v42" />
        <path d="m70 60 7 7 15-18" />
      </>
    ),
  };
  return (
    <svg
      className="infographic-art"
      viewBox="0 0 160 100"
      role="img"
      aria-label={label}
    >
      {art[topic]}
    </svg>
  );
}
