package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.*;
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

    @PostMapping("/insertTogetherPayJoinInfo")
    public String insertTogetherPayJoinInfo(@RequestBody TogetherJoinPayment togetherJoinPayment) {
        log.info("insertTogetherJoinInfo()");
        log.info("전달 받은 데이터"+togetherJoinPayment.getTogetherJoinCode());
        log.info("전달 받은 데이터"+togetherJoinPayment);
        return togetherService.insertTogetherPayJoinInfo(togetherJoinPayment);
    }

    @PostMapping("/insertTogetherFreeJoinInfo")
    public String insertTogetherFreeJoinInfo(@RequestBody TogetherJoin togetherJoin) {
        log.info("insertTogetherFreeJoinInfo()");
        return togetherService.insertTogetherFreeJoinInfo(togetherJoin);
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
    @GetMapping("/getTogetherListBySearch")
    public List<Together> getTogetherListBySearch(@RequestParam String searchText){
        log.info("getTogetherListBySearch()");
        return togetherService.getTogetherListBySearch(searchText);
    }

    @DeleteMapping("/deleteTogetherPayJoinInfo")
    public String deleteTogetherPayJoinInfo(@RequestParam String memberEmail, long togetherCode) {
        log.info("deleteTogetherPayJoinInfo()");
        return togetherService.deleteTogetherPayJoinInfo(memberEmail, togetherCode);
    }

    @DeleteMapping("/deleteTogetherFreeJoinInfo")
    public String deleteTogetherFreeJoinInfo(@RequestParam String memberEmail, long togetherCode) {
        log.info("deleteTogetherFreeJoinInfo()");
        return togetherService.deleteTogetherFreeJoinInfo(memberEmail, togetherCode);
    }

    @PutMapping("/deleteTogetherState")
    public String deleteTogetherState(@RequestBody Together together) {
        log.info("전달받은 together"+ together);
        return togetherService.deleteTogetherState(together);
    }
    @PutMapping("/approvalTogetherMemberState")
    public String approvalTogetherMemberState(@RequestBody TogetherJoin togetherJoin) {
        log.info("approvalTogetherMemberState()");
        return togetherService.approvalTogetherMemberState(togetherJoin);
    }



}
