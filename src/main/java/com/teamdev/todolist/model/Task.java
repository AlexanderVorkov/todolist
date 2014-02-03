package com.teamdev.todolist.model;

/**
 * Created with IntelliJ IDEA.
 * User: vorkov
 */

public class Task {
    private Long id;
    private String text;
    private boolean completed;
    private Long authorId;
    private Long assigneeId;
    private String date;

    Task(){}

    public Task(Long id, String text, boolean completed, Long authorId, Long assigneeId, String date){
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.authorId = authorId;
        this.assigneeId = assigneeId;
        this.date = date;
    }

    public Task(String text, boolean completed, Long authorId, Long assigneeId, String date){
        this.text = text;
        this.completed = completed;
        this.authorId = authorId;
        this.assigneeId = assigneeId;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
