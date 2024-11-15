package com.gpstl.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.user.Recruiter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double salary;

    @Column(nullable = false)
    private String rhythm;

    @Column(nullable = false)
    private String description;

    @Column(name = "publication_date", nullable = false)
    private Date publicationDate;

    @JsonIgnoreProperties("offers")
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;

    @JsonIgnoreProperties("student")
    @OneToMany(mappedBy = "offer")
    private List<Candidacy> candidacies;
}
