package com.gpstl.backend.mappers.user;

import com.gpstl.backend.dtos.user.UserDTO;
import com.gpstl.backend.models.user.User;
import org.modelmapper.ModelMapper;

public class UserMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static UserDTO toDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public static User toEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
