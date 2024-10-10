package com.gpstl.backend.services;

import com.gpstl.backend.models.candidacy.Candidacy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidacyService {
    public List<Candidacy> getAllCandidacies() {
        return List.of();
    }

    public Candidacy getCandidacyById(Long id) {
        return null;
    }

    public Candidacy createCandidacy(Candidacy candidacy) {
        return candidacy;
    }

    public Candidacy updateCandidacy(Long id, Candidacy candidacy) {
        return candidacy;
    }

    public void deleteCandidacy(Long id) {
    }
}
