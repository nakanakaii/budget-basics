export default function MoneyField({ id, label, error, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <span className="money-input">
        <span aria-hidden="true">YER</span>
        <input
          id={id}
          inputMode="decimal"
          {...props}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </span>
      {error && (
        <small id={`${id}-error`} role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
