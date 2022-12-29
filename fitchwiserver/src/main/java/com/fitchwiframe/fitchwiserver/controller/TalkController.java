package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkJoin;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
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
    @GetMapping("/updateTalk")
    public String updateTalk(Talk talk, MultipartFile pic, HttpSession session) {
        log.info("talkController.updateTalk()");
        return talkService.updateTalk(talk, pic, session);
    }

    //얘기해요 삭제
    @DeleteMapping("/deleteTalk")
    public String deleteTalk(@RequestBody Talk talk,
                             @RequestBody TalkOpened talkOpened,
                             @RequestBody TalkTag talkTag) {
        log.info("talkController.deleteTalk()");
        return talkService.deleteTalk(talk, talkOpened, talkTag);
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
}
