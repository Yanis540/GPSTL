package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.ReferentialDto;
import com.gpstl.backend.models.referential.Referential;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class ReferentialMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static ReferentialDto toDto(Referential referential) {
        return modelMapper.map(referential, ReferentialDto.class);
    }

    public static Referential toEntity(ReferentialDto referentialDto) {
        return modelMapper.map(referentialDto, Referential.class);
    }

    public static List<ReferentialDto> toDtoList(List<Referential> referentials) {
        return referentials.stream()
                .map(ReferentialMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Referential> toEntityList(List<ReferentialDto> referentialDtos) {
        return referentialDtos.stream()
                .map(ReferentialMapper::toEntity)
                .collect(Collectors.toList());
    }

}

