package com.gpstl.backend.models.candidacy;

import com.gpstl.backend.models.Company;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.models.user.User;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CandidacyStatus status;

    @Column(name = "date_of_candidacy")
    private Date dateOfCandidacy;

    @Column(name = "date_of_response")
    private Date dateOfResponse;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id")
    private Offer offer;
}
