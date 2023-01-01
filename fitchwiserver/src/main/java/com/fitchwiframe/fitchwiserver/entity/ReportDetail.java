package com.fitchwiframe.fitchwiserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="reportDetail")
public class ReportDetail {
  @Id
  private long reportDetailCode = System.currentTimeMillis();

  @ManyToOne
  @JsonBackReference
  @JoinColumn(name = "reportCode")
  private Report reportCode;

  @ManyToOne
  @JoinColumn(name = "memberEmail")
  private Member memberEmail;

  @Column(nullable = false, length = 200)
  private String reportDetailContent;

  @Column(nullable = false, length = 20)
  private String reportDetailDate;


}
