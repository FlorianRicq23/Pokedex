import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GlobalStyle from './utils/style/GlobalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Erreur from './pages/Erreur'
import Pokemons from './pages/Pokemons'
import Pokemon from './pages/Pokemon'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>

  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route exact path="/pokemons" element={<Pokemons />} />
        <Route
          path="/pokemon/:id"
          element={<Pokemon />}
          render={(props) => <Pokemon {...props} />}
        />
        <Route exact path="*" element={<Erreur />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
  </QueryClientProvider>,

)
