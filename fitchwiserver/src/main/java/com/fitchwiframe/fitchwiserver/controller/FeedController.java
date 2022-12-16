package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log
public class FeedController {

    @PostMapping("insertFeed")
    public String insertFeed(@RequestBody Feed feedInfo){
        log.info("insertFeed()");
        log.info(feedInfo.toString());
        return "객체 전송 완료";
    }
}
