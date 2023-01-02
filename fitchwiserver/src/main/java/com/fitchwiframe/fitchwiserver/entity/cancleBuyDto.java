package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
@Data
public class cancleBuyDto {
    private String code;
    private String message;
    private Map response=new HashMap();

}
