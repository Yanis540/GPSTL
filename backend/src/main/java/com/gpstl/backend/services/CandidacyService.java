package com.gpstl.backend.services;

import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.models.candidacy.CandidacyStatus;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.repositories.CandidacyRepository;
import com.gpstl.backend.repositories.OfferRepository;
import com.gpstl.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidacyService {

    private final CandidacyRepository candidacyRepository;
    private final UserRepository userRepository;
    private final OfferRepository offerRepository;

    public List<Candidacy> getAllCandidacies() {
        return candidacyRepository.findAll();
    }

    public List<Candidacy> getStudentCandidacies(Long id) {
        return candidacyRepository.findCandidaciesByStudentId(id);
    }

    public Optional<Candidacy> getCandidacyById(Long id) {
        return candidacyRepository.findById(id);
    }

    public Candidacy createCandidacy(Candidacy candidacy) {
        Optional<Candidacy> candidacyExists =
                candidacyRepository
                .findCandidacyByStudentAndOffer(candidacy.getStudent(), candidacy.getOffer());

        if(candidacyExists.isPresent()) { // on check si l'étudiant a déjà candidaté
            return null;
        }

        Candidacy candidacyToCreate = new Candidacy();
        candidacyToCreate.setStudent((Student) userRepository.findById(candidacy.getStudent().getId()).orElseThrow());
        candidacyToCreate.setOffer(offerRepository.findById(candidacy.getOffer().getId()).orElseThrow());
        candidacyToCreate.setDateOfCandidacy(new Date());
        candidacyToCreate.setStatus(CandidacyStatus.PENDING);
        candidacyRepository.save(candidacy);

        return candidacy;
    }

    public Candidacy updateCandidacy(Long id, Candidacy candidacy) {
        return candidacy;
    }

    public Candidacy deleteCandidacy(Long id) {
        Optional<Candidacy> candidacyExists = this.candidacyRepository.findById(id);
        if (candidacyExists.isEmpty()) {
            return null;
        }
        candidacyRepository.deleteById(id);
        return candidacyExists.get();

    }
}
