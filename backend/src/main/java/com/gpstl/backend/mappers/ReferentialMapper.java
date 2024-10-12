package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.ReferentialDto;
import com.gpstl.backend.models.referential.Referential;
import org.modelmapper.ModelMapper;

public class ReferentialMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static ReferentialDto toDto(Referential referential) {
        return modelMapper.map(referential, ReferentialDto.class);
    }

    public static Referential toEntity(ReferentialDto referentialDto) {
        return modelMapper.map(referentialDto, Referential.class);
    }
}

