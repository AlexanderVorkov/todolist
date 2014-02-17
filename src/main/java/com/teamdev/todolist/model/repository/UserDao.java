package com.teamdev.todolist.model.repository;

import com.google.common.base.Predicate;
import com.teamdev.todolist.model.User;
import org.springframework.stereotype.Service;

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
public class UserDao {
    public static long id = 1;
    private static Map<Long, User> localDB = newHashMap();

    static {
        localDB.put(0L, new User(0L, "test1"));
        localDB.put(1L, new User(1L, "test1"));
        localDB.put(2L, new User(2L, "test1"));
    }

    public List<User> readAllById(final Long authorId){
        return newLinkedList(localDB.values());
    }
}
