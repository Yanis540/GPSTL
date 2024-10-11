package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.RecruiterDto;
import com.gpstl.backend.models.user.Recruiter;
import org.modelmapper.ModelMapper;

public class RecruiterMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static RecruiterDto toDto(Recruiter recruiter) {
        return modelMapper.map(recruiter, RecruiterDto.class);
    }

    public static Recruiter toEntity(RecruiterDto recruiterDto) {
        return modelMapper.map(recruiterDto, Recruiter.class);
    }
}

