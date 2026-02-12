import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { CartProvider } from './context/CartContext';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomerAuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
            <Navbar />
            <CartSidebar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/envios" element={<ShippingPolicy />} />
                <Route path="/terminos" element={<Terms />} />
                <Route path="/privacidad" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </CustomerAuthProvider>
    </Router>
  );
}

export default App;
