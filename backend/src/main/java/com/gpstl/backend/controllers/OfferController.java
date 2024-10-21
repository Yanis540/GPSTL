package com.gpstl.backend.controllers;

import com.gpstl.backend.contexts.UserContext;
import com.gpstl.backend.dtos.OfferDto;
import com.gpstl.backend.mappers.OfferMapper;
import com.gpstl.backend.mappers.UserMapper;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.user.Role;
import com.gpstl.backend.models.user.User;
import com.gpstl.backend.services.OfferService;
import com.gpstl.backend.services.UserService;

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
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<OfferDto>> getAllOffers() {
        List<OfferDto> offers = offerService
                .getAllOffers()
                .stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/available")
    public ResponseEntity<List<OfferDto>> getAvailableOffers() {
        Long studentId = UserContext.getUserId();

        if (studentId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<OfferDto> availableOffers = offerService.
                getAvailableOffers(studentId)
                .stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(availableOffers);
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
            Long id = UserContext.getUserId();
            if (id == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            User user = userService.getUser(id);
            if(user.getRole() == Role.STUDENT)
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            System.out.println(">>>>>>>>>>"+offerToCreate);
            offerToCreate.setRecruiter(UserMapper.toDto(user));
            Offer offer = offerService.createOffer(OfferMapper.toEntity(offerToCreate));
            return new ResponseEntity<>(OfferMapper.toDto(offer), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/all/recruiter/offers/{recruiterId}")
    public ResponseEntity<List<OfferDto>> getRecuiterOffer(@PathVariable Long recruiterId) {
        try {
            if (recruiterId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            List<OfferDto> offers= offerService
                // .getAllOffers()
                .getOffersByRecruiterId(recruiterId)
                .stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
            return ResponseEntity.ok(offers);

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
