package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.CandidacyDto;
import com.gpstl.backend.models.candidacy.Candidacy;
import org.modelmapper.ModelMapper;

public class CandidacyMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static CandidacyDto toDto(Candidacy candidacy) {
        CandidacyDto candidacyDto = modelMapper.map(candidacy, CandidacyDto.class);
        candidacyDto.setOffer(OfferMapper.toDto(candidacy.getOffer()));
        return candidacyDto;
    }

    public static Candidacy toEntity(CandidacyDto candidacyDto) {
        return modelMapper.map(candidacyDto, Candidacy.class);
    }
}

