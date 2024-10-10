package com.gpstl.backend.repositories;

import com.gpstl.backend.models.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
