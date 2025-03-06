import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Categories from './pages/Categories.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<App />}>
     <Route path='/' element={<Products />} />
     <Route path='/product-detail/:id' element={<ProductDetail />} />
    <Route path='/category-list' element={<Categories />} />
    </Route>
   </Routes>
   </BrowserRouter>
  </StrictMode>
)
