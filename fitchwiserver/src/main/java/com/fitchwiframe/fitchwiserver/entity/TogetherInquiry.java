package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "togetherInquiry")
public class TogetherInquiry {
  @Id
  private long inquiryCode = System.currentTimeMillis();

  @ManyToOne
  @JoinColumn(name = "memberEmail")//문의자
  private Member memberEmail;

  @OneToOne
  @JoinColumn(name = "togetherCode")
  private Together togetherCode;

  @Column(nullable = false, length = 200)
  private String inquiryContent;

  @Column(length = 200)
  private String inquiryAnswer;

  @Column(nullable = false, length = 50)
  private Timestamp inquiryDate;


}
