package com.gpstl.backend.services;

import com.gpstl.backend.models.referential.Referential;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.models.user.User;
import com.gpstl.backend.repositories.ReferentialRepository;
import com.gpstl.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ReferentialRepository referentialRepository;
    private final PasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        if (user instanceof Student student) {

            List<Referential> grades = student.getGrades().stream()
                    .map(ref -> referentialRepository.findById(ref.getId()).orElseThrow())
                    .collect(Collectors.toList());
            student.setGrades(grades);

            List<Referential> skills = student.getSkills().stream()
                    .map(ref -> referentialRepository.findById(ref.getId()).orElseThrow())
                    .collect(Collectors.toList());
            student.setSkills(skills);

            if (student.getField() != null) {
                student.setField(referentialRepository.findById(student.getField().getId()).orElseThrow());
            }

            student.setPassword(passwordEncoder.encode(student.getPassword()));
            return userRepository.save(student);
        } else if (user instanceof Recruiter recruiter) {
            recruiter.setPassword(passwordEncoder.encode(recruiter.getPassword()));
            return userRepository.save(recruiter);
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser instanceof Student updatedStudent) {
            Student existingStudent = (Student) existingUser;

            List<Referential> grades = updatedStudent.getGrades().stream()
                    .map(ref -> referentialRepository.findById(ref.getId()).orElseThrow())
                    .collect(Collectors.toList());
            existingStudent.setGrades(grades);

            List<Referential> skills = updatedStudent.getSkills().stream()
                    .map(ref -> referentialRepository.findById(ref.getId()).orElseThrow())
                    .collect(Collectors.toList());
            existingStudent.setSkills(skills);

            if (updatedStudent.getField() != null) {
                existingStudent.setField(referentialRepository.findById(updatedStudent.getField().getId()).orElseThrow());
            }

            existingStudent.setSchoolName(updatedStudent.getSchoolName());
        } else if (updatedUser instanceof Recruiter updatedRecruiter) {
            Recruiter existingRecruiter = (Recruiter) existingUser;
            existingRecruiter.setCompany(updatedRecruiter.getCompany());
        }

        existingUser.setRole(updatedUser.getRole());

        return userRepository.save(existingUser);
    }

}
