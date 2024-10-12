package com.gpstl.backend.repositories;

import com.gpstl.backend.models.referential.Referential;
import com.gpstl.backend.models.referential.ReferentialType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferentialRepository extends JpaRepository<Referential, Long> {
    List<Referential> findReferentialsByType(ReferentialType type);
}
