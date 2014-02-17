package com.teamdev.todolist.controller.response;

import com.google.common.base.Function;
import com.teamdev.todolist.model.User;

/**
 * Created by alexander.vorkov.
 */
public class UserDto {
    public final Long id;
    public final String name;
    public final Boolean isOwner;

    public UserDto(Long id, String name, Boolean isOwner){
        this.id = id;
        this.name = name;
        this.isOwner = isOwner;
    }

    public static Function<User, UserDto> TRANSFORMER = new Function<User, UserDto>() {
        @Override
        public UserDto apply(User user) {
            return new UserDto(user.getId(), user.getName(), user.getId() == 1L);
        }
    };
}