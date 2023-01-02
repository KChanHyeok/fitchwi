package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Data
@Table(name = "talkJoin")
@DynamicInsert
public class TalkJoin {
    @Id
    private long talkJoinCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "talkCode")
    private Talk talkCode;

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(columnDefinition = "varchar(10) default '대기'")
    private String talkJoinState;

    @Column(length = 20)
    private String talkJoinDate;

    @Column(length = 200)
    private String talkJoinAnswer;
}
