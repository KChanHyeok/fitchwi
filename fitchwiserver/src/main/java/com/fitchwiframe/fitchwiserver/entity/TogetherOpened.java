package com.fitchwiframe.fitchwiserver.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TogetherOpened {
  @Id
  private long togetherOpenCode=System.currentTimeMillis();

}
