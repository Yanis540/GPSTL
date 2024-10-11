package com.gpstl.backend.services;

import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.repositories.OfferRepository;
import com.gpstl.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;

    public Offer createOffer(Offer offer) {
        Offer offerToCreate = new Offer();
        offerToCreate.setName(offer.getName());
        offerToCreate.setDescription(offer.getDescription());
        offerToCreate.setSalary(offer.getSalary());
        offerToCreate.setPublicationDate(new Date());
        offerToCreate.setRhythm(offer.getRhythm());
        offerToCreate.setRecruiter((Recruiter) userRepository.findById(offer.getRecruiter().getId()).orElseThrow());
        return offerRepository.save(offerToCreate);
    }

    public Optional<Offer> getOfferById(Long id) {
        return Optional.empty();
    }

    public List<Offer> getAllOffers() {
        return List.of();
    }

    public Offer updateOffer(Long id, Offer offerDetails) {
        return offerDetails;
    }

    public void deleteOffer(Long id) {
    }
}
