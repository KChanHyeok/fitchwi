package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;

@Service
@Log
public class TogetherService {

    @Autowired
    TogetherOpenedRepository togetherOpenedRepository;

    @Autowired
    TogetherRepository togetherRepository;

    @Autowired
    TogetherTagRepository togetherTagRepository;

    @Autowired
    TogetherJoinRepository togetherJoinRepository;

    @Autowired
    MemberRepository memberRepository;

    public String addTogetherOpened(TogetherOpened togetherOpened, Together together, TogetherTag togetherTag, MultipartFile pic, HttpSession session) {
        String result = null;

        try {
            if (pic != null) {
                together = fileUpload(together, pic, session);
            }else {
                together.setTogetherImg("진짜 이미지이름");
                together.setTogetherSaveimg("저장된 이미지이름");
            }
        together.setTogetherState("결제대기중");
        together.setTogetherOpenedCode(togetherOpened);
        togetherTag.setTogetherCode(together);
        togetherOpenedRepository.save(togetherOpened);
        togetherRepository.save(together);
        togetherTagRepository.save(togetherTag);
        result = "성공";
        }catch (Exception e) {
            e.printStackTrace();
            result = "실패";
        }
        return result;
    }

    private Together fileUpload(Together together, MultipartFile pic, HttpSession session) throws Exception{

        String realPath = session.getServletContext().getRealPath("/");

        realPath +="images/";
        File folder = new File(realPath);
        if(folder.isDirectory() == false) {
            folder.mkdir();
        }
        String orname = pic.getOriginalFilename();

        together.setTogetherImg(orname);

        String sysname = System.currentTimeMillis()
                +orname.substring(orname.lastIndexOf("."));
        together.setTogetherSaveimg(sysname);

        File file = new File(realPath + sysname);

        pic.transferTo(file);

        return together;
    }
    public Iterable<Together> getAllTogetherList() {
        log.info("getAllTogetherList()");
        Iterable<Together> togetherList = togetherRepository.findAll();
        log.info(togetherList+"");
        return togetherList;
    }

    public String insertTogetherJoinInfo(TogetherJoin togetherJoin) {
        String result = null;
        try {
            if(togetherJoin.getTogetherCode().getTogetherType().equals("선착순")) {
                togetherJoin.setTogetherJoinState("가입중");
            }
            togetherJoinRepository.save(togetherJoin);

            result="성공";
        }catch (Exception e) {
            e.printStackTrace();
            result="실패";
        }

        return result;
    }

    public Iterable<TogetherJoin> getAllTogetherJoinList() {
        log.info("getAllTogetherJoinList()");
        Iterable<TogetherJoin> togetherJoinList = togetherJoinRepository.findAll();
        return togetherJoinList;
    }

    public String deleteTogetherJoin(String memberEmail, long togetherCode) {
        String result = null;
        try {
            Member loginMember = memberRepository.findById(memberEmail).get();
            Together joinTogether = togetherRepository.findById(togetherCode).get();

            TogetherJoin joinTogetherMember = togetherJoinRepository.findByMemberEmailAndTogetherCode(loginMember, joinTogether);
            togetherJoinRepository.delete(joinTogetherMember);
            result="삭제성공";
        }catch (Exception e) {
            e.printStackTrace();
            result="삭제실패";
        }

        return result;
    }

    public String deleteTogetherState(Together together) {
        String result = null;
        log.info("deleteTogetherState()");
        try{
            together.setTogetherState("삭제신청중");
            togetherRepository.save(together);
            result="성공";
        }catch (Exception e) {
            result="실패";
        }
        return result;
    }
}
