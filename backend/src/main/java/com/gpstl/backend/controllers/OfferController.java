package com.gpstl.backend.controllers;

import com.gpstl.backend.dtos.OfferDto;
import com.gpstl.backend.mappers.OfferMapper;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.services.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("offer")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ResponseEntity<List<OfferDto>> getAllOffers() {
        List<OfferDto> offers = offerService
                .getAllOffers()
                .stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfferDto> getOfferById(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(o -> ResponseEntity.ok(OfferMapper.toDto(o)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<OfferDto> createOffer(@RequestBody OfferDto offerToCreate) {
        try {
            Offer offer = offerService.createOffer(OfferMapper.toEntity(offerToCreate));
            return new ResponseEntity<>(OfferMapper.toDto(offer), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfferDto> updateOffer(@PathVariable("id") Long id, @RequestBody OfferDto offerToUpdate) {
        try {
            Offer offer = offerService.updateOffer(id, OfferMapper.toEntity(offerToUpdate));
            return ResponseEntity.ok(OfferMapper.toDto(offer));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        try {
            offerService.deleteOffer(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
}
