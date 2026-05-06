import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Clear Box</h1>
      <p>A medication tracker for the UK. No account, no email, no name collected.</p>
      <p>
        <Link to="/privacy">Privacy policy</Link>
      </p>
      <footer style={{ marginTop: '4rem', fontSize: '0.875rem', color: '#666' }}>
        By Miles Hillary · hello@clearbox.info
      </footer>
    </main>
  )
}
