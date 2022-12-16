package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.service.FeedService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@RestController
@Log
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostMapping("/insertfeed")
    public String insertFeed(@RequestPart(value = "data", required = true) Feed newFeed,
                             @RequestPart(value = "uploadImage", required = false) MultipartFile pic, HttpSession session){
        log.info("insertFeed()");
        return feedService.insertFeed(newFeed, pic, session);
    }
}
