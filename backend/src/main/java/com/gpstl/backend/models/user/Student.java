package com.gpstl.backend.models.user;

import com.gpstl.backend.models.candidacy.Candidacy;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Student extends User {
    @Column(name = "school_name")
    private String schoolName;

    private String field;

    @Column(name = "monthly_current_candidacy")
    private Integer monthlyCurrentCandidacy;

    @OneToMany(mappedBy = "user")
    private List<Candidacy> candidacies;
}
