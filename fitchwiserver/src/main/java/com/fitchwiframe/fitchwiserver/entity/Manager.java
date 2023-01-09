package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "manager")
public class Manager {
  @Id
  private String managerId;

  @Column(nullable = false, length = 100)
  private String managerPwd;
}
