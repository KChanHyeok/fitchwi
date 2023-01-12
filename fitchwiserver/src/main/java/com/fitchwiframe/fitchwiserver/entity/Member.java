package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="member")
public class Member {

  @Id
  @Column(length = 30)
  private String memberEmail;

  @Column(nullable = false, length = 10)
  private String memberName ;

  @Column(nullable = true, length = 100)
  private String memberPwd ;

  @Column(length = 20, nullable = false)
  private String memberNickname ;

  @Column(nullable = false, length = 2)
  private String memberGender ;

  @Column(nullable = false, length = 16)
  private String memberPhone ;

  @Column(nullable = false, length = 50)
  private String memberAddr ;

  @Column(nullable = false, length = 20)
  private String memberBirth ;
  //이미지 기본이름 defalutvalue 설정 필요
  @Column(nullable = false, length = 100)
  private String memberImg ;
  //저장될 이름 defalutvalue 설정 필요
  @Column(nullable = false, length = 100)
  private String memberSaveimg ;

  @Column(nullable = false, length = 4)
  private String memberMbti ;

  @Column(nullable = false, length = 50)
  private String memberInterest ;

  @Column(length = 20)
  private String memberRestriction;

  @Transient
  private Long memberFeedCount;
}
