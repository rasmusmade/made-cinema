package dev.made.cinema.services;
import dev.made.cinema.entity.Theater;
import dev.made.cinema.entity.Screening;
import dev.made.cinema.repository.ScreeningRepository;
import dev.made.cinema.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class SeatService {
    @Autowired
    private ScreeningRepository screeningRepository;
    @Autowired
    private TheaterRepository theaterRepository;
    public boolean[][] generateSeatLayout(Long screeningId) {
        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found"));


        Theater theater = theaterRepository.findById(screening.getTheater_id())
                .orElseThrow(() -> new RuntimeException("Theater not found"));

        int totalSeats = theater.getTotal_seats();
        int size = (int) Math.sqrt(totalSeats);
        boolean[][] layout = new boolean[size][size];

        Random rand = new Random();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                layout[i][j] = rand.nextFloat() < 0.2;
            }
        }

        return layout;
    }


}
