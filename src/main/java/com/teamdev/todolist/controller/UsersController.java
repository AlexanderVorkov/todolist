package com.teamdev.todolist.controller;

import com.teamdev.todolist.controller.response.UserDto;
import com.teamdev.todolist.service.reader.UsersReader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by alexander.vorkov
 */
@Controller
public class UsersController {

    @Inject
    private UsersReader usersReader;

    @ResponseBody
    @RequestMapping(value="/users/", method = RequestMethod.GET)
    public List<UserDto> tasks(){
        return usersReader.readAllById(0L);
    }
}
