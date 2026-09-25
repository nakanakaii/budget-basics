import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { resources } from '../data/content.js'
import { searchContent } from '../lib/search.js'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('all')
  const results = searchContent(resources, query, topic, 'title')
  const reset = () => { setQuery(''); setTopic('all') }

  return <>
    <PageHero eyebrow="Discover" title="Search resources"><p>Find a BudgetBasics lesson by keyword or topic.</p></PageHero>
    <section>
      <div className="search-controls">
        <label className="field">Search resources<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="field">Topic<select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="all">All topics</option><option value="budget">Budget</option><option value="needs-wants">Needs and wants</option><option value="saving">Saving</option><option value="money-mistakes">Money mistakes</option></select></label>
        <button className="secondary-button" type="button" onClick={reset}>Reset search</button>
      </div>
      {results.length ? <div className="resource-list">{results.map((resource) => <article key={resource.id}><h2><Link to={resource.path}>{resource.title}</Link></h2><p>{resource.description}</p></article>)}</div> : <div className="empty-state"><h2>No resources match your search</h2><p>Try another keyword or reset the filters.</p><button type="button" onClick={reset}>Clear filters</button></div>}
    </section>
  </>
}
