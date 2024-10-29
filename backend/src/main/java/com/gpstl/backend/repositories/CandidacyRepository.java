package com.gpstl.backend.repositories;

import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.payloads.response.CandidacyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CandidacyRepository extends JpaRepository<Candidacy, Long> {
    @Query("SELECT c FROM Candidacy c WHERE c.student.id = :id")
    List<Candidacy> findCandidaciesByStudentId(Long id);
    Optional<Candidacy> findCandidacyByStudentAndOffer(Student student, Offer offer);

    @Query("SELECT c FROM Candidacy c WHERE c.offer.id = :offerId")
    List<Candidacy> findCandidaciesByOfferId(Long offerId);

    @Query("SELECT new com.gpstl.backend.payloads.response.CandidacyResponse(c.id, c.dateOfCandidacy, c.dateOfResponse, c.status, " +
            "c.student.firstname, c.student.lastname, c.student.photo) " +
            "FROM Candidacy c " +
            "JOIN c.student s " +
            "WHERE c.offer.id = :offerId")
    List<CandidacyResponse> findCandidaciesByOfferIdWithUserDetails(Long offerId);

}
