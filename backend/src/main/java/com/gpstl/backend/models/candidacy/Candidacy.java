package com.gpstl.backend.models.candidacy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.user.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Candidacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CandidacyStatus status;

    @Column(name = "date_of_candidacy", nullable = false)
    private Date dateOfCandidacy;

    @Column(name = "date_of_response")
    private Date dateOfResponse;

    @JsonIgnoreProperties("candidacies")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @JsonIgnoreProperties("candidacies")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id")
    private Offer offer;
}
