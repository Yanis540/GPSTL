package com.gpstl.backend.repositories;

import com.gpstl.backend.models.candidacy.Candidacy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidacyRepository extends JpaRepository<Candidacy, Long> {
}
