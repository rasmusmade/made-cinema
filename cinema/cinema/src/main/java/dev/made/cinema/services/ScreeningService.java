package dev.made.cinema.services;

import dev.made.cinema.entity.Movie;
import dev.made.cinema.repository.ScreeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.made.cinema.entity.Screening;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ScreeningService {
    @Autowired
    private ScreeningRepository screeningRepository;

    public List<Screening> getScreeningByDate(LocalDate date) {
        return screeningRepository.findByStartDate(date);
    }
    public Optional<Screening> getScreeningById(Long id) {return screeningRepository.findById(id); }

    public List<Screening> allScreenings() {
        return screeningRepository.findAll();
    }

    public List<Screening> getScreeningByMovieId(Long id) {
        return screeningRepository.findByMovieId(id);
    }

}
