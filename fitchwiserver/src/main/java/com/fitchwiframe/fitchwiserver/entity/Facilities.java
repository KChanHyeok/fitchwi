package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "facilitiesCode")
public class Facilities {
  @Id
  private long facilitiesCode = System.currentTimeMillis();

  @ManyToOne
  @JoinColumn(name = "nodayCode")
  private Noday nodayCode;

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

}
