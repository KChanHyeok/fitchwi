package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.*;

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
                             @RequestPart(value = "uploadImage", required = false) List<MultipartFile> files, HttpSession session) {
        log.info("newFeed : "+ newFeed);
        log.info("FileList : " + files);
        log.info("insertFeed()");
        return feedService.insertFeed(newFeed,files,session);
    }

    @GetMapping("/getAllFeedList")
    public List<Feed> getAllFeedList(){
        log.info("getAllFeedList()");
        System.out.println("feedService = " + feedService);
        return feedService.getAllFeedList();
    }

    @GetMapping("/getFeedList")
    private List<Feed> getFeedList(@RequestParam Integer page, String category, HttpSession session){
        log.info("getFeedList()");
        return feedService.getFeedList(page, category, session);
    }

    @GetMapping("/getFeedListTillPage")
    private List<Feed> getFeedListTillPage(@RequestParam Integer page, String category, HttpSession session){
        log.info("getFeedListTillPage()");
        return feedService.getFeedListTillPage(page, category, session);
    }


    //멤버가 작성한 피드 조회
    @GetMapping("/getMemberFeed")
    private List<Feed>getMemberFeed(@RequestParam String memberEmail){
        log.info("memberController.getMemberFeed");
        return feedService.getMemberFeed(memberEmail);
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
    // 피드 수정
    @PostMapping("/updateFeed")
    private String updateFeed(@RequestPart(value = "data") Feed newFeed){
        log.info("updateFeed()");
        log.info("newFeed : "+ newFeed);
        return feedService.updateFeed(newFeed);
    }

    // 피드 삭제
    @DeleteMapping("/deleteFeed")
    private String deleteFeed(@RequestBody Feed feed, HttpSession session){
        log.info("deleteFeed()");
        return feedService.deleteFeed(feed, session);
    }

    @DeleteMapping("/deleteComment")
    private String deleteComment(@RequestBody FeedComment data){
        log.info("deleteComment()");
        return feedService.deleteComment(data);
    }

    @GetMapping("/getTagList")
    private List<Tag> getTagList(){
        log.info("getTagList()");
        return feedService.getTagList();
    }

    @GetMapping("/insertTag")
    private String insertTag(@RequestParam String tag){
        log.info("insertTag()");
        return feedService.insertTag(tag);
    }

    @GetMapping("/getFeedListBySearch")
    private List<Feed> getFeedListBySearch(@RequestParam String searchText){
        log.info("getFeedListBySearch()");
        return feedService.getFeedListBySearch(searchText);
    }

    @GetMapping("/getFeedInfo")
    private Feed getFeedInfo(@RequestParam Long feedCode){
        log.info("getFeedInfo()");
        return feedService.getFeedInfo(feedCode);
    }

    @GetMapping("/getFeedListOrderByMember")
    private List<Member> getFeedListOrderByMember(){
        log.info("getFeedListOrderByMember()");
        return feedService.getFeedListOrderByMember();
    }

}
