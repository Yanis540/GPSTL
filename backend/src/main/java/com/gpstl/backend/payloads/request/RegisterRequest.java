package com.gpstl.backend.payloads.request;

import com.gpstl.backend.models.Company;
import com.gpstl.backend.models.referential.Referential;
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
    private byte[] photo;
    private String schoolName;
    private Company company;
    private List<Referential> skills;
    private List<Referential> grades;
    private Referential field;
    private Date birthDate;
    private Role role;
}
