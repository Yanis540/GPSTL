package com.gpstl.backend.controllers;

import com.gpstl.backend.models.referential.Referential;
import com.gpstl.backend.models.referential.ReferentialType;
import com.gpstl.backend.repositories.ReferentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("referential")
@RequiredArgsConstructor
public class ReferentialController {

    private final ReferentialRepository referentialRepository;

    @GetMapping
    public ResponseEntity<List<Referential>> getReferentials(@RequestParam(required = false) ReferentialType type) {
        List<Referential> referentials;
        if (type != null) {
            referentials = referentialRepository.findReferentialsByType(type);
        } else {
            referentials = referentialRepository.findAll();
        }
        return ResponseEntity.ok(referentials);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Referential> getReferentialById(@PathVariable Long id) {
        Optional<Referential> referential = referentialRepository.findById(id);
        return referential.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Referential> createReferential(@RequestBody Referential referentialToCreate) {
        try {
            Referential referential = referentialRepository.save(referentialToCreate);
            return new ResponseEntity<>(referential, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Referential> updateReferential(@PathVariable("id") Long id, @RequestBody Referential referentialToUpdate) {
        try {
            if (referentialRepository.existsById(id)) {
                Referential updatedReferential = referentialRepository.save(referentialToUpdate);
                return ResponseEntity.ok(updatedReferential);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferential(@PathVariable Long id) {
        try {
            if (referentialRepository.existsById(id)) {
                referentialRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
