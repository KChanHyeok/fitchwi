package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="togetherJoin")
@Data
public class TogetherJoin {
  @Id
  private long togetherJoinCode = System.currentTimeMillis();

  @ManyToOne//함께해요 가입자
  @JoinColumn(name="memberEmail")
  private Member memberEmail;

  @ManyToOne
  @JoinColumn(name="togetherCode")
  private Together togetherCode;

  @Column(columnDefinition = "varchar(10) default '대기'")
  private String togetherJoinState;

  @Column(nullable = false, length = 20)
  private String togetherJoinDate;

  @Column(length = 200)
  private String togetherJoinAnswer;
}
