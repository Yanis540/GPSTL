package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.OfferDto;
import com.gpstl.backend.dtos.RecruiterDto;
import com.gpstl.backend.models.Offer;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class OfferMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static OfferDto toDto(Offer offer) {
        OfferDto offerDto = modelMapper.map(offer, OfferDto.class);
        offerDto.setRecruiter(UserMapper.toDto(offer.getRecruiter()));
        return offerDto;
    }

    public static Offer toEntity(OfferDto offerDto) {
        Offer offer = modelMapper.map(offerDto, Offer.class);
        offer.setRecruiter(RecruiterMapper.toEntity((RecruiterDto) offerDto.getRecruiter()));
        return offer;
    }

    public static List<OfferDto> toDtoList(List<Offer> offers) {
        return offers.stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Offer> toEntityList(List<OfferDto> offersDto) {
        return offersDto.stream()
                .map(OfferMapper::toEntity)
                .collect(Collectors.toList());
    }
}

