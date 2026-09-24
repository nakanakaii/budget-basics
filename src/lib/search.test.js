import { describe, expect, it } from 'vitest'
import { searchContent } from './search.js'

const entries = [
  { title: 'Zero-based budget', topic: 'budgeting', keywords: ['plan', 'income'] },
  { title: 'Emergency fund', topic: 'saving', keywords: ['save', 'unexpected costs'] },
  { title: 'Automatic saving', topic: 'saving', keywords: ['save', 'monthly'] },
]

describe('searchContent', () => {
  it('matches normalized keywords', () => {
    expect(searchContent(entries, '  UNEXPECTED   costs ')).toEqual([entries[1]])
  })

  it('filters by topic and sorts by title', () => {
    expect(searchContent(entries, 'save', 'saving').map(({ title }) => title)).toEqual([
      'Automatic saving',
      'Emergency fund',
    ])
  })
})
