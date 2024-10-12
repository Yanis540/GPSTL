package com.gpstl.backend.dtos;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto extends UserDto {
    private String schoolName;
    private ReferentialDto field;
    private ReferentialDto grade;
    private List<ReferentialDto> skills;
    private Integer monthlyCurrentCandidacy;
}

