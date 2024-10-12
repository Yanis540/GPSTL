package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.CompanyDto;
import com.gpstl.backend.models.Company;
import org.modelmapper.ModelMapper;

public class CompanyMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static CompanyDto toDto(Company company) {
        return modelMapper.map(company, CompanyDto.class);
    }

    public static Company toEntity(CompanyDto companyDto) {
        return modelMapper.map(companyDto, Company.class);
    }
}
