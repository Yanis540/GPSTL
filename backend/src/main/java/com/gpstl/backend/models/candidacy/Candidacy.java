package com.gpstl.backend.models.candidacy;

import com.gpstl.backend.models.Company;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Candidacy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private CandidacyStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id")
    private Offer offer;
}
