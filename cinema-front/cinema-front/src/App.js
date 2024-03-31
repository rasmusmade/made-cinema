import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TopMovies from './components/topMovies/TopMovies';
import Header from "./components/header/Header";
import Screenings from "./components/screenings/Screenings";
import Ticket from "./components/ticket/Ticket";
import ScreeningsByMovie from "./components/screenings/ScreeningsByMovie";
import SeatSelector from "./components/seatSelector/SeatSelector";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<TopMovies />} />
                    <Route path="/screenings" element={<Screenings/> } />
                    <Route path="/ticket" element={<Ticket/>}/>
                    <Route path="/screenings/:movieId" element={<ScreeningsByMovie />} />
                    <Route path="/ticket/seatSelector" element={<SeatSelector/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;