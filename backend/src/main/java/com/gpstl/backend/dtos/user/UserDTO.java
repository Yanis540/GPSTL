package com.gpstl.backend.dtos.user;

import com.gpstl.backend.models.user.Role;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserDTO implements Serializable {
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
}
