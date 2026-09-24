import { describe, expect, it } from 'vitest'
import { searchContent } from './search.js'
import { resources } from '../data/content.js'

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
    expect(searchContent(entries, 'save', 'saving', 'title').map(({ title }) => title)).toEqual([
      'Automatic saving',
      'Emergency fund',
    ])
  })

  it('treats all as no topic filter', () => {
    expect(searchContent(entries, '', 'all', 'title').map(({ title }) => title)).toEqual([
      'Automatic saving',
      'Emergency fund',
      'Zero-based budget',
    ])
  })

  it('searches resource descriptions', () => {
    expect(searchContent(resources, 'part-time').map(({ id }) => id)).toEqual(['student-budget'])
  })

  it('provides distinct routed learning resources', () => {
    expect(new Set(resources.map(({ id }) => id)).size).toBe(resources.length)
    expect(resources.every(({ path, description }) => path.startsWith('/') && description.length > 20)).toBe(true)
    expect(resources.some(({ title }) => title === 'Plan a student budget')).toBe(true)
  })
})
