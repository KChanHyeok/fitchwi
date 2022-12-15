package com.fitchwiframe.fitchwiserver.defaulttest;

import com.fitchwiframe.fitchwiserver.entity.Together;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;


public class test {
  @Test
  @DisplayName("디폴트 테스트123")
  public void test(){
    Together t = new Together();
    System.out.println("t = " + t);
    //assertThat(t.getTogetherPrice();
  }

}
