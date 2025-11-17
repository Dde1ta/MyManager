package com.example.mymanager.controllers;

import com.example.mymanager.entities.ToDo;
import com.example.mymanager.entities.User;
import com.example.mymanager.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class ToDoController extends BaseController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public List<ToDo> getTodos() {
        User user = getAuthenticatedUser();
        return toDoService.getTodosForUser(user);
    }

    @PostMapping
    public ToDo createTodo(@RequestBody ToDo todo) {
        User user = getAuthenticatedUser();
        return toDoService.createTodo(todo, user);
    }

    @PutMapping("/{id}/status")
    public ToDo updateStatus(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
        User user = getAuthenticatedUser();
        return toDoService.updateStatus(id, payload.get("status"), user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        toDoService.deleteTodo(id, user);
        return ResponseEntity.ok().build();
    }
}