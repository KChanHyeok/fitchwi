package com.fitchwiframe.fitchwiserver.entity;

import javax.persistence.*;

@Entity
public class TogetherOpened {
  @Id
  private long togetherOpenCode = System.currentTimeMillis();

  @ManyToOne
  @JoinColumn(name = "memberEmail")
  private Member memberEmail;

  @ManyToOne
  @JoinColumn(name = "facilitesCode")
  private Facilities facilitiesCode;

  @Column(nullable = false, length = 20)
  private String togetherOpenedDate;

  @Column(nullable = false, length = 20)
  private String togetherReservedDate;
}
