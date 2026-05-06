import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import policyUrl from '../assets/privacy-policy.md?url'

export default function Privacy() {
  const [md, setMd] = useState('')
  useEffect(() => {
    fetch(policyUrl).then(r => r.text()).then(setMd)
  }, [])
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <ReactMarkdown>{md}</ReactMarkdown>
    </main>
  )
}
