package com.teamdev.todolist.model;

/**
 * Created with IntelliJ IDEA.
 * User: vorkov
 */
public class User {
    private Long id;
    private String name;

    User(){}

    public User(Long id, String name){
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
