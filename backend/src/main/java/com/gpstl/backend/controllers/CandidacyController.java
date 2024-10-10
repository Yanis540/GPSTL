package com.gpstl.backend.controllers;

import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.services.CandidacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("candidacy")
@RequiredArgsConstructor
public class CandidacyController {
    
    private final CandidacyService candidacyService;

    @GetMapping
    public ResponseEntity<List<Candidacy>> getAllCandidacies() {
        List<Candidacy> candidacies = candidacyService.getAllCandidacies();
        return ResponseEntity.ok(candidacies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidacy> getCandidacyById(@PathVariable Long id) {
        Candidacy candidacy = candidacyService.getCandidacyById(id);
        return candidacy != null ? ResponseEntity.ok(candidacy) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Candidacy> createCandidacy(@RequestBody Candidacy candidacy) {
        Candidacy createdCandidacy = candidacyService.createCandidacy(candidacy);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCandidacy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidacy> updateCandidacy(@PathVariable Long id, @RequestBody Candidacy candidacy) {
        Candidacy updatedCandidacy = candidacyService.updateCandidacy(id, candidacy);
        return ResponseEntity.ok(updatedCandidacy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidacy(@PathVariable Long id) {
        candidacyService.deleteCandidacy(id);
        return ResponseEntity.noContent().build();
    }

}
