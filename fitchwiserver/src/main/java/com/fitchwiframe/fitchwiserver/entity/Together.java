package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "together")
@Data
public class Together {
  @Id
  private long togetherCode = System.currentTimeMillis();

  @OneToOne
  @JoinColumn(name = "togetherOpenedCode")
  private TogetherOpened togetherOpenedCode;

  @Column(nullable = false, length = 10)
  private String togetherState;  //함께해요 결제대기, 함께해요 결제완료

  @Column(nullable = false, length = 50)
  private String togetherCategory;

  @Column(nullable = false, length = 50)
  private String togetherTitle;

  @Column(nullable = false, length = 100)
  private String togetherPosition;

  @Column(nullable = false, length = 50)
  private String togetherDate;

  @Column(nullable = false)
  private int togetherMax;

  @Column(nullable = false, length = 5000)
  private String togetherContent;

  @Column(nullable = false, length = 100) //기본 이미지 이름
  private String togetherImg;

  @Column(nullable = false, length = 100)//기본 이미지 저장될 이름
  private String togetherSaveimg;

  @Column(nullable = false, length = 20)
  private String togetherRecruitStartDate;

  @Column(nullable = false, length = 20)
  private String togetherRecruitEndDate;

  @Column(nullable = false, length = 10)
  private String togetherType;

  @Column(length = 100)
  private String togetherInquiry;

  @Column(nullable = false)
  @ColumnDefault("0")
  private int togetherPrice;

  @Column(nullable = false)
  @ColumnDefault("0")
  private int togetherTotalPrice;

  @Transient
  private Long togetherMemberCount;

}
