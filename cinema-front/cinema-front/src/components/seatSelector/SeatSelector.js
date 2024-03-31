import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../api/axiosConfig";
import './SeatSelector.css';

const SeatSelector = () => {
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [seatLayout, setSeatLayout] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const { ticketQuantity } = location.state || {};

        const fetchSeatLayout = async () => {
            const screeningId = location.state?.screening?.id;
            if (!screeningId) {
                console.error("Screening ID not found in location.state");
                return;
            }

            try {
                const response = await api.get(`/${screeningId}/seats`);
                setSeatLayout(response.data);
                randomlySelectSeats(response.data, ticketQuantity);
            } catch (error) {
                console.error("Error fetching seat layout:", error);
            }
        };

        fetchSeatLayout();
    }, [location]);

    const randomlySelectSeats = (layout, quantity) => {
        let availableSeats = [];
        layout.forEach((row, rowIndex) => {
            row.forEach((isOccupied, seatIndex) => {
                if (!isOccupied) {
                    availableSeats.push(`${rowIndex}-${seatIndex}`);
                }
            });
        });


        availableSeats = shuffleArray(availableSeats).slice(0, quantity);
        setSelectedSeats(new Set(availableSeats));
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap
        }
        return array;
    };

    const handleSeatClick = (row, index) => {
        const seatIndex = `${row}-${index}`;
        const newSelectedSeats = new Set(selectedSeats);

        if (newSelectedSeats.has(seatIndex)) {
            newSelectedSeats.delete(seatIndex);
        } else if (newSelectedSeats.size < location.state.ticketQuantity) {
            newSelectedSeats.add(seatIndex);
        }

        setSelectedSeats(newSelectedSeats);

    };

    return (
        <div className="seat-selector-wrapper">
            <div className="container">
                <div className="screen">Screen</div>
                {seatLayout.length > 0 && seatLayout.map((row, rowIndex) => (
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
                You have selected <span>{selectedSeats.size}</span> seats for a price of $<span>{selectedSeats.size * location.state.ticketPrice}</span>
            </p>
        </div>
    );
};

export default SeatSelector;