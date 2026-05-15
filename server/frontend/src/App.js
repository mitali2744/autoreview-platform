import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { ThemeProvider } from './context/ThemeContext';
import Home       from './components/Home/Home';
import About      from './components/About/About';
import Contact    from './components/Contact/Contact';
import Dealers    from './components/Dealers/Dealers';
import Dealer     from './components/Dealers/Dealer';
import PostReview from './components/Dealers/PostReview';
import Login      from './components/Login/Login';
import Register   from './components/Register/Register';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/dealers"        element={<Dealers />} />
        <Route path="/dealer/:id"     element={<Dealer />} />
        <Route path="/postreview/:id" element={<PostReview />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
