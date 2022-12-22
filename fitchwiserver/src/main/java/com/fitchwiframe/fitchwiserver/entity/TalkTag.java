package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "talkTag")
public class TalkTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int talkTagCode;

    @ManyToOne
    @JoinColumn(name = "talkCode")
    private Talk talkCode;

    @Column(nullable = false, length = 30)
    private String talkTagContent;
}
