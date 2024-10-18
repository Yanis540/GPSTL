package com.gpstl.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidacyDto {
    private Long id;
    private String status;
    private Date dateOfCandidacy;
    private Date dateOfResponse;
    private Long studentId;
    private OfferDto offer;
}

