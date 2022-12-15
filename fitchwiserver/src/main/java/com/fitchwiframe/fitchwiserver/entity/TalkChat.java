package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "talk_chat")
public class TalkChat {
    @Id
    private long talkChatCode = System.currentTimeMillis();

    @OneToOne
    @JoinColumn(name = "talkCode")
    private Talk talkCode;

    @Column(nullable = false, length = 20)
    private String talkChatWriter;

    @Column(nullable = false, length = 500)
    private String talkChatContent;

    @Column(nullable = false, length = 50)
    private String talkChatName;
}
