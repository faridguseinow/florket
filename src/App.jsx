import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "@/layout/Navbar"
import Footer from "@/layout/Footer"
import MobileBottomNav from "@/components/MobileBottomNav"
import AppDataBootstrap from "@/components/AppDataBootstrap"

import Home from "@/pages/Home"
import Product from "@/pages/Product"
import Favorites from "@/pages/Favorites"
import Cart from "@/pages/Cart"
import Contacts from "@/pages/Contacts"
import Delivery from "@/pages/Delivery"
import Search from "@/pages/Search"
import Privacy from "@/pages/Privacy"
import Terms from "@/pages/Terms"
import Cookies from "@/pages/Cookies"



function App() {

  return (
    <Router>

      <AppDataBootstrap />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<Product />}
        />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/search" element={<Search />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

      </Routes>

      <Footer />

      <MobileBottomNav />

    </Router>
  )
}

export default App
