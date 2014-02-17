package com.teamdev.todolist.service.reader;

import com.teamdev.todolist.controller.response.UserDto;
import com.teamdev.todolist.model.repository.UserDao;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

import static com.google.common.collect.Lists.newLinkedList;
import static com.google.common.collect.Lists.transform;

/**
 * Created with IntelliJ IDEA.
 * User: vorkov
 */
@Service
public class UsersReader {
    @Inject
    private UserDao userDao;

    public List<UserDto> readAllById(Long assigneeId){
        return newLinkedList(transform(userDao.readAllById(assigneeId), UserDto.TRANSFORMER));
    }
}
