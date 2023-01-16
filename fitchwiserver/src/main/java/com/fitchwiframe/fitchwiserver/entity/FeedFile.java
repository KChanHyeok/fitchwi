package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedFile" )
public class FeedFile {

    @Id
    private long feedFileCode = System.currentTimeMillis();

    @Column(nullable = false, length = 50)
    private Long feedCode;

    @Column(nullable = false, length = 100)
    private String feedFileImg;

    @Column(nullable = false, length = 100)
    private String feedFileSaveimg;
}
