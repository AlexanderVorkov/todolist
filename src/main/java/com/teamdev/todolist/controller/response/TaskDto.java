package com.teamdev.todolist.controller.response;

import com.google.common.base.Function;
import com.teamdev.todolist.model.Task;

/**
 * Created by alexander.vorkov.
 */
public class TaskDto {
    public final Long id;
    public final String text;
    public final boolean completed;
    public final Long authorId;
    public final Long assigneeId;
    public final String date;

    public TaskDto(Long id, String text, boolean completed, Long authorId, Long assigneeId, String date){
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.authorId = authorId;
        this.assigneeId = assigneeId;
        this.date = date;
    }

    public static Function<Task, TaskDto> TRANSFORMER = new Function<Task, TaskDto>() {
        @Override
        public TaskDto apply(Task task) {
            return new TaskDto(task.getId(), task.getText(), task.isCompleted(), task.getAuthorId(), task.getAssigneeId(), task.getDate());
        }
    };
}