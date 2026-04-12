import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"

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

const routeTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

function PageTransition({ children }) {
  return (
    <motion.div
      variants={routeTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/contacts" element={<PageTransition><Contacts /></PageTransition>} />
        <Route path="/delivery" element={<PageTransition><Delivery /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><Cookies /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname])

  return null
}

function App() {

  return (
    <Router>

      <AppDataBootstrap />
      <ScrollToTop />

      <Navbar />

      <AppRoutes />

      <Footer />

      <MobileBottomNav />

    </Router>
  )
}

export default App
