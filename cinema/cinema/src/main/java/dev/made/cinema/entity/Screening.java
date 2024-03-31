package dev.made.cinema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "screening")
public class Screening {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="movie_id")
    private Long movieId;
    private Long theater_id;
    private Time start_time;
    @Column(name = "start_date")
    private LocalDate startDate; //Named like that so that jparepository would understand the function name
}
