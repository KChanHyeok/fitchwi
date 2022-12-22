package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "talkOpened")
public class TalkOpened {
    @Id
    private long talkOpenCode = System.currentTimeMillis();

    @OneToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(nullable = false, length = 20)
    private String talkOpenDate;
}
