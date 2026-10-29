import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth'
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { auth, db, functions } from './firebase'

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function BlogCard({ blog, index }) {
  return (
    <article className="blog-card" data-testid="blog-card">
      {blog.imageUrl ? (
        <img className="blog-art blog-image" src={blog.imageUrl} alt="" />
      ) : (
        <div className={`blog-art ${['coral', 'blue', 'gold', 'lilac', 'mint'][index % 5]}`} aria-hidden="true">
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}
      <div className="blog-card-content">
        <p className="category">{blog.category || 'Journal'}</p>
        <h2>{blog.title}</h2>
        <p className="excerpt">{blog.excerpt || blog.content?.slice(0, 120)}</p>
        <div className="card-meta">
          <span>{blog.author?.name || 'BlogX author'}</span>
          <span>{blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
        </div>
      </div>
    </article>
  )
}

function AccountActions({ user, onSignIn, onSignOut, signingIn }) {
  if (!user) {
    return <button className="signup-button" type="button" onClick={onSignIn} disabled={signingIn}>{signingIn ? 'Opening Google…' : 'Sign in / Sign up with Google'}</button>
  }

  return (
    <div className="account-actions">
      {user.photoURL && <img className="user-avatar" src={user.photoURL} alt="" />}
      <span className="user-name">{user.displayName || user.email}</span>
      <button className="signup-button" type="button" onClick={onSignOut}>Sign out</button>
    </div>
  )
}

function Header({ user, onSignIn, onSignOut, signingIn }) {
  return (
    <header className="site-header">
      <a className="logo" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} aria-label="BlogX home">Blog<span>X</span></a>
      <nav aria-label="Main navigation">
        <a className="nav-link" href="#latest">Latest stories</a>
        {user && <a className="nav-link" href="/write" onClick={(event) => { event.preventDefault(); navigate('/write') }}>Write</a>}
        <AccountActions user={user} onSignIn={onSignIn} onSignOut={onSignOut} signingIn={signingIn} />
      </nav>
    </header>
  )
}

function Editor({ user, onSaved }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('Ideas')
  const [content, setContent] = useState('# Your story\n\nStart writing in **Markdown**...')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function saveBlog(event) {
    event.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Add a title and some Markdown content before saving.')
      return
    }

    setSaving(true)
    setError('')
    setMessage('')
    try {
      await addDoc(collection(db, 'blogs'), {
        title: title.trim(),
        excerpt: excerpt.trim(),
        category: category.trim() || 'Ideas',
        content,
        author: { uid: user.uid, name: user.displayName || user.email, photoURL: user.photoURL || '' },
        createdAt: serverTimestamp(),
        published: true,
      })
      setMessage('Blog published successfully.')
      setTitle('')
      setExcerpt('')
      setContent('')
      onSaved()
    } catch (saveError) {
      setError('Could not publish the blog. Check Firebase permissions and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="editor-page">
      <div className="editor-heading">
        <div><p className="eyebrow">Your journal</p><h1>Write a story.</h1></div>
        <button className="text-button" type="button" onClick={() => navigate('/')}>Back home</button>
      </div>
      <form className="editor-form" onSubmit={saveBlog}>
        <div className="editor-fields">
          <input aria-label="Blog title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
          <input aria-label="Blog excerpt" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="Short excerpt" />
          <input aria-label="Blog category" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
        </div>
        <div className="editor-grid">
          <label className="editor-panel"><span>Markdown</span><textarea aria-label="Markdown editor" value={content} onChange={(event) => setContent(event.target.value)} /></label>
          <div className="editor-panel preview-panel"><span>Preview</span><div className="markdown-preview"><ReactMarkdown>{content || '*Your preview will appear here*'}</ReactMarkdown></div></div>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {message && <p className="form-success" role="status">{message}</p>}
        <button className="publish-button" type="submit" disabled={saving}>{saving ? 'Publishing…' : 'Publish blog'}</button>
      </form>
    </main>
  )
}

function Home({ blogs, loading, error }) {
  return (
    <main>
      <section className="hero" aria-labelledby="page-title"><p className="eyebrow">A place for good ideas</p><h1 id="page-title">Stories that stay<br /><em>with you.</em></h1><p className="hero-copy">Thoughtful writing on creativity, culture, and the little things that make life interesting.</p></section>
      <section className="latest-section" id="latest" aria-labelledby="latest-title">
        <div className="section-heading"><div><p className="eyebrow">Fresh from the journal</p><h2 id="latest-title">Latest stories</h2></div><span className="story-count">{blogs.length} stories</span></div>
        {loading && <p className="empty-state">Loading stories…</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {!loading && !error && blogs.length === 0 && <p className="empty-state">No stories yet. Sign in and write the first one.</p>}
        <div className="blog-grid">{blogs.map((blog, index) => <BlogCard key={blog.id} blog={blog} index={index} />)}</div>
      </section>
    </main>
  )
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [asking, setAsking] = useState(false)
  const [messages, setMessages] = useState([])

  async function askQuestion(event) {
    event.preventDefault()
    const text = question.trim()
    if (!text || asking) return

    setMessages((current) => [...current, { role: 'user', text }])
    setQuestion('')
    setAsking(true)
    try {
      const askBlogBot = httpsCallable(functions, 'askBlogBot')
      const result = await askBlogBot({ question: text })
      const { answer, sources = [] } = result.data
      setMessages((current) => [...current, { role: 'assistant', text: answer, sources }])
    } catch (error) {
      const text = error.code === 'functions/internal'
        ? 'The BlogX chatbot service is not deployed yet.'
        : error.message || 'The chatbot is unavailable right now.'
      setMessages((current) => [...current, { role: 'assistant', text }])
    } finally {
      setAsking(false)
    }
  }

  return (
    <div className="chatbot">
      {open && <section className="chat-panel" aria-label="BlogX chatbot">
        <div className="chat-header"><div><strong>Ask BlogX</strong><span>Answers from our blogs only</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">×</button></div>
        <div className="chat-messages" aria-live="polite">
          {messages.length === 0 && <p className="chat-intro">Ask me anything about the stories on BlogX.</p>}
          {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><p>{message.text}</p>{message.sources?.length > 0 && <small>Sources: {message.sources.join(', ')}</small>}</div>)}
          {asking && <div className="chat-message assistant"><p>Searching the BlogX stories…</p></div>}
        </div>
        <form className="chat-form" onSubmit={askQuestion}><input aria-label="Chat question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about a blog…" /><button type="submit" disabled={asking}>Send</button></form>
      </section>}
      <button className="chat-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-label="Open BlogX chatbot">{open ? '×' : 'Ask BlogX'}</button>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [blogsError, setBlogsError] = useState('')

  useEffect(() => onAuthStateChanged(auth, setUser), [])
  useEffect(() => { getRedirectResult(auth).catch(() => setAuthError('Google sign-in could not be completed. Please try again.')) }, [])
  useEffect(() => { const handlePopState = () => setPath(window.location.pathname); window.addEventListener('popstate', handlePopState); return () => window.removeEventListener('popstate', handlePopState) }, [])
  useEffect(() => {
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(10))
    return onSnapshot(blogsQuery, (snapshot) => { setBlogs(snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))); setLoadingBlogs(false) }, () => { setBlogsError('Stories could not be loaded from Firestore.'); setLoadingBlogs(false) })
  }, [])

  async function handleGoogleSignIn() { setAuthError(''); setSigningIn(true); await signInWithRedirect(auth, new GoogleAuthProvider()) }
  async function handleSignOut() { await signOut(auth); navigate('/') }

  return <div className="page-shell"><Header user={user} onSignIn={handleGoogleSignIn} onSignOut={handleSignOut} signingIn={signingIn} />{authError && <p className="auth-error" role="alert">{authError}</p>}{path === '/write' && user ? <Editor user={user} onSaved={() => navigate('/')} /> : <Home blogs={blogs} loading={loadingBlogs} error={blogsError} />}<footer className="site-footer"><p>Make room for a good story.</p></footer><Chatbot /></div>
}

export default App
