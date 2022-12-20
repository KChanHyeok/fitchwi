package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
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
                          @RequestPart(value = "data", required = true)TalkOpened talkOpened,
                          @RequestPart(value = "data", required = true)TalkTag talkTag,
                          @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                          HttpSession session) {
        log.info("태그 : " + talkTag.getTalkTagContent());
        log.info("태그테이블 얘기해요 코드 : " + talkTag.getTalkCode());
        log.info("애기해요 코드 : " + newTalk.getTalkCode());
        log.info("얘기해요 개설 코드 : " + talkOpened.getTalkOpenCode( ));
        talkService.addTalkOpened(talkOpened, newTalk);
        log.info("애기해요 개설 코드2 : " + newTalk.getTalkOpenCode());
        return talkService.addTalk(newTalk , talkOpened , pic, session);
    }
}
