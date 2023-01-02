package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

@Data
public class TokenDto {
    private String access_token;
    private long now;
    private long expired_at;
}
