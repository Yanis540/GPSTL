package com.gpstl.backend.controllers;

import com.gpstl.backend.dtos.RecruiterDto;
import com.gpstl.backend.mappers.RecruiterMapper;
import com.gpstl.backend.mappers.StudentMapper;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.models.user.User;
import com.gpstl.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/recruiter/{id}")
    public ResponseEntity<RecruiterDto> updateRecruiter(@PathVariable Long id, @RequestBody Recruiter updatedUser) {
        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(RecruiterMapper.toDto((Recruiter) user));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student updatedUser) {
        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(StudentMapper.toDto((Student) user));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}