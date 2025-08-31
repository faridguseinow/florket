import React from 'react';

//Import Pages
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import FlowersCollection from '@/pages/Products/Flowers/Collection';
import SingleProduct from '@/pages/SingleProduct';
import Footer from '@/layout/Footer';

//IMPORT
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const AnimatedRoutes = () => {
   const location = useLocation();

   return (
      <AnimatePresence mode="wait">
         <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />

            {/* PRODUCTS PAGES */}
            <Route path='/products/flowers/' element={<Products />} />
            <Route path='/products/flowers/:collection' element={<FlowersCollection />} />

            {/* SINGLE PRODUCT PAGE */}
            <Route path='/product' element={<SingleProduct />} />

            <Route
               path="*"
               element={<Navigate to="/" replace />}
            />
         </Routes>

         <Footer />
      </AnimatePresence>
   )
}

export default AnimatedRoutes