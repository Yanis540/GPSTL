package com.gpstl.backend.dtos;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecruiterDto extends UserDto {
    private Long companyId;
    private List<OfferDto> offers;
}

