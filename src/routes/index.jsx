import React from 'react';

//Import Pages
import Home from '@/pages/Home';
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