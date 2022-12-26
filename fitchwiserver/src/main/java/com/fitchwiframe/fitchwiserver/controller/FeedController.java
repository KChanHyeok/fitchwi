package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.FeedFile;
import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.FeedComment;

import com.fitchwiframe.fitchwiserver.service.FeedService;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

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
        log.info("newFeed : "+ newFeed);
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

    //멤버가 작성한 피드 조회
    @PostMapping("/getMemberFeed")
    private List<Feed>getMemberFeed(@RequestBody Member member){
        log.info("memberController.getMemberFeed");
        return feedService.getMemberFeed(member);
    }

     // 피드 댓글 등록
    @PostMapping("/insertComment")
    public String insertComment(@RequestBody FeedComment feedComment){
        System.out.println("feedComment = " + feedComment);
        return feedService.insertComment(feedComment);
    }

    // 피드 좋아요 하기
    @GetMapping("/likeFeed")
    private String likeFeed(@RequestParam Long feedCode, String memberInfo){
        log.info("feedCode : "+ feedCode);
        log.info("memberInfo : "+ memberInfo);

        log.info("likeFeed()");
        return feedService.likeFeed(feedCode, memberInfo);
    }

    // 피드 좋아요 취소하기
    @DeleteMapping("/dLikeFeed")
    private String dLikeFeed(@RequestParam Long feedCode, String memberInfo){
        log.info("dLikeFeed()");
        return feedService.dLikeFeed(feedCode, memberInfo);
    }
}
