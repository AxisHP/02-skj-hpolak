import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home')

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white py-3 shadow">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">My Application</h1>
            <nav>
              <button
                className={`btn ${currentPage === 'home' ? 'btn-light' : 'btn-outline-light'} me-2`}
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
              <button
                className={`btn ${currentPage === 'login' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setCurrentPage('login')}
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 bg-light">
        {currentPage === 'home' ? <Home /> : <Login />}
      </main>

      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 My Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
