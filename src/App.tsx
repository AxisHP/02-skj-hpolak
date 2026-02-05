import { useState } from 'react'
import { NavigationProvider } from './contexts/NavigationContext'
import Header from './components/MainComponents/Header'
import Footer from './components/MainComponents/Footer'
import PageRouter from './components/MainComponents/PageRouter'

function App() {
  const [currentPage, setCurrentPage] = useState('/')

  return (
    <NavigationProvider currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1 bg-light">
          <div className="container py-4">
            <PageRouter currentPage={currentPage} />
          </div>
        </main>

        <Footer />
      </div>
    </NavigationProvider>
  )
}

export default App
