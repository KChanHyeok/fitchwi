package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherJoin;
import com.fitchwiframe.fitchwiserver.entity.TogetherOpened;
import com.fitchwiframe.fitchwiserver.entity.TogetherTag;
import com.fitchwiframe.fitchwiserver.service.TogetherService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

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

    @PostMapping("/insertTogetherJoinInfo")
    public String insertTogetherJoinInfo(@RequestBody TogetherJoin togetherJoin) {
        log.info("insertTogetherJoinInfo()");
        return togetherService.insertTogetherJoinInfo(togetherJoin);
    }

    @GetMapping("/getAllTogetherList")
    public Iterable<Together> getAllTogetherList() {
        return togetherService.getAllTogetherList();
    }

    @GetMapping("/getAllTogetherJoinList")
    public Iterable<TogetherJoin> getAllTogetherJoinList() {
        log.info("getAllTogetherJoinList");
        return togetherService.getAllTogetherJoinList();
    }

    @DeleteMapping("/deleteTogetherJoin")
    public String deleteTogetherJoin(@RequestParam String memberEmail, long togetherCode) {
        log.info("deleteTogetherJoin()");
        return togetherService.deleteTogetherJoin(memberEmail, togetherCode);
    }
    @PutMapping("/deleteTogetherState")
    public String deleteTogetherState(@RequestBody Together together) {
        log.info("전달받은 together"+ together);
        return togetherService.deleteTogetherState(together);
    }

    @GetMapping("/getTogetherListBySearch")
    public List<Together> getTogetherListBySearch(@RequestParam String searchText){
        log.info("getTogetherListBySearch()");
        return togetherService.getTogetherListBySearch(searchText);
    }


}
