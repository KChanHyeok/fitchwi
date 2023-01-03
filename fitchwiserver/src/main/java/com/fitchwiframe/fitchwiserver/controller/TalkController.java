package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.service.TalkService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@Log
//얘기해요 개설
public class TalkController {

    @Autowired
    private TalkService talkService;

    //얘기해요 개설
    @PostMapping("/addTalk")
    public String addTalk(@RequestPart(value = "data", required = true) Talk newTalk,
                          @RequestPart(value = "data", required = true)TalkOpened talkOpened,
                          @RequestPart(value = "data", required = true)TalkTag talkTag,
                          @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                          HttpSession session) {
        log.info("talkController.addTalk()");
        talkService.addTalkOpened(talkOpened, newTalk);
        return talkService.addTalk(newTalk, talkTag, pic, session);
    }

    //얘기해요 전체 조회
    @GetMapping("/getAllTalkList")
    public Iterable<Talk> getAllTalkList() {
        log.info("talkController.getAllTalkList()");
        return talkService.getAllTalkList();
    }

    //해당 얘기해요 상세보기
    @GetMapping("/getTalk")
    public Talk getTalk(long talkCode) {
        log.info("talkController.getTalk()");
        return talkService.getTalk(talkCode);
    }

    //얘기해요 수정
    @PostMapping("/updateTalk")
    public String updateTalk(@RequestPart(value = "data", required = true) Talk talk,
                             @RequestPart(value = "data", required = true)TalkTag talkTag,
                             @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                             HttpSession session) {
        log.info("talkController.updateTalk()");
        return talkService.updateTalk(talk, talkTag, pic, session);
    }

    //얘기해요 삭제
    @DeleteMapping("/deleteTalk")
    public String deleteTalk(@RequestBody Talk talk, HttpSession session) {
        log.info("talkController.deleteTalk()");
        return talkService.deleteTalk(talk, session);
    }

    //얘기해요 가입
    @PostMapping("/insertTalkJoinInfo")
    public String insertTalkJoinInfo(@RequestBody TalkJoin talkJoin) {
        log.info("talkController.insertTalkJoinInfo()");
        return talkService.insertTalkJoinInfo(talkJoin);
    }

    //가입 데이터 조회
    @GetMapping("/getTalkJoinList")
    public Iterable<TalkJoin> getTalkJoinList() {
        log.info("talkController.getTalkJoinList()");
        return talkService.getTalkJoinList();
    }

    //가입 데이터 삭제
    @DeleteMapping("/deleteTalkJoinInfo")
    public String deleteTalkJoinInfo(@RequestParam String memberEmail, long talkCode) {
        log.info("talkController.deleteTalkJoinInfo()");
        return talkService.deleteTalkJoinInfo(memberEmail, talkCode);
    }

    @GetMapping("/approveMember")
    public String approveMember(@RequestBody TalkJoin talkJoin) {
        log.info("talkController.approveMember()");
        return talkService.approveMember(talkJoin);
    }

    @GetMapping("/getTalkListBySearch")
    public List<Talk> getTalkListBySearch(@RequestParam String searchText){
        log.info("getTalkListBySearch()");
        return talkService.getTalkListBySearch(searchText);
    }

    @GetMapping("/getTalkJoinListByMember")
    public List<TalkJoin> getTalkJoinListByMember(@RequestParam String memberEmail){
        log.info("getTalkJoinListByMember()");
        return talkService.getTalkJoinListByMember(memberEmail);
    }
}
