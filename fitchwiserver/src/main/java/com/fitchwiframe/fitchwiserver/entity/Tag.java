package com.fitchwiframe.fitchwiserver.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tagCode;

    @Column(nullable = false, length = 100, unique=true)
    private String tagContent;
}
