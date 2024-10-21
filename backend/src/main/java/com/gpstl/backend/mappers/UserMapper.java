package com.gpstl.backend.mappers;

import com.gpstl.backend.dtos.UserDto;
import com.gpstl.backend.models.user.User;
import org.modelmapper.ModelMapper;

public class UserMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static UserDto toDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public static User toEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

}
