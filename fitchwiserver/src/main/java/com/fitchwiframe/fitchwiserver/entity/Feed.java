package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feed")
public class Feed {
    @Id
    private long feedCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(length = 20)
    private String feedClassificationcode;

    @Column(length = 50)
    private String feedCategory;

    @Column(nullable = false, length = 50)
    private String feedDate;

    @Column(nullable = false, length = 2000)
    private String feedContent;

    @Column(nullable = false, length = 100)
    private String feedImg;

    @Column(nullable = false, length = 100)
    private String feedSaveimg;
}
