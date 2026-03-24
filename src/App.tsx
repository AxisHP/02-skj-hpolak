import Header from './components/MainComponents/Header'
import Footer from './components/MainComponents/Footer'
import PageRouter from './components/MainComponents/PageRouter'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <PageRouter />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
