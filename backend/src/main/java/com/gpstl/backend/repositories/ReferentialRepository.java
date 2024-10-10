package com.gpstl.backend.repositories;

import com.gpstl.backend.models.referential.Referential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferentialRepository extends JpaRepository<Referential, Long> {
}
