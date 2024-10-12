package com.gpstl.backend.models.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gpstl.backend.models.Company;
import com.gpstl.backend.models.Offer;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recruiter extends User {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonIgnoreProperties("recruiters")
    private Company company;

    @OneToMany(mappedBy = "recruiter")
    @JsonIgnoreProperties("recruiter")
    private List<Offer> offers;
}
