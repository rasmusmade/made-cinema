package dev.made.cinema.services;

import dev.made.cinema.entity.Movie;
import dev.made.cinema.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }
    public Optional<Movie> getMovieById(Long id) {return movieRepository.findById(id); }

    public List<Movie> topTwelveMovies() { //returns twelve movies based on the id-s i have inserted here
        List<Long> topTwelveIds = List.of(1005L, 1085L, 1035L, 1050L, 1111L, 1367L, 1428L, 1504L, 1720L, 1754L, 1768L, 1781L);
        return movieRepository.findAllById(topTwelveIds);
    }
}
