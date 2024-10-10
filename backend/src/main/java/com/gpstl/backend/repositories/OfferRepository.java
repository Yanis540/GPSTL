package com.gpstl.backend.repositories;

import com.gpstl.backend.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
