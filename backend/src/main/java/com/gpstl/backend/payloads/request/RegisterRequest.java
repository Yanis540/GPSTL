package com.gpstl.backend.payloads.request;

import com.gpstl.backend.models.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String lastname;
    private String firstname;
    private String password;
    private String email;
    private String photo;
    private String schoolName;
    private Long companyId;
    private List<Long> skillIds;
    private Long gradeId;
    private Long fieldId;
    private Date birthDate;
    private Role role;
}
