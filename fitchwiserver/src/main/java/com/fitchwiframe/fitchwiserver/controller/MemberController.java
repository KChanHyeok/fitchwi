package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.service.MemberService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@RestController
@Log
public class MemberController {

  @Autowired
  private MemberService memberService;

  //회원가입 - 관심사 배열 처리 필요.
  @PostMapping("/joinmember")
  private String joinMember(@RequestPart(value = "data", required = true) Member newMember,
                            @RequestPart(value = "uploadImage", required = false) MultipartFile pic,
                            HttpSession session) {
    log.info("memberController.joinMember()");
    log.info("pic" + pic);

    return memberService.joinMember(newMember, pic, session);
  }

  //중복확인
  @GetMapping("/checkduplicatesmemberId")
  //나중에 이름 변경 필요
  private String checkDuplicatesMemberId(@RequestParam String userId) {
    log.info("memberController.checkDuplicatesMemberId()");
    return memberService.checkDuplicatesMemberId(userId);
  }

  //로그인
  @PostMapping("/loginmember")
  private String loginMember(@RequestBody Member member) {
    log.info("memberController.loginMember()");
    return memberService.loginMember(member);
  }
}
