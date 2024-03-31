import React, { useState, useEffect } from 'react';
import './SeatSelector.css';

// Configuration for initial seat occupation state
// true represents an occupied seat, false represents an available seat
const seatLayout = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, false, false, false, true, true],
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, false, true, true, true, false],
];

const SeatSelector = () => {
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [ticketPrice, setTicketPrice] = useState(10);

    useEffect(() => {
        const savedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        setSelectedSeats(new Set(savedSeats));
    }, []);

    const handleSeatClick = (row, index) => {
        const seatIndex = `${row}-${index}`;
        const newSelectedSeats = new Set(selectedSeats);

        if (newSelectedSeats.has(seatIndex)) {
            newSelectedSeats.delete(seatIndex);
        } else {
            newSelectedSeats.add(seatIndex);
        }
        setSelectedSeats(newSelectedSeats);
        localStorage.setItem('selectedSeats', JSON.stringify([...newSelectedSeats]));
    };

    return (
        <div className="seat-selector-wrapper">
            <div className="container">
                <div className="screen"></div>
                {seatLayout.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((isOccupied, seatIndex) => (
                            <div
                                key={`${rowIndex}-${seatIndex}`}
                                className={`seat ${isOccupied ? 'occupied' : ''} ${selectedSeats.has(`${rowIndex}-${seatIndex}`) ? 'selected' : ''}`}
                                onClick={() => !isOccupied && handleSeatClick(rowIndex, seatIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <p className="text">
                You have selected <span>{selectedSeats.size}</span> seats for a price of $<span>{selectedSeats.size * ticketPrice}</span>
            </p>
        </div>
    );
};

export default SeatSelector;