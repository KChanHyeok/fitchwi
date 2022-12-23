package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedLike")
public class FeedLike {
    @Id
    private long feedLikeCode = System.currentTimeMillis();

    // 좋아요를 누른 회원의 정보
    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    // 좋아요를 누른 피드의 코드
    @Column(nullable = false, length = 50)
    private Long feedCode;
}
