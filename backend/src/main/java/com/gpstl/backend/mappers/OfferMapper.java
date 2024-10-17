package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.OfferDto;
import com.gpstl.backend.dtos.ReferentialDto;
import com.gpstl.backend.models.Offer;
import com.gpstl.backend.models.referential.Referential;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class OfferMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static OfferDto toDto(Offer offer) {
        return modelMapper.map(offer, OfferDto.class);
    }

    public static Offer toEntity(OfferDto offerDto) {
        return modelMapper.map(offerDto, Offer.class);
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

