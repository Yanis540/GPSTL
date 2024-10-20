package com.gpstl.backend.repositories;

import com.gpstl.backend.models.Offer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByRecruiterId(Long recruiter_id);
}
