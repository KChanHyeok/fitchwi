package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "togetherPayment")
@Data
public class TogetherPayment {
    @Id
    private String togetherPayCode;

    @OneToOne
    @JoinColumn(name = "togetherCode")
    private Together togetherCode;

    @Column(nullable = false, length = 50)
    private  String togetherImp;

    @Column(nullable = false)
    private int togetherPayPrice;

    @Column(nullable = false, length = 50)
    private String togetherPayMethod;

    @Column(nullable = false, length = 15)
    private String togetherPayStatus;
}
