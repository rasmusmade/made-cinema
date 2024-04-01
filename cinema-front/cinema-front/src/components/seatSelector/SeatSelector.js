import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../api/axiosConfig";
import './SeatSelector.css';
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

//A SeatSelector component, inspiration taken from https://github.com/somanath-goudar/20-Web-Projects-Using-Vanilla-JavaScript/tree/master/2-movie-seat-booking, ChatGPT used to make into react component, modfied be me
const SeatSelector = () => {
    //States
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [seatLayout, setSeatLayout] = useState([]);
    //Hooks
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { ticketQuantity, screening } = location.state || {};

        const fetchSeatLayoutAndBestSeats = async () => {
            if (!screening?.id) {
                console.error("Screening ID not found in location.state");
                return;
            }
            try {
                // Include ticketQuantity as a query parameter if available
                const response = await api.get(`/${screening.id}/seats`, {
                    params: { ticketQuantity }
                });
                // Assuming the response structure based on the backend changes
                const { layout, bestSeats } = response.data;
                setSeatLayout(layout);
                // Convert bestSeats indexes to the format used in state, only if bestSeats is not null
                if(bestSeats) {
                    setSelectedSeats(new Set(bestSeats.map(seat => `${seat[0]}-${seat[1]}`)));
                }
            } catch (error) {
                console.error("Error fetching seat layout and best seats:", error);
            }
        };

        fetchSeatLayoutAndBestSeats();
    }, [location]); // Depend on location to re-fetch if it changes

    const handleSeatClick = (row, index) => { //Function to handle seat clicking
        const seatIndex = `${row}-${index}`;
        const newSelectedSeats = new Set(selectedSeats);

        if (newSelectedSeats.has(seatIndex)) { //If the seat that is being clicked on is already selected, it gets deselected
            newSelectedSeats.delete(seatIndex);
        } else if (newSelectedSeats.size < location.state.ticketQuantity) { //If the seat is not already selected and we haven't reached the ticketquantity limit, we select the seat
            newSelectedSeats.add(seatIndex);
        }

        setSelectedSeats(newSelectedSeats);
    };
    const handleBuyTicketClick = async () => {//Handles what happens when the client clicks on buytickets button
        //Here would be the logic to save the purchase and the corresponding tickets to the database
        try {
            navigate('/ticketpurchased');
        } catch (error) {
            console.error("Error creating purchase:", error);
        }
    };

    return (
        <div className="seat-selector-wrapper">
            <div className="container">
                <div className="screen">Screen</div>
                {seatLayout.length > 0 && seatLayout.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((isOccupied, seatIndex) => (
                            <div //Every seat is a separate div
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
            <Button variant="primary" className="buy-button" onClick={() => handleBuyTicketClick()}>Buy Tickets</Button>
        </div>
    );
};

export default SeatSelector;