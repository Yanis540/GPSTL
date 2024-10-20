package com.gpstl.backend.models.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.referential.Referential;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    private Referential grade;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name= "ass_user_skill",
            joinColumns=@JoinColumn(name= "user_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Referential> skills;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "student_ignored_offers",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "offer_id")
    )
    private List<Offer> ignoredOffers;

    @Column(name = "monthly_current_candidacy")
    private Integer monthlyCurrentCandidacy; // ????

    @JsonIgnoreProperties("student")
    @OneToMany(mappedBy = "student")
    private List<Candidacy> candidacies;
}
