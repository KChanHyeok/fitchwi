package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Member;

import com.fitchwiframe.fitchwiserver.repository.MemberRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;


@Service
@Log
public class MemberService {
  @Autowired
private MemberRepository memberRepository;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


  //회원가입 - 이미지 기본 이름 추가 필요
  public String joinMember(Member newMember, MultipartFile pic, HttpSession session) {
    log.info("memberService.joinmember");
    String result = null;
    String cryptPwd = encoder.encode(newMember.getMemberPwd());
    newMember.setMemberPwd(cryptPwd);

    try {
      if (pic != null) {
        newMember = fileUpload(newMember, pic, session);
      } else {
        newMember.setMemberImg("이미지 원래 이름");
        newMember.setMemberSaveimg("저장된 기본이미지 이름");
      }

      memberRepository.save(newMember);
      log.info("가입 성공");
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
      log.info("가입 실패");
      result = "fail";
    }
    return result;
  }


  private Member fileUpload(Member member, MultipartFile pic,
                            HttpSession session)
      throws Exception {
    log.info("memberService.fileUpload()");

    String realPath = session.getServletContext().getRealPath("/");
    log.info("realPath : " + realPath);

    realPath += "images/";
    File folder = new File(realPath);
    if (folder.isDirectory() == false) {
      folder.mkdir();
    }

    String orname = pic.getOriginalFilename();

    member.setMemberImg(orname);

    String sysname = System.currentTimeMillis()
        + orname.substring(orname.lastIndexOf("."));
    member.setMemberSaveimg(sysname);

    File file = new File(realPath + sysname);

    pic.transferTo(file);


    return member;
  }


  //중복 확인
  public String checkDuplicatesMemberId(String userId) {
    log.info("memberService.checkDuplicatesMemberId");
    String result = "ok";
    try {
      memberRepository.findById(userId).get();
      log.info("불가");
      result = "fail";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }


  //로그인
  public String loginMember(Member inputMember) {
    String result = null;
    log.info("memberService.loginMember()");

    Member dbMember = null;
    try {
      dbMember = memberRepository.findById(inputMember.getMemberEmail()).get();
      if (encoder.matches(inputMember.getMemberPwd(), dbMember.getMemberPwd())) {
        dbMember.setMemberPwd("");
      } else {
        dbMember = null;
      }
    } catch (Exception e) {
      e.printStackTrace();
      dbMember = null;
    }
    return dbMember.getMemberEmail();

  }
}