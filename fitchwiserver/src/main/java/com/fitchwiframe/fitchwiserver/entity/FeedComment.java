package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedComment")
public class FeedComment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedCommentCode;

    @Column(nullable = false, length = 50)
    private Long feedCode;

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(nullable = false, length = 255)
    private String feedCommentContent;

    @Column(nullable = false, length = 50)
    private Long feedCommentDate = System.currentTimeMillis();
}
