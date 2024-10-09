package com.gpstl.backend.models;

import com.gpstl.backend.models.candidacy.Candidacy;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Double salary;

    private String rhythm;

    private String description;

    private Date publicationDate;

    @OneToMany(mappedBy = "offer")
    private List<Candidacy> candidacies;
}