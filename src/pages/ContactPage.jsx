import { useState } from 'react'
import LocalFormNotice from '../components/LocalFormNotice.jsx'
import PageHero from '../components/PageHero.jsx'
import { contactSchema } from '../lib/validation.js'
import { Field } from './FeedbackPage.jsx'

const initial = { name: '', email: '', message: '' }

export default function ContactPage() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const change = (event) => { setSent(false); setValues({ ...values, [event.target.name]: event.target.value }) }
  const submit = (event) => {
    event.preventDefault()
    setSent(false)
    const result = contactSchema.safeParse(values)
    if (!result.success) return setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])))
    setErrors({}); setSent(true); setValues(initial)
  }
  return <>
    <PageHero eyebrow="Contact" title="Get in touch"><p>Replace these editable placeholders with official contact details before publishing.</p></PageHero>
    <section className="contact-details"><h2>Contact details</h2><p>Email: <a href="mailto:you@example.com">you@example.com</a></p><p>Phone: <a href="tel:+0000000000">+00 000 000 000</a></p><p>Social: <a href="https://example.com" target="_blank" rel="noreferrer">Profile (external link)</a></p></section>
    <LocalFormNotice />
    <form className="support-form" aria-label="Contact form" onSubmit={submit}>
      <Field label="Name" name="name" value={values.name} error={errors.name} onChange={change} />
      <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={change} />
      <Field label="Message" name="message" as="textarea" value={values.message} error={errors.message} onChange={change} />
      <button className="primary-button" type="submit">Send message</button>
      {sent && <p className="success-message">Thanks. This demonstration was not transmitted or saved.</p>}
    </form>
  </>
}
