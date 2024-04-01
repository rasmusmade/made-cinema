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
    //Instance of MovieService
    @Autowired
    private MovieService movieService;
    //Method for handling GET requests for "/movies"
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }
    //Method for handling GET requests for "/{id}", takes movie id as a parameter and fetches the movie by it.
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movie>> getMovieById(@PathVariable Long id) {
        return new ResponseEntity<Optional<Movie>>(movieService.getMovieById(id), HttpStatus.OK);
    }
    //Method for handling GET requests for "/topmovies", fetches twelve movies
    @GetMapping("/topmovies")
    public ResponseEntity<List<Movie>> getTopTwelveMovies() {
        return new ResponseEntity<List<Movie>>(movieService.topTwelveMovies(), HttpStatus.OK);
    }


}
