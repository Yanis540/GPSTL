package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.RecruiterDto;
import com.gpstl.backend.models.user.Recruiter;
import org.modelmapper.ModelMapper;

public class RecruiterMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static RecruiterDto toDto(Recruiter recruiter) {
        RecruiterDto recruiterDto = modelMapper.map(recruiter, RecruiterDto.class);
        recruiterDto.setCompany(CompanyMapper.toDto(recruiter.getCompany()));
        return recruiterDto;
    }

    public static Recruiter toEntity(RecruiterDto recruiterDto) {
        Recruiter recruiter = modelMapper.map(recruiterDto, Recruiter.class);
        recruiter.setCompany(CompanyMapper.toEntity(recruiterDto.getCompany()));
        return recruiter;
    }
}

