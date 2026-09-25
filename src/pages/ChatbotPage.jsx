import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { replyTo } from '../lib/chatbot.js'

const suggestions = ['What is a need?', 'How much should I save?', 'How do I avoid overspending?']
const studentTips = {
  'How do I avoid overspending?': 'Student tip: set a weekly spending limit, record each purchase, and wait before an unplanned buy.',
}

export default function ChatbotPage() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const ask = (text) => {
    if (loading) return
    const clean = text.trim()
    if (!clean) return
    const response = studentTips[clean] ?? replyTo(clean).answer
    setFeedback('')
    setMessages((items) => [...items, { role: 'user', text: clean }])
    setLoading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setMessages((items) => [...items, { role: 'assistant', text: response }])
      setLoading(false)
    }, 100)
    setQuestion('')
  }

  return <>
    <PageHero eyebrow="Local learning helper" title="Budget chatbot"><p>This chatbot is rule-based and runs locally. It supports budgeting, saving, needs and wants, and basic debt topics.</p></PageHero>
    <section className="chatbot-panel">
      <div className="suggestions" aria-label="Suggested questions">{suggestions.map((item) => <button className="secondary-button" type="button" key={item} disabled={loading} onClick={() => ask(item)}>{item}</button>)}</div>
      <div className="conversation" aria-live="polite" aria-label="Conversation">{messages.length ? messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}><strong>{message.role === 'user' ? 'You' : 'BudgetBasics'}:</strong> {message.text}</p>) : <p>Choose a suggestion or ask a supported money question.</p>}{loading && <p role="status">Thinking…</p>}</div>
      {messages.at(-1)?.role === 'assistant' && <div className="suggestions" aria-label="Rate this response"><span>Was this response helpful?</span><button type="button" onClick={() => setFeedback('Thanks for your feedback.')}>Helpful</button><button type="button" onClick={() => setFeedback('Thanks for your feedback.')}>Not helpful</button></div>}
      {feedback && <p role="status">{feedback}</p>}
      <form className="chat-form" onSubmit={(event) => { event.preventDefault(); ask(question) }}><label className="field">Ask a money question<input disabled={loading} value={question} onChange={(event) => setQuestion(event.target.value)} /></label><button className="primary-button" type="submit" disabled={loading}>Ask</button></form>
      <p className="disclaimer">This chatbot is for educational purposes only and does not provide professional financial advice.</p>
    </section>
  </>
}
