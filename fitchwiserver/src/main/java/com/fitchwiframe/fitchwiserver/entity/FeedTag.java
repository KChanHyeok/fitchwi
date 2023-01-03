package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedTag")
public class FeedTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedTagCode;

    @Column(nullable = false, length = 50)
    private Long feedCode;

    @Column(nullable = false, length = 30)
    private String feedTagContent;
}
