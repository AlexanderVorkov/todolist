package com.teamdev.todolist.controller;

import com.teamdev.todolist.controller.response.TaskDto;
import com.teamdev.todolist.service.reader.TasksReader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by alexander.vorkov
 */
@Controller
public class TasksController {

    @Inject
    private TasksReader tasksReader;

    @RequestMapping("/")
    public String indexPage(){
        return "index";
    }

    @ResponseBody
    @RequestMapping("/tasks1/")
    public List<TaskDto> tasks1(){
        long assigneeId = 0L;
        return tasksReader.readAllByAssignee(assigneeId);
    }

    @ResponseBody
    @RequestMapping(value="/tasks/{assigneeid}", method = RequestMethod.GET)
    public List<TaskDto> tasks(@PathVariable long assigneeid){
        return tasksReader.readAllByAssignee(assigneeid);
    }
}
