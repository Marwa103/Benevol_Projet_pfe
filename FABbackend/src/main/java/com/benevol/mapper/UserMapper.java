
package com.benevol.mapper;

import com.benevol.dto.user.UserProfileDto;
import com.benevol.dto.user.UpdateUserDto;
import com.benevol.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserProfileDto toProfileDto(User user) {
        UserProfileDto dto = new UserProfileDto();

        dto.setNom(user.getName());
        dto.setPrenom("");
        dto.setEmail(user.getEmail());

        dto.setTelephone("");
        dto.setVille("");
        dto.setAdresse("");
        return dto;
    }

    public void updateUserFromProfileDto(User user, UserProfileDto profileDto) {

        if (profileDto.getNom() != null) {
            // Utiliser setName() au lieu de setNom()
            user.setName(profileDto.getNom());
        }

    }

    public void updateUserFromUpdateDto(User user, UpdateUserDto updateDto) {

        if (updateDto.getNom() != null) {

            user.setName(updateDto.getNom());
        }

    }
}
