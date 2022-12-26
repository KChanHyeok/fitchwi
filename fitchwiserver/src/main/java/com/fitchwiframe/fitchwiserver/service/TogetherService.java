package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherJoin;
import com.fitchwiframe.fitchwiserver.entity.TogetherOpened;
import com.fitchwiframe.fitchwiserver.entity.TogetherTag;
import com.fitchwiframe.fitchwiserver.repository.TogetherJoinRepository;
import com.fitchwiframe.fitchwiserver.repository.TogetherOpenedRepository;
import com.fitchwiframe.fitchwiserver.repository.TogetherRepository;
import com.fitchwiframe.fitchwiserver.repository.TogetherTagRepository;
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

    public Together getTogetherInfo(long togetherPageCode) {
        log.info("getTogetherInfo()");
        Together togetherInfo;
        togetherInfo = togetherRepository.findById(togetherPageCode).get();

        return togetherInfo;
    }

    public String insertTogetherJoinInfo(TogetherJoin togetherJoin) {
        String result = null;
        try {
            togetherJoinRepository.save(togetherJoin);
            result="성공";
        }catch (Exception e) {
            e.printStackTrace();
            result="실패";
        }

        return result;
    }
}
