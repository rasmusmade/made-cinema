package dev.made.cinema.controller;

import dev.made.cinema.services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class SeatController {
    @Autowired
    private SeatService seatService;
    @GetMapping("/{screeningId}/seats")
    public ResponseEntity<boolean[][]> getSeatLayout(@PathVariable Long screeningId) {
        boolean[][] seatLayout = seatService.generateSeatLayout(screeningId);
        return ResponseEntity.ok(seatLayout);
    }
}
