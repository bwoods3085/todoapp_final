import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Categories from './components/Categories/Categories'
import ToDos from './components/ToDos/ToDos'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Auth/Login'
import AuthProvider from './contexts/AuthContext';


function App() {

  const [filter, setFilter] = useState(0);

  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Categories setFilter={setFilter} /></ProtectedRoute>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Categories' element={<ProtectedRoute><Categories setFilter={setFilter} /></ProtectedRoute>} />
          <Route path='/ToDos' element={<ProtectedRoute><ToDos filter={filter} setFilter={setFilter} /></ProtectedRoute>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>  
        <Footer />      
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
