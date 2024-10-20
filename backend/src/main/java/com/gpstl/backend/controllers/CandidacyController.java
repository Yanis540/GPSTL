package com.gpstl.backend.controllers;

import com.gpstl.backend.contexts.UserContext;
import com.gpstl.backend.dtos.CandidacyDto;
import com.gpstl.backend.mappers.CandidacyMapper;
import com.gpstl.backend.models.candidacy.Candidacy;
import com.gpstl.backend.services.CandidacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("candidacy")
@RequiredArgsConstructor
public class CandidacyController {
    
    private final CandidacyService candidacyService;

    @GetMapping
    public ResponseEntity<List<CandidacyDto>> getAllCandidacies() {
        List<CandidacyDto> candidacies = candidacyService
                .getAllCandidacies()
                .stream()
                .map(CandidacyMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidacies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidacyDto> getCandidacyById(@PathVariable Long id) {
        Optional<Candidacy> candidacy = candidacyService.getCandidacyById(id);
        return candidacy.map(c -> ResponseEntity.ok(CandidacyMapper.toDto(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/student")
    public ResponseEntity<List<CandidacyDto>> getStudentCandidacies() {
        Long id = UserContext.getUserId();

        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<CandidacyDto> candidacies = candidacyService
                .getStudentCandidacies(id)
                .stream()
                .map(CandidacyMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidacies);
    }

    @PostMapping
    public ResponseEntity<CandidacyDto> createCandidacy(@RequestBody CandidacyDto candidacyToCreate) {
        Long id = UserContext.getUserId();

        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            candidacyToCreate.setStudentId(id);
            Candidacy candidacy = candidacyService.createCandidacy(CandidacyMapper.toEntity(candidacyToCreate));
            return new ResponseEntity<>(CandidacyMapper.toDto(candidacy), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidacyDto> updateCandidacy(@PathVariable("id") Long id, @RequestBody CandidacyDto candidacyToUpdate) {
        try {
            Candidacy candidacy = candidacyService.updateCandidacy(id, CandidacyMapper.toEntity(candidacyToUpdate));
            if (candidacy == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(CandidacyMapper.toDto(candidacy));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidacy(@PathVariable Long id) {
        try {
            Candidacy candidacy = candidacyService.deleteCandidacy(id);
            if (candidacy == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
