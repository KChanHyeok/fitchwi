package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="talk")
public class Talk {
    @Id
    private long talkCode = System.currentTimeMillis();

    @OneToOne
    @JoinColumn(name = "talkOpenCode")
    private TalkOpened talkOpenCode;

    @Column(nullable = false, length = 30)
    private String talkTitle;

    @Column(nullable = false, length = 50)
    private String talkCategory;

    @Column(nullable = false, length = 5000)
    private String talkContent;

    @Column(nullable = false, length = 100)
    private String talkImg;

    @Column(nullable = false, length = 100)
    private String talkSaveimg;

    @Column(nullable = false, length = 10)
    private String talkType;

    @Column(length = 100)
    private String talkInquiry;

    @Column(nullable = false)
    private int talkMax;

    @Transient
    private Long talkMemberCount;

}
