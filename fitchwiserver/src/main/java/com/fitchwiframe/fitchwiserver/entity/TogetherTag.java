package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "togetherTag")
@Data

public class TogetherTag {

    @Id
    private long togetherTagCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name="togetherCode")
    private Together togetherCode;

    @Column(nullable = false, length = 30)
    private String togetherTagContent;

}
