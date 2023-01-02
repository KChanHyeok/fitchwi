package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class TogetherJoinPayment {
    @Id
    private String togetherJoinPayCode;  //전달받은 결제 코드

    @OneToOne
    @JoinColumn(name = "togetherJoinCode")
    private TogetherJoin togetherJoinCode;

    @Column(nullable = false, length = 50)
    private  String togetherJoinImp;

    @Column(nullable = false)
    private int togetherJoinPayPrice;

    @Column(nullable = false, length = 50)
    private String togetherJoinPayMethod;

    @Column(nullable = false, length = 15)
    private String togetherJoinPayStatus;

}
