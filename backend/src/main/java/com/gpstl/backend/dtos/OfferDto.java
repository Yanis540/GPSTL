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
public class OfferDto {
    private Long id;
    private String name;
    private Double salary;
    private String rhythm;
    private String description;
    private Date publicationDate;
    private RecruiterDto recruiter;
}

