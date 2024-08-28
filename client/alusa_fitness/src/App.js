import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Programs from './components/Programs'
import Blog from './components/Blog'
import Footer from './components/Footer'


const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workouts" element={<WorkoutVideos />} />
      <Route path="/program/workouts" element={<Programs />} />
      <Route path="/program/meals" element={<Programs />} />
      <Route path="/articles" element={<Articles />} /> 
      <Route path="/blog" element={<Blog />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
