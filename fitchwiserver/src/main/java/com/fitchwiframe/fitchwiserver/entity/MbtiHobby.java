package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "mbti_hobby")
public class MbtiHobby {
    @Id
    private long mbtiHobbyCode;

    @Column(columnDefinition = "char(4) not null")
    private Character mbtiHobbyMbti;

    @Column(nullable = false, length = 20)
    private String mbtiHobbyHobby;
}
