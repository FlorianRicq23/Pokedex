import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GlobalStyle from './utils/style/GlobalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import Erreur from './pages/Erreur'
import Pokemons from './pages/Pokemons'
import Pokemon from './pages/Pokemon'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles.css';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>

  <React.StrictMode>
    <Router>
    <ChakraProvider>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/" element={<Pokemons />} />
        <Route exact path="/pokemons" element={<Pokemons />} />
        <Route
          path="/pokemon/:id"
          element={<Pokemon />}
          render={(props) => <Pokemon {...props} />}
        />
        <Route exact path="*" element={<Erreur />} />
      </Routes>
      <Footer />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
  </QueryClientProvider>,

)
