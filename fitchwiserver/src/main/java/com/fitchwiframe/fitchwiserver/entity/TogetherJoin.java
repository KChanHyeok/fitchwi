package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@DynamicInsert  // @DynamicInsert는 null 값인 것을 제외하고 insert하기 때문에 실제로 DB에 설정된 default값이 저장된다.
@Table(name="togetherJoin")
@Data
@Entity
public class TogetherJoin {
  @Id
  private long togetherJoinCode = System.currentTimeMillis();

  @ManyToOne//함께해요 가입자
  @JoinColumn(name="memberEmail")
  private Member memberEmail;

  @ManyToOne
  @JoinColumn(name="togetherCode")
  private Together togetherCode;

  @Column(columnDefinition = "varchar(20) default '대기'")
  private String togetherJoinState;

  @Column(nullable = false, length = 20)
  private String togetherJoinDate;

  @Column(length = 200)
  private String togetherJoinAnswer;
}
