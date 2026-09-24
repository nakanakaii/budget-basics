import { describe, expect, it } from 'vitest'
import { replyTo } from './chatbot.js'

describe('replyTo', () => {
  it('recognizes saving questions', () => {
    expect(replyTo('How much should I save?').topic).toBe('saving')
  })

  it('safely falls back for unsupported questions', () => {
    expect(replyTo('How do I build a rocket?').topic).toBe('fallback')
  })
})
