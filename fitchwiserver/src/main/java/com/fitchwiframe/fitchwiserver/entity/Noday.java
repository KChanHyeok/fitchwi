package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "noday")
public class Noday {
  @Id
  private long nodayCode = System.currentTimeMillis();

  @ManyToOne
  @JoinColumn(name = "facilitiesCode")
  private Facilities facilitiesCode;

  @Column(nullable = false, length = 20)
  private String nodayDate;
}
