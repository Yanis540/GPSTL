package com.gpstl.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String siret;

    @OneToMany(mappedBy = "company")
    @JsonIgnoreProperties("company")
    private List<Recruiter> recruiters;

}
