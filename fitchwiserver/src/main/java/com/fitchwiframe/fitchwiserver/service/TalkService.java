package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@Log
public class TalkService {

    @Autowired
    private TalkRepository talkRepository;

    @Autowired
    private TalkOpenedRepository talkOpenedRepository;

    @Autowired
    private TalkTagRepository talkTagRepository;

    @Autowired
    private TalkJoinRepository talkJoinRepository;

    @Autowired
    private MemberRepository memberRepository;

    public String addTalk(Talk newTalk, TalkTag talkTag , MultipartFile pic, HttpSession session) {
        log.info("talkService.addTalk");
        String result = null;

        try {
            if (pic != null) {
                newTalk = talkFileUpload(newTalk, pic, session);
            } else {
                newTalk.setTalkImg("이미지 원래 이름");
                newTalk.setTalkSaveimg("저장된 기본이미지 이름");
            }
            talkTag.setTalkCode(newTalk); //talkCode 외래키 연결
            talkRepository.save(newTalk);
            talkTagRepository.save(talkTag); //얘기해요 태그값 DB 저장
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

    public Iterable<Talk> getAllTalkList() {
        log.info("talkService.getAllTalkList()");
        Iterable<Talk> talkList = talkRepository.findAll();
        return talkList;
    }

    public Talk getTalk(long talkCode) {
        log.info("talkService.getTalk()");
        Talk talkInfo;
        talkInfo = talkRepository.findById(talkCode).get();
        return talkInfo;
    }

    public String updateTalk(Talk talk, MultipartFile pic, HttpSession session) {
        log.info("talkService.updateTalk()");
        String result = null;


        try {
            if (pic != null) {
                talk = talkFileUpload(talk, pic, session);
            } else {
                talk.setTalkImg("이미지 원래 이름");
                talk.setTalkSaveimg("저장된 기본이미지 이름");
            }
//            Talk test = (Talk)session.getAttribute("talkCode");
//            Talk upTalk = talkRepository.findById(test.getTalkCode()).get();
//
//            upTalk.setTalkTitle(talk.getTalkTitle());
//            upTalk.setTalkMax(talk.getTalkMax());
//            upTalk.setTalkCategory(talk.getTalkCategory());
//            upTalk.setTalkContent(talk.getTalkContent());
//            talkRepository.save(upTalk);
//            session.setAttribute("talkCode", upTalk);

            talkRepository.save(talk);

            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    public String deleteTalk(Talk talk, TalkOpened talkOpened, TalkTag talkTag) {
        String result = null;

        try {
            talkRepository.deleteById(talk.getTalkCode());
            talkOpenedRepository.deleteById(talkOpened.getTalkOpenCode());
            talkTagRepository.deleteById(talkTag.getTalkTagCode());
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    public String insertTalkJoinInfo(TalkJoin talkJoin) {
        log.info("talkService.insertTalkJoinInfo()");
        String result = null;

        try {
            if (talkJoin.getTalkCode().getTalkType().equals("선착순")) {
                talkJoin.setTalkJoinState("가입중");
            }
            talkJoinRepository.save(talkJoin);
            result = "가입 신청 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "가입 실패";
        }
        return result;
    }

    public Iterable<TalkJoin> getTalkJoinList() {
        log.info("talkService.getTalkJoinList()");
        Iterable<TalkJoin> talkJoinList = talkJoinRepository.findAll();
        return talkJoinList;
    }

    public String deleteTalkJoinInfo(String memberEmail, long talkCode) {
        String result = null;

        try {
            Member loginMember = memberRepository.findById(memberEmail).get();
            Talk joinTalk = talkRepository.findById(talkCode).get();
            TalkJoin joinTalkMember =  talkJoinRepository.findByMemberEmailAndTalkCode(loginMember, joinTalk);
            talkJoinRepository.delete(joinTalkMember);
            result = "모임 탈퇴 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "모임 탈퇴 실패";
        }
        return result;
    }

    public List<Talk> getTalkListBySearch(String searchText) {
        log.info("getTalkListBySearch()");
        List<Talk> talkList = new ArrayList<>();

        String searchTag = "%"+searchText+"%";

        try {
            log.info("searchTag : " + searchTag);
            talkList = talkRepository.findByTalkTitleLike(searchTag);
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkList;
    }

}
