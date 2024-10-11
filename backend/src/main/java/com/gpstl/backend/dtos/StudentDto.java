package com.gpstl.backend.dtos;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto extends UserDto {
    private String schoolName;
    private Long fieldId;
    private List<Long> gradeIds;
    private List<Long> skillIds;
    private Integer monthlyCurrentCandidacy;
}

