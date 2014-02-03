package com.teamdev.todolist.service.reader;

import com.teamdev.todolist.controller.response.TaskDto;
import com.teamdev.todolist.model.repository.TaskDao;

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
public class TasksReader {
    @Inject
    private TaskDao taskDao;

    public List<TaskDto> readAllByAssignee(Long assigneeId){
        return newLinkedList(transform(taskDao.findAllByAssignee(assigneeId), TaskDto.TRANSFORMER));
    }
}
