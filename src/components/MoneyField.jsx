export default function MoneyField({ id, label, error, ...props }) {
  return <label className="field" htmlFor={id}><span>{label}</span><span className="money-input"><span aria-hidden="true">SAR</span><input id={id} inputMode="decimal" {...props} aria-invalid={Boolean(error)} /></span>{error && <small role="alert">{error}</small>}</label>
}
