package dev.made.cinema.controller;

//import org.bson.types.ObjectId;
import dev.made.cinema.entity.Screening;
import dev.made.cinema.services.ScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping()
@CrossOrigin(origins="*")
public class ScreeningController {
    //Instance of ScreeningService
    @Autowired
    private ScreeningService screeningService;
    //Method for handling GET requests for "/screenings", fetches screening by date
    @GetMapping("/screeningsbydate")
    public ResponseEntity<List<Screening>> getScreeningsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Screening> screenings = screeningService.getScreeningsByDate(date);
        return ResponseEntity.ok(screenings);
    }
    //Method for handling GET requests for "/screening/{id}", fetches screening by id
    @GetMapping("/screening/{id}")
    public ResponseEntity<Optional<Screening>> getScreeningById(@PathVariable Long id) {
        return new ResponseEntity<Optional<Screening>>(screeningService.getScreeningById(id), HttpStatus.OK);
    }
    //Method for handling GET requests for "/screenings", fetches all screenings
    @GetMapping("/screenings")
    public ResponseEntity<List<Screening>> getAllScreenings() {
        return new ResponseEntity<List<Screening>>(screeningService.allScreenings(), HttpStatus.OK);
    }
    //Method for handling GET requests for "/screenings/{id}", fetches screenings by movie_id
    @GetMapping("/screenings/{id}")
    public ResponseEntity<List<Screening>> getScreeningByMovieId(@PathVariable Long id)  {
        List<Screening> screenings = screeningService.getScreeningByMovieId(id);
        return ResponseEntity.ok(screenings);
    }

}