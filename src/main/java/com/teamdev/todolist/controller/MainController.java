package com.teamdev.todolist.controller;

import com.teamdev.todolist.controller.response.TaskDto;
import com.teamdev.todolist.service.reader.TasksReader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by alexander.vorkov
 */
@Controller
public class MainController {

    @RequestMapping("/")
    public String indexPage(){
        return "index";
    }
}
