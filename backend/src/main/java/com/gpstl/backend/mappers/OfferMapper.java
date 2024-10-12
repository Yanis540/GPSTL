package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.OfferDto;
import com.gpstl.backend.models.Offer;
import org.modelmapper.ModelMapper;

public class OfferMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static OfferDto toDto(Offer offer) {
        return modelMapper.map(offer, OfferDto.class);
    }

    public static Offer toEntity(OfferDto offerDto) {
        return modelMapper.map(offerDto, Offer.class);
    }
}

