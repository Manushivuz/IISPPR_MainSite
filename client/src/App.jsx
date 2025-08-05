import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import SearchNotFound from './pages/SearchNotFound';
import LoginPage from './pages/LoginPage'; // ✅ Import LoginPage

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/error" element={<Error />} />
            <Route path="/search-not-found" element={<SearchNotFound />} />
            <Route path="/login" element={<LoginPage />} /> {/* ✅ Add this */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
