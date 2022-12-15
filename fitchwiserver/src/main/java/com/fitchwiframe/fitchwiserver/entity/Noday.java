package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "noday")
public class Noday {
  @Id
  private long nodayCode = System.currentTimeMillis();

  @Column(nullable = false, length = 20)
  private String nodayDate;
}
