import './App.css';
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
//import CatalogPage from './pages/CatalogPage'
import Footer from './components/Footer'
import Header from './components/Header'
//import ProductPage from './pages/ProductPage'

function App() {
  return (
    <div className='app'>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          {/*<Route path='/catalog/:id' element={<ProductPage />} />*/}
        </Routes>
      </main>
      <Footer />
      {/*<Footer />*/}
    </div>
  );
}

export default App;
