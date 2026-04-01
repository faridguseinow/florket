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

      </Routes>

      <Footer />

      <MobileBottomNav />

    </Router>
  )
}

export default App
