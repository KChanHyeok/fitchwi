package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.FeedComment;
import com.fitchwiframe.fitchwiserver.service.FeedService;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@Log
public class FeedController {


    private final FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }
    @PostMapping("/insertfeed")
    public String insertFeed(@RequestPart(value = "data") Feed newFeed,
                             @RequestPart(value = "uploadImage", required = false) List<MultipartFile> files, HttpSession session ) {
        log.info("FileList : " + files);
        log.info("insertFeed()");
        return feedService.insertFeed(newFeed, files, session);
    }

    @GetMapping("/getAllFeedList")
    public List<Feed> getAllFeedList(){
        log.info("getAllFeedList()");
        System.out.println("feedService = " + feedService);
        return feedService.getAllFeedList();
    }

     // 피드 댓글 등록
    @PostMapping("/insertComment")
    public String insertComment(@RequestBody FeedComment feedComment){
        System.out.println("feedComment = " + feedComment);
        return feedService.insertComment(feedComment);
    }
}
