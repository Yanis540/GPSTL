package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.StudentDto;
import com.gpstl.backend.models.user.Student;
import org.modelmapper.ModelMapper;

public class StudentMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static StudentDto toDto(Student student) {
        StudentDto studentDto = modelMapper.map(student, StudentDto.class);
        studentDto.setField(ReferentialMapper.toDto(student.getField()));
        studentDto.setGrade(ReferentialMapper.toDto(student.getGrade()));
        studentDto.setSkills(ReferentialMapper.toDtoList(student.getSkills()));
        return studentDto;
    }

    public static Student toEntity(StudentDto studentDto) {
        Student student = modelMapper.map(studentDto, Student.class);
        student.setField(ReferentialMapper.toEntity(studentDto.getField()));
        student.setGrade(ReferentialMapper.toEntity(studentDto.getGrade()));
        student.setSkills(ReferentialMapper.toEntityList(studentDto.getSkills()));
        return student;
    }
}
