import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LocalClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return <p className="clock"><Clock3 aria-hidden="true" /> Local time: <time>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time></p>
}
