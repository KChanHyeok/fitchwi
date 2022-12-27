package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "facilities")
public class Facilities {
  @Id
  private long facilitiesCode = System.currentTimeMillis();

  @Column(nullable = false, length = 50)
  private String facilitiesName;

  @Column(nullable = false, length = 20)
  private String facilitiesManager;

  @Column(nullable = false, length = 16)
  private String facilitiesPhone;

  @Column(nullable = false, length = 50)
  private String facilitiesPosition;

  @Column(nullable = false)
  private int facilitiesPrice;

  @Column(nullable = false, length = 10)
  private String facilitiesGrade;

  @Transient
  private List<Noday> nodayList;
}
