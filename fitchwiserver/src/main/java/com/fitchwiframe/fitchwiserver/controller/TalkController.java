package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log
//얘기해요 개설
public class TalkController {
    @PostMapping("addTalk")
    public String addTalk(@RequestBody Talk talkInfo){
        log.info("addTalk()");
        return "addTalk";
    }
}
