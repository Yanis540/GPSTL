package com.gpstl.backend.dtos;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecruiterDto extends UserDto {
    private Long companyId;
}

