import { useEffect, useState } from 'react'
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth'
import { auth } from './firebase'

const blogs = [
  {
    category: 'Creativity',
    title: 'The quiet power of making things',
    excerpt: 'Why a small daily practice can become the most meaningful part of your day.',
    author: 'Maya Chen',
    date: 'May 18, 2024',
    color: 'coral',
  },
  {
    category: 'Technology',
    title: 'Designing a calmer digital life',
    excerpt: 'A practical guide to building a relationship with technology that feels intentional.',
    author: 'Alex Morgan',
    date: 'May 14, 2024',
    color: 'blue',
  },
  {
    category: 'Travel',
    title: 'A weekend in the slow lane',
    excerpt: 'Trading a packed itinerary for open roads, good coffee, and room to wander.',
    author: 'Noah Williams',
    date: 'May 10, 2024',
    color: 'gold',
  },
  {
    category: 'Culture',
    title: 'What our favorite stories teach us',
    excerpt: 'The books, films, and conversations that quietly shape how we see the world.',
    author: 'Priya Shah',
    date: 'May 06, 2024',
    color: 'lilac',
  },
  {
    category: 'Wellbeing',
    title: 'The art of leaving space',
    excerpt: 'A reminder that rest is not an interruption to a full life — it is part of one.',
    author: 'Sam Rivera',
    date: 'April 29, 2024',
    color: 'mint',
  },
  {
    category: 'Ideas',
    title: 'Small questions, better answers',
    excerpt: 'How curiosity can help us move from certainty toward a more useful kind of clarity.',
    author: 'Lena Ortiz',
    date: 'April 24, 2024',
    color: 'peach',
  },
  {
    category: 'Food',
    title: 'A table set for connection',
    excerpt: 'Recipes are only the beginning. The best meals are really about who gathers around them.',
    author: 'Theo Brooks',
    date: 'April 20, 2024',
    color: 'rose',
  },
  {
    category: 'Work',
    title: 'Rethinking the busy badge',
    excerpt: 'There is more to meaningful progress than how much we can fit into a calendar.',
    author: 'Jordan Lee',
    date: 'April 16, 2024',
    color: 'sky',
  },
  {
    category: 'Nature',
    title: 'Lessons from paying attention',
    excerpt: 'A walk outside can change what we notice, and what we notice can change everything.',
    author: 'Erin Park',
    date: 'April 11, 2024',
    color: 'forest',
  },
  {
    category: 'Community',
    title: 'The places we make together',
    excerpt: 'Every welcoming space starts with a few people choosing to make room for one another.',
    author: 'Owen Davis',
    date: 'April 04, 2024',
    color: 'plum',
  },
]

function BlogCard({ blog, index }) {
  return (
    <article className="blog-card" data-testid="blog-card">
      <div className={`blog-art ${blog.color}`} aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="blog-card-content">
        <p className="category">{blog.category}</p>
        <h2>{blog.title}</h2>
        <p className="excerpt">{blog.excerpt}</p>
        <div className="card-meta">
          <span>{blog.author}</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  useEffect(() => {
    getRedirectResult(auth).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google sign-in could not be completed. Please try again.')
      }
    })
  }, [])

  async function handleGoogleSignIn() {
    setAuthError('')
    setIsSigningIn(true)

    try {
      await signInWithRedirect(auth, new GoogleAuthProvider())
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google sign-in could not be completed. Please try again.')
      }
    } finally {
      setIsSigningIn(false)
    }
  }

  async function handleSignOut() {
    setAuthError('')
    await signOut(auth)
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="logo" href="/" aria-label="BlogX home">Blog<span>X</span></a>
        <nav aria-label="Main navigation">
          <a className="nav-link" href="#latest">Latest stories</a>
          {user ? (
            <div className="account-actions">
              {user.photoURL && <img className="user-avatar" src={user.photoURL} alt="" />}
              <span className="user-name">{user.displayName || user.email}</span>
              <button className="signup-button" type="button" onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="signup-button" type="button" onClick={handleGoogleSignIn} disabled={isSigningIn}>
              {isSigningIn ? 'Opening Google…' : 'Sign in / Sign up with Google'}
            </button>
          )}
        </nav>
      </header>

      {authError && <p className="auth-error" role="alert">{authError}</p>}

      <main>
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">A place for good ideas</p>
          <h1 id="page-title">Stories that stay<br /><em>with you.</em></h1>
          <p className="hero-copy">Thoughtful writing on creativity, culture, and the little things that make life interesting.</p>
        </section>

        <section className="latest-section" id="latest" aria-labelledby="latest-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Fresh from the journal</p>
              <h2 id="latest-title">Latest stories</h2>
            </div>
            <span className="story-count">10 stories</span>
          </div>
          <div className="blog-grid">
            {blogs.map((blog, index) => <BlogCard key={blog.title} blog={blog} index={index} />)}
          </div>
        </section>
      </main>

      <footer id="signup" className="site-footer">
        <p>Make room for a good story.</p>
        <a className="signup-button footer-button" href="mailto:hello@blogx.example">Sign up for updates <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  )
}

export default App
