package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "follow")
public class Follow {
    @Id
    private long followCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(nullable = false, length = 30)
    private String followId;
}
