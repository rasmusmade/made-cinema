package dev.made.cinema.controller;

//import org.bson.types.ObjectId;
import dev.made.cinema.entity.Movie;
import dev.made.cinema.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }
}