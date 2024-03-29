import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopMovies from './components/topMovies/TopMovies'; // Adjust the import path as necessary

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element={<TopMovies />} />
            {/* Future routes can be added here */}
          </Routes>
      </div>
  );
}

export default App;