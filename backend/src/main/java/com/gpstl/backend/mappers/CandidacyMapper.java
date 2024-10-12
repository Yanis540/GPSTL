package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.CandidacyDto;
import com.gpstl.backend.models.candidacy.Candidacy;
import org.modelmapper.ModelMapper;

public class CandidacyMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static CandidacyDto toDto(Candidacy candidacy) {
        return modelMapper.map(candidacy, CandidacyDto.class);
    }

    public static Candidacy toEntity(CandidacyDto candidacyDto) {
        return modelMapper.map(candidacyDto, Candidacy.class);
    }
}

