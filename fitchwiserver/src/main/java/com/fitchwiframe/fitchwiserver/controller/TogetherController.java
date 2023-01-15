package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.service.TogetherService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

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
    @PostMapping("/insertTogetherPay")
    public String insertTogetherPay(@RequestBody TogetherPayment togetherPayment) {
        log.info("insertTogetherPay()");
        log.info(togetherPayment+"내가 받은 결제 정보");
        return togetherService.insertTogetherPay(togetherPayment);
    }

    @PostMapping("/insertTogetherFreeJoinInfo")
    public String insertTogetherFreeJoinInfo(@RequestBody TogetherJoin togetherJoin) throws ParseException {
        log.info("insertTogetherFreeJoinInfo()");
        return togetherService.insertTogetherFreeJoinInfo(togetherJoin);
    }

    @PostMapping("/insertTogetherFreeInfo")
    public String insertTogetherFreeInfo(@RequestBody Together together) {
        log.info("insertTogetherFreeInfo()");
        return togetherService.insertTogetherFreeInfo(together);
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
    @DeleteMapping("/deleteTogether")
    public String deleteTogether(@RequestParam long togetherCode, HttpSession session){
        log.info("deleteTogether()");
        return togetherService.deleteTogether(togetherCode, session);
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

    @PutMapping("/refusalTogetherMemberState")
    public String refusalTogetherMemberState(@RequestBody TogetherJoin togetherJoin) {
        log.info("refusalTogetherMemberState()");
        return togetherService.refusalTogetherMemberState(togetherJoin);
    }

    @GetMapping("/getTogetherJoinListByMember")
    public List<TogetherJoin> getTogetherJoinListByMember(@RequestParam String memberEmail){
        log.info("getTogetherJoinListByMember()");
        return togetherService.getTogetherJoinListByMember(memberEmail);
    }

    @GetMapping("/getMemberTogether")
    public Map<String, Object> getMemberTogether(@RequestParam String memberEmail){
        log.info("getMemberTogether()");
        return togetherService.getMemberTogether(memberEmail);
    }


    @GetMapping("/getTogetherCancelRequestList")
    public Map<String, Object>getTogetherCancelRequestList(@RequestParam Integer pageNum, @RequestParam String togetherTitle) {
        log.info("TogetherController.getTogetherCancelRequestList");
        return togetherService.getTogetherCancelRequestList(pageNum,togetherTitle);
    }

    @GetMapping("/getAllTogetherTag")
    public Iterable<TogetherTag> getAllTogetherTag() {
        log.info("getAllTogetherTag()");
        return togetherService.getAllTogetherTag();
    }
}
