package dev.made.cinema.controller;

import dev.made.cinema.services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class SeatController {
    //Instance of SeatService
    @Autowired
    private SeatService seatService;
    //Method for handling GET requests for "/{screeningId}/seats", fetches seating plan and recommended seats
    @GetMapping("/{screeningId}/seats")
    public ResponseEntity<Map<String, Object>> getSeatsAndRecommendations(@PathVariable Long screeningId, @RequestParam(required = false) Integer ticketQuantity) {
        boolean[][] layout = seatService.generateSeatLayout(screeningId); //Call for the seatservice seat generation method. Takes screeningID as a parameter
        List<Integer[]> bestSeats = null;

        if (ticketQuantity != null && ticketQuantity > 0) {
            bestSeats = seatService.findBestSeats(layout, ticketQuantity);//Call for the seatservice method that finds the recommended seats based on the ticket quantity and the theater layout
        }

        Map<String, Object> response = new HashMap<>();
        response.put("layout", layout);
        response.put("bestSeats", bestSeats);//Constructing the response

        return ResponseEntity.ok(response);
    }
}
