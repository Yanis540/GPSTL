package com.gpstl.backend.services;

import com.gpstl.backend.exception.UserNotFoundException;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.referential.Referential;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.models.user.User;
import com.gpstl.backend.repositories.OfferRepository;
import com.gpstl.backend.repositories.ReferentialRepository;
import com.gpstl.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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
    private final OfferRepository offerRepository;
    private final PasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        if (user instanceof Student student) {
            //student.setPassword(passwordEncoder.encode(student.getPassword()));
            student.setPassword(student.getPassword());
            return userRepository.save(student);
        } else if (user instanceof Recruiter recruiter) {
            recruiter.setPassword(recruiter.getPassword());
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

            existingStudent.setGrade(referentialRepository.findById(updatedStudent.getGrade().getId()).orElseThrow());

            List<Referential> skills = updatedStudent.getSkills().stream()
                    .map(ref -> referentialRepository.findById(ref.getId()).orElseThrow())
                    .collect(Collectors.toList());
            existingStudent.setSkills(skills);

            existingStudent.setField(referentialRepository.findById(updatedStudent.getField().getId()).orElseThrow());

            existingStudent.setSchoolName(updatedStudent.getSchoolName());
        } else if (updatedUser instanceof Recruiter updatedRecruiter) {
            Recruiter existingRecruiter = (Recruiter) existingUser;
            existingRecruiter.setCompany(updatedRecruiter.getCompany());
        }

        //existingUser.setRole(updatedUser.getRole());

        return userRepository.save(existingUser);
    }
    public User getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        return user;
    }

    public void swapOffer(Long studentId, Long offerId) {
        Student student = (Student) userRepository.findById(studentId)
                .orElseThrow(() -> new UserNotFoundException("Student not found"));
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Offer not found"));

        student.getIgnoredOffers().add(offer);
        userRepository.save(student);
    }

}
