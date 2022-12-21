package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
import com.fitchwiframe.fitchwiserver.repository.TalkOpenedRepository;
import com.fitchwiframe.fitchwiserver.repository.TalkRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;

@Service
@Log
public class TalkService {

    @Autowired
    private TalkRepository talkRepository;

    @Autowired
    private TalkOpenedRepository talkOpenedRepository;

    public String addTalk(Talk newTalk, MultipartFile pic, HttpSession session) {
        log.info("talkService.addTalk");
        String result = null;

        try {
            if (pic != null) {
                newTalk = talkFileUpload(newTalk, pic, session);
            } else {
                newTalk.setTalkImg("이미지 원래 이름");
                newTalk.setTalkSaveimg("저장된 기본이미지 이름");
            }

            talkRepository.save(newTalk);
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    private Talk talkFileUpload(Talk talk, MultipartFile pic, HttpSession session)
            throws Exception {
        log.info("talkService.talkFileUpload()");
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);

        realPath += "images/";
        File folder = new File(realPath);
        if (!folder.isDirectory()){
            folder.mkdir();
        }

        String orname = pic.getOriginalFilename();
        talk.setTalkImg(orname);
        String sysname = System.currentTimeMillis()
                + orname.substring(orname.lastIndexOf("."));
        talk.setTalkSaveimg(sysname);
        File file = new File(realPath + sysname);
        pic.transferTo(file);

        return talk;
    }

    //개설 코드 값 저장
    public void addTalkOpened(TalkOpened talkOpened, Talk newTalk) {
        log.info("talkService.addTalkOpened()");
        talkOpenedRepository.save(talkOpened);
        newTalk.setTalkOpenCode(talkOpened);
    }

    //얘기해요 태그 값 저장
//    public void addTalkTag(TalkTag talkTag, Talk newTalk) {
//        log.info("talkService.addTalkTag()");
//        talkRepository.save(newTalk);
//        talkTag.setTalkCode(newTalk);
//        log.info("setTalkCode : " + talkTag);
//    }
}