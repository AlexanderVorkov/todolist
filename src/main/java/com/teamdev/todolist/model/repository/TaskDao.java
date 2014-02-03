package com.teamdev.todolist.model.repository;

import com.google.common.base.Predicate;
import org.springframework.stereotype.Service;
import com.teamdev.todolist.model.Task;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newLinkedList;
import static com.google.common.collect.Maps.newHashMap;

/**
 * Created with IntelliJ IDEA.
 * User: vorkov
 */
@Service
public class TaskDao {
    public static long id = 1;
    private static Map<Long, Task> localDB = newHashMap();

    static {
        localDB.put(0L, new Task(0L, "test text", false, 0L, 0L, "12.12.12"));
        localDB.put(1L, new Task(1L, "test text", false, 1L, 0L, "12.12.12"));
        localDB.put(2L, new Task(2L, "test text", false, 0L, 0L, "12.12.12"));
    }

    public Task save(Task task){
        if(task.getId() == null){
            task.setId(id++);
        }
        localDB.put(task.getId(), task);
        return task;
    }

    public boolean delete (long id){
        if(localDB.containsKey(id)){
            localDB.remove(id);
            return true;
        }
        return false;
    }

    public Task findOne(long id){
        if(localDB.containsKey(id)){
            return localDB.get(id);
        }
        return null;
    }

    public List<Task> findAllByAuthor(final Long authorId){
        return newLinkedList(filter(newLinkedList(localDB.values()), new Predicate<Task>() {
            @Override
            public boolean apply(Task task) {
                return task.getAuthorId().equals(authorId);
            }
        }));
    }

    public List<Task> findAllByAssignee(final Long authorId){
        return newLinkedList(filter(newLinkedList(localDB.values()), new Predicate<Task>() {
            @Override
            public boolean apply(Task task) {
                return task.getAssigneeId().equals(authorId);
            }
        }));
    }
}
