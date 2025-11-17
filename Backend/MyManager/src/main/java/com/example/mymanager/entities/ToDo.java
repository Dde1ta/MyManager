package com.example.mymanager.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="todo")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String catagory;

    @Column
    private String description;

    @Column
    private String tag;

    @Column
    private int status; // 1- pending, 2 - doing, 3 - done

    public ToDo(){

    }

    public  ToDo(String catagory1, String description1, String tag1, int status1){

        this.catagory = catagory1;
        this.description = description1;
        this.status = status1;
        this.tag = tag1;
    }
}
