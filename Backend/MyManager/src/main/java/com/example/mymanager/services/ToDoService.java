package com.example.mymanager.services;

import com.example.mymanager.entities.ToDo;
import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public List<ToDo> getTodosForUser(User user) {
        return toDoRepository.findByUserId(user.getId());
    }

    public ToDo createTodo(ToDo todo, User user) {
        todo.setUser(user);
        // Default status if not set
        if (todo.getStatus() < 0 || todo.getStatus() > 2) {
            todo.setStatus(0);
        }
        return toDoRepository.save(todo);
    }

    public ToDo updateStatus(Long todoId, int status, User user) {
        ToDo todo = toDoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied");
        }

        todo.setStatus(status);
        return toDoRepository.save(todo);
    }

    public void deleteTodo(Long todoId, User user) {
        ToDo todo = toDoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied");
        }
        toDoRepository.delete(todo);
    }
}