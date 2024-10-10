package com.gpstl.backend.models.user;

import com.gpstl.backend.models.Referential;
import com.gpstl.backend.models.candidacy.Candidacy;
import jakarta.persistence.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id")
    private Referential field;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="ass_user_grades",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name = "grade_id")
    )
    private List<Referential> grades;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="ass_user_skills",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Referential> skills;

    @Column(name = "monthly_current_candidacy")
    private Integer monthlyCurrentCandidacy; // ????

    @OneToMany(mappedBy = "user")
    private List<Candidacy> candidacies;
}
