package com.gpstl.backend.services;

import com.gpstl.backend.exception.UserNotFoundException;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.repositories.CandidacyRepository;
import com.gpstl.backend.repositories.OfferRepository;
import com.gpstl.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final CandidacyRepository candidacyRepository;

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
        List<Offer> offers= offerRepository.findAll();
        return offers;
    }

    public Offer updateOffer(Long id, Offer offerDetails) {
        return offerDetails;
    }

    public void deleteOffer(Long id) {
    }
    public List<Offer> getOffersByRecruiterId(Long recuiterId) {
        List<Offer> offers = offerRepository.findByRecruiterId(recuiterId);
        return offers;
    }

    public List<Offer> getAvailableOffers(Long studentId) {
        Student student = (Student) userRepository.findById(studentId).orElseThrow(() -> new UserNotFoundException("Not found"));
        List<Offer> ignoredOffers = student.getIgnoredOffers();
        List<Candidacy> candidacies = candidacyRepository.findCandidaciesByStudentId(studentId);

        List<Long> candidacyOfferIds = candidacies.stream()
                .map(candidacy -> candidacy.getOffer().getId())
                .toList();

        List<Offer> allOffers = offerRepository.findAll();

        return allOffers.stream()
                .filter(offer -> !ignoredOffers.contains(offer) && !candidacyOfferIds.contains(offer.getId()))
                .toList();
    }
}

