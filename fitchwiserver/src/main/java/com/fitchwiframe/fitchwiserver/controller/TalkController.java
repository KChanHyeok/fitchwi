package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
import com.fitchwiframe.fitchwiserver.service.TalkService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@RestController
@Log
//얘기해요 개설
public class TalkController {

    @Autowired
    private TalkService talkService;

    //얘기해요 개설
    @PostMapping("/addTalk")
    public String addTalk(@RequestPart(value = "data", required = true) Talk newTalk,
                          @RequestPart(value = "data", required = true) Member member,
                          @RequestPart(value = "data", required = true) TalkTag talkTag,
                          @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                          HttpSession session) {
        log.info("talkController.addTalk()");
        log.info("아이디 : " + member.getMemberName());
        log.info("얘기해요 명 : " + newTalk.getTalkTitle());
        log.info("최대 참여인원 : " + newTalk.getTalkMax());
        log.info("모임 카테고리 : " + newTalk.getTalkCategory());
        log.info("가입유형 : " + newTalk.getTalkType());
        log.info("사진 : " + pic);
        log.info("소개 말 : " + newTalk.getTalkContent());
        log.info("태그 : " + talkTag.getTalkTagContent());
        return talkService.addTalk(newTalk, pic, session);
    }
}
