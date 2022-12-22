package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "feedFile" )
public class FeedFile {

    @Id
    private long feedFileCode = System.currentTimeMillis();

//    @ManyToOne
//    @JoinColumn(name = "feedCode")
//    private Feed feedCode;

    @Column(nullable = false, length = 50)
    private Long feedCode;

    @Column(nullable = false, length = 50)
    private String feedFileImg;

    @Column(nullable = false, length = 50)
    private String feedFileSaveimg;
}
