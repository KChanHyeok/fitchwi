package com.fitchwiframe.fitchwiserver.dto;

import lombok.Data;

@Data
public class KaKaoLoginTokenDto {
  private String token_type;
  private String access_token;
  private String expires_in;
  private String refresh_token;
}
