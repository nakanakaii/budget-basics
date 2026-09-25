import { useState } from 'react'
import LocalFormNotice from '../components/LocalFormNotice.jsx'
import PageHero from '../components/PageHero.jsx'
import { feedbackSchema } from '../lib/validation.js'

const initial = { name: '', email: '', rating: '', comments: '' }

export default function FeedbackPage() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const change = (event) => { setSent(false); setValues({ ...values, [event.target.name]: event.target.value }) }
  const submit = (event) => {
    event.preventDefault()
    setSent(false)
    const result = feedbackSchema.safeParse({ ...values, rating: Number(values.rating) })
    if (!result.success) return setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])))
    setErrors({}); setSent(true); setValues(initial)
  }
  return <>
    <PageHero eyebrow="Feedback" title="Help improve the lessons"><p>Tell us what was clear and what could be better.</p></PageHero>
    <LocalFormNotice />
    <form className="support-form" aria-label="Feedback form" onSubmit={submit}>
      <Field label="Name" name="name" value={values.name} error={errors.name} onChange={change} />
      <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={change} />
      <div className="field"><label htmlFor="rating">Rating</label><select id="rating" name="rating" value={values.rating} onChange={change} aria-invalid={!!errors.rating} aria-describedby={errors.rating ? 'rating-error' : undefined}><option value="">Choose a rating</option>{[1,2,3,4,5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}</select>{errors.rating && <small id="rating-error" role="alert">{errors.rating}</small>}</div>
      <Field label="Comments" name="comments" as="textarea" value={values.comments} error={errors.comments} onChange={change} />
      <button className="primary-button" type="submit">Send feedback</button>
      {sent && <p className="success-message">Thank you. This demonstration was not transmitted or saved.</p>}
    </form>
  </>
}

export function Field({ label, name, type = 'text', as, value, error, onChange }) {
  const id = `${name}-error`
  const props = { name, value, onChange, 'aria-invalid': !!error, 'aria-describedby': error ? id : undefined }
  return <div className="field"><label htmlFor={name}>{label}</label>{as === 'textarea' ? <textarea id={name} {...props} /> : <input id={name} type={type} {...props} />}{error && <small id={id} role="alert">{error}</small>}</div>
}
