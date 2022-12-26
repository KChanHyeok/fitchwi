package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherOpened;
import com.fitchwiframe.fitchwiserver.entity.TogetherTag;
import com.fitchwiframe.fitchwiserver.service.TogetherService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@RestController
@Log
public class TogetherController {

    @Autowired
    TogetherService togetherService;

    @PostMapping("/addTogether")
    public String addTogether(@RequestPart(value = "data", required = false)TogetherOpened togetherOpened,
                              @RequestPart(value = "data", required = false)Together together,
                              @RequestPart(value = "data",required = false)TogetherTag togetherTag,
                              @RequestPart(value = "uploadImage")MultipartFile pic,
                              HttpSession session) {

        log.info("addTogether()");
        log.info("togetherOpened 오픈 개설"+ togetherOpened);
        log.info("together"+ together);
        log.info("TogetherTag"+ togetherTag);
        log.info("MultipartFile"+ pic);

        return togetherService.addTogetherOpened(togetherOpened, together, togetherTag, pic,session);
    }
    @GetMapping("/getAllTogetherList")
    public Iterable<Together> getAllTogetherList() {
        return togetherService.getAllTogetherList();
    }

    @GetMapping("/getTogetherInfo")
    public Together getTogetherInfo(long togetherPageCode) {
        log.info("getTogetherInfo()");
        return togetherService.getTogetherInfo(togetherPageCode);
    }


}
