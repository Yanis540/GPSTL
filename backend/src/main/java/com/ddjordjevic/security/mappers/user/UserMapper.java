package com.ddjordjevic.security.mappers.user;

import com.ddjordjevic.security.dtos.user.UserDTO;
import com.ddjordjevic.security.models.user.User;
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
