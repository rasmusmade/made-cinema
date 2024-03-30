import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TopMovies from './components/topMovies/TopMovies';
import Header from "./components/header/Header";
import Screenings from "./components/screenings/Screenings";
import Ticket from "./components/ticket/Ticket";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<TopMovies />} />
                    <Route path="/screenings" element={<Screenings/> } />
                    <Route path="/ticket" element={<Ticket/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;