package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedLike")
public class FeedLike {
    @Id
    private long feedLikeCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @ManyToOne
    @JoinColumn(name = "feedCode")
    private Feed feedCode;
}
