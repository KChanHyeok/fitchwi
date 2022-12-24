package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Follow;
import com.fitchwiframe.fitchwiserver.entity.Member;

import com.fitchwiframe.fitchwiserver.repository.FollowRepository;
import com.fitchwiframe.fitchwiserver.repository.MemberRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;


@Service
@Log
public class MemberService {
  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private FollowRepository followRepository;

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
      dbMember = memberRepository.findById(inputMember.getMemberEmail()).orElseGet(Member::new);
      if (encoder.matches(inputMember.getMemberPwd(), dbMember.getMemberPwd())) {
        dbMember.setMemberPwd("");
      } else {
        dbMember.setMemberEmail("");
      }
    } catch (Exception e) {
      e.printStackTrace();
      dbMember.setMemberEmail("");
    }
    return dbMember.getMemberEmail();

  }
  //회원 정보 수정


  public Member getMemberInfo(String userId) {
    log.info("memberService.getMemberInfo()");
    Member findMember = null;
    try {
      findMember = memberRepository.findById(userId).get();
      findMember.setMemberPwd("");
    } catch (Exception e) {
      e.printStackTrace();
    }
    return findMember;
  }

  //회원 탈퇴
  public String deleteMemberInfo(Member member, HttpSession session) {
    String result = "fail";
    try {
      //얘기해요 함께해요 관련 처리 추가 필요함
      deleteFile(member.getMemberSaveimg(), session);
      memberRepository.deleteById(member.getMemberEmail());
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }

    return result;
  }


  //회원 탈퇴시 이미지 삭제
  private void deleteFile(String filsSysname, HttpSession session) {
    if (filsSysname.equals("기본이미지로 저장된 이름")) {
      return;
    }
    String realPath = session.getServletContext().getRealPath("/");

    realPath += "images/";

    File fileToDelete = new File(realPath + filsSysname);


    if (fileToDelete.exists()) {
      if (fileToDelete.delete()) {
        log.info("파일 삭제 성공");
      } else {
        log.info("파일을 삭제하였습니다.");
      }
    } else {
      log.info("파일이 존재하지 않습니다.");
    }
  }

  public String followMember(Member member, String pageOwner) {
    log.info("memberService.followMember");
    Follow follow = new Follow();

    follow.setMemberEmail(memberRepository.findById(member.getMemberEmail()).get());
    follow.setFollowId(pageOwner);
    String result = "fail";
    try {
      followRepository.save(follow);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;

  }

  public String unFollowMember(Member member, String pageOwner) {
    String result = "fail";
    try {
      Follow follow = followRepository.findByMemberEmailAndFollowId(member, pageOwner);
      followRepository.delete(follow);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;

  }
  //내가 팔로우
  public List<Member> getFollowingList(String pageOwner) {
    log.info("memberService.getFollowingList");
    Member member = memberRepository.findById(pageOwner).get();

    List<Follow> followList = followRepository.findAllByMemberEmail(member);

    List<Member> followMemberList = new ArrayList<>();
    for(Follow follow : followList){
      Member member1 = memberRepository.findById(follow.getFollowId()).get();
      followMemberList.add(member1);
    }

    return extractMemberData(followMemberList);

  }
//나를 팔로우
  public List<Member> getFollowerList(String pageOwner) {
    log.info("memberService.getFollowerList");
//    Member member = memberRepository.findById(pageOwner).get();

    List<Follow> followerList = followRepository.findAllByFollowId(pageOwner);
    List<Member> followerMemberList = new ArrayList<>();
    for(Follow follow : followerList){
      Member member1 = memberRepository.findById(follow.getMemberEmail().getMemberEmail()).get();
      followerMemberList.add(member1);
    }
    return extractMemberData(followerMemberList);
  }

  private List<Member> extractMemberData(List<Member> memberList) {
   List<Member> memberListForReturn = new ArrayList<>();

    if (memberList != null) {

      for (Member member : memberList) {
        System.out.println("member = " + member);
        member.setMemberPwd("");
        member.setMemberBirth("");
        member.setMemberPhone("");
        member.setMemberAddr("");
        memberListForReturn.add(member);
      }
    }


    return memberListForReturn;
  }
}
