package com.gpstl.backend.models;

import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.user.Recruiter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String siret;

    @OneToMany(mappedBy = "company")
    private List<Recruiter> recruiters;

}
