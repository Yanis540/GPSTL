package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.StudentDto;
import com.gpstl.backend.models.user.Student;
import org.modelmapper.ModelMapper;

public class StudentMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static StudentDto toDto(Student student) {
        return modelMapper.map(student, StudentDto.class);
    }

    public static Student toEntity(StudentDto studentDto) {
        return modelMapper.map(studentDto, Student.class);
    }
}
