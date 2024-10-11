package com.gpstl.backend.repositories;

import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CandidacyRepository extends JpaRepository<Candidacy, Long> {
    @Query("SELECT c FROM Candidacy c WHERE c.student.id = :id")
    List<Candidacy> findCandidaciesByStudentId(Long id);
    Optional<Candidacy> findCandidacyByStudentAndOffer(Student student, Offer offer);
}
