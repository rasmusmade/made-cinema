package dev.made.cinema.services;
import dev.made.cinema.entity.Theater;
import dev.made.cinema.entity.Screening;
import dev.made.cinema.repository.ScreeningRepository;
import dev.made.cinema.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
@Service
public class SeatService {
    @Autowired
    private ScreeningRepository screeningRepository;
    @Autowired
    private TheaterRepository theaterRepository;
    /**
     * Generates and returns a matrix of boolean values, where True indicates a reserved seat
     * and False indicates a free seat that can be reserved by user.
     *
     * @param  screeningId  Screening id, for accessing the screening's theater
     * @return              The generated Seat Layout as a matrix of boolean values
     */
    public boolean[][] generateSeatLayout(Long screeningId) {
        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found"));


        Theater theater = theaterRepository.findById(screening.getTheater_id())
                .orElseThrow(() -> new RuntimeException("Theater not found"));

        int totalSeats = theater.getTotal_seats();
        int size = (int) Math.sqrt(totalSeats);
        boolean[][] layout = new boolean[size][size]; //Generating the layout matrix

        Random rand = new Random();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                layout[i][j] = rand.nextFloat() < 0.4; //Randomly generate a float between 0 and 1 and check if it is less than 0.4 If it is, then the seat is occupied. Right now the probability of seat being occupied is about 40%, that is sufficient for demo purposes.
            }
        }

        return layout;
    }
    /**
     * Finds the best seats for the user, based on the generated layout and the quantity of tickets.
     *
     * @param  layout The matrix for the seating layout, True indicating a reserved seat
     * @param  tickets The number of tickets the user wants to reserve
     * @return              A list of Integer lists, where each list has two elements, the row and column numbers for the seats
     */
    public List<Integer[]> findBestSeats(boolean[][] layout, int tickets) {
        int bestRow = -1;
        int bestStartIndex = -1;
        double bestDistance = Double.MAX_VALUE;

        int midPoint = layout.length / 2; //For simplicity lets assume that all the theaters are square and have odd number of rows and columns

        for (int i = 0; i < layout.length; i++) { //Iterating through each row
            for (int j = 0; j <= layout[i].length - tickets; j++) { //Iterating through possible starting positions in the row
                boolean isAvailable = true; // boolean to track if from the current starting position, all the seats are available

                for (int k = j; k < j + tickets; k++) {
                    if (layout[i][k]) { // If from the current starting position, any of the seats is taken, we discard the starting position,
                        isAvailable = false;
                        break;
                    }
                }
                if (isAvailable) { //If all the seats from the current starting position are available, we can see if it is a candidate to be the best seating position
                    int currentMiddle = j + (tickets - 1) / 2; // Calculates the middle of the current block
                    double currentDistance = Math.abs(currentMiddle - midPoint) + Math.abs(i - midPoint); //Using Manhattan distance to calculate the distance of the block of seats from the middlepoint of the theater


                    if (currentDistance < bestDistance) { //If the distance of the middle seat is better than the current best distance we update the best distance, best row and best startindex
                        bestDistance = currentDistance;
                        bestRow = i;
                        bestStartIndex = j;
                    }
                }
            }
        }
        List<Integer[]> bestSeats = new ArrayList<>();

        if (bestRow != -1) {
            for (int i = 0; i < tickets; i++) {
                bestSeats.add(new Integer[]{bestRow, bestStartIndex + i}); //We add the best seats into the bestSeats arraylist
            }
        }

        return bestSeats; //Returns the list of best seat positions
    }
}
