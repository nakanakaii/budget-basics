import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/" aria-label="BudgetBasics home">
      <svg viewBox="0 0 52 42" aria-hidden="true">
        <path
          className="bee-wing"
          d="M25 15C14 2 4 9 12 20m15-5C38 2 48 9 40 20"
        />
        <ellipse className="bee-body" cx="26" cy="25" rx="14" ry="11" />
        <path d="M19 16v18m14-18v18" />
        <circle cx="21" cy="24" r="1.4" />
        <circle cx="31" cy="24" r="1.4" />
      </svg>
      <span>
        Budget<span>Basics</span>
      </span>
    </Link>
  );
}
