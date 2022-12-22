package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
import com.fitchwiframe.fitchwiserver.service.TalkService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
                          @RequestPart(value = "data", required = true)TalkOpened talkOpened,
                          @RequestPart(value = "data", required = true)TalkTag talkTag,
                          @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                          HttpSession session) {
        log.info("talkController.addTalk()");
        talkService.addTalkOpened(talkOpened, newTalk);
//        talkService.addTalkTag(talkTag, newTalk);
        log.info("talk : " + talkTag.getTalkTagCode());
        log.info("talk 태그 외래키 코드 : " + talkTag.getTalkCode());
        log.info("talk 태그 : " + talkTag.getTalkTagContent());
        return talkService.addTalk(newTalk, pic, session);
    }

    //해당 얘기해요 상세보기
//    @GetMapping("/getTalk")
//    public Talk getTalk(@RequestParam long talkCode) {
//        log.info("talkController.getTalk()");
//        log.info("getTalk() talkCode : " + talkCode);
//        return talkService.getTalk(talkCode);
//    }
}
