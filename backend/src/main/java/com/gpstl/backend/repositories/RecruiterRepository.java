package com.gpstl.backend.repositories;

import com.gpstl.backend.models.user.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
}
