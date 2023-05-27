import { Provider } from 'react-redux'
import { store } from './redux/store'
import Header from './components/header/Header'
import './settings/settings.scss'
import Shops from './components/shops/Shops'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Basket from './components/basket/Basket'
import History from './components/history/History'
import Coupons from './components/coupons/Coupons'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Shops />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/history" element={<History />} />
            <Route path="/coupons" element={<Coupons />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
