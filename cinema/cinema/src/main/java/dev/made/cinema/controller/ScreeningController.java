package dev.made.cinema.controller;

//import org.bson.types.ObjectId;
import dev.made.cinema.entity.Movie;
import dev.made.cinema.entity.Screening;
import dev.made.cinema.services.MovieService;
import dev.made.cinema.services.ScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping()
@CrossOrigin(origins="*")
public class ScreeningController {
    @Autowired
    private ScreeningService screeningService;
    @GetMapping("/screenings")
    public ResponseEntity<List<Screening>> getScreeningByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Screening> screenings = screeningService.getScreeningByDate(date);
        return ResponseEntity.ok(screenings);
    }

    @GetMapping("/screening")
    public ResponseEntity<List<Screening>> getAllScreenings() {
        return new ResponseEntity<List<Screening>>(screeningService.allScreenings(), HttpStatus.OK);
    }
    @GetMapping("/screenings/{id}")
    public ResponseEntity<List<Screening>> getScreeningByMovieId(@PathVariable Long id)  {
        List<Screening> screenings = screeningService.getScreeningByMovieId(id);
        return ResponseEntity.ok(screenings);
    }

}