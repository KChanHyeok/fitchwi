package com.fitchwiframe.fitchwiserver.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitchwiframe.fitchwiserver.dto.KakaoProfile;
import com.fitchwiframe.fitchwiserver.entity.Follow;
import com.fitchwiframe.fitchwiserver.entity.Member;

import com.fitchwiframe.fitchwiserver.repository.FollowRepository;
import com.fitchwiframe.fitchwiserver.repository.MemberRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;


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
    System.out.println("pic = " + pic);
    String result = null;
    String cryptPwd = encoder.encode(newMember.getMemberPwd());
    newMember.setMemberPwd(cryptPwd);

    try {
      if (pic != null) {
        fileUpload(newMember, pic, session);
      } else {
        newMember.setMemberImg("DefaultProfileImage.jpg");
        newMember.setMemberSaveimg("DefaultProfileImageSystemName.jpg");
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


  private void fileUpload(Member member, MultipartFile pic,
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
  public Map<String, Object> loginMember(Member inputMember) {
    log.info("memberService.loginMember()");

    Map<String, Object> result = new HashMap<>();

    Member dbMember = null;
    try {
      dbMember = memberRepository.findById(inputMember.getMemberEmail()).orElseGet(Member::new);
      if (dbMember.getMemberRestriction() != null) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date today = new Date();
        Date restriction = dateFormat.parse(dbMember.getMemberRestriction());

        if (restriction.compareTo(today) > 0) {
          result.put("state", "reported");
          result.put("memberRestriction", dbMember.getMemberRestriction());
        } else {
          result.put("state", "released");
          result.put("memberRestriction", dbMember.getMemberRestriction());

          dbMember.setMemberRestriction(null);
          memberRepository.save(dbMember);
        }
        return result;

      }
      if (dbMember.getMemberEmail() != null) {
        if (encoder.matches(inputMember.getMemberPwd(), dbMember.getMemberPwd())) {
          result.put("state", "ok");
          result.put("memberEmail",  dbMember.getMemberEmail());
          result.put("memberNickname", dbMember.getMemberNickname());

        } else {
          result.put("state", "wrong pwd");
        }
      } else {
        result.put("state","no data");
      }
    } catch (Exception e) {
      e.printStackTrace();

    }
    return result;

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
    if (filsSysname.equals("DefaultProfileImageSystemName.jpg")) {
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

  public String followMember(String loginId, String pageOwner) {
    log.info("memberService.followMember");
    Follow follow = new Follow();


    follow.setFollowId(pageOwner);
    String result = "fail";
    try {
      Member loginMember = memberRepository.findById(loginId).get();
      follow.setMemberEmail(loginMember);
      followRepository.save(follow);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;

  }

  public String unFollowMember(String loginId, String pageOwner) {
    String result = "fail";
    try {
      Member loginMember = memberRepository.findById(loginId).get();

      Follow follow = followRepository.findByMemberEmailAndFollowId(loginMember, pageOwner);
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
    for (Follow follow : followList) {
      Member member1 = memberRepository.findById(follow.getFollowId()).get();
      followMemberList.add(member1);
    }

    return extractMemberData(followMemberList);

  }

  //나를 팔로우
  public List<Member> getFollowerList(String pageOwner) {
    log.info("memberService.getFollowerList");

    List<Follow> followerList = followRepository.findAllByFollowId(pageOwner);
    List<Member> followerMemberList = new ArrayList<>();
    for (Follow follow : followerList) {
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

  public String createMember() {
    String result = null;
    try {
      for (int i = 0; i <= 10; i++) {
        Member member = new Member();
        member.setMemberName("테스트이름" + i);
        member.setMemberEmail("test" + i + "@test.com");
        member.setMemberNickname("테스트닉네임" + i);
        member.setMemberGender("남");
        member.setMemberInterest("운동∙액티비티 성장∙자기계발");
        member.setMemberBirth("2022-12-26");
        String cryptPwd = encoder.encode("0000");
        member.setMemberPwd(cryptPwd);
        member.setMemberImg("DefaultProfileImage.jpg");
        member.setMemberSaveimg("DefaultProfileImageSystemName.jpg");
        member.setMemberMbti("ISFP");
        member.setMemberAddr("경기도 시흥시");
        member.setMemberPhone("000-0000-0000");
        memberRepository.save(member);
        result = "ok";
      }
    } catch (Exception e) {
      e.printStackTrace();
      result = "fail";
    }
    return result;
  }

  public String checkPwd(Member memberToCheck) {
    log.info("memberService.checkPwd()");
    String result = "";
    Member dbMember = memberRepository.findById(memberToCheck.getMemberEmail()).get();


    try {
      if (encoder.matches(memberToCheck.getMemberPwd(), dbMember.getMemberPwd())) {
        result = "ok";
      } else {
        result = "fail";
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  public String updateMemberInfo(Member memberToUpdate, MultipartFile pic, HttpSession session) {
    log.info("memberService.updateMemberInfo();");
    String result = "fail";
    System.out.println("memberToUpdate = " + memberToUpdate);
    System.out.println("pic = " + pic);

    //새 비밀번호 입력
    if (!memberToUpdate.getMemberPwd().equals("")) {
      String cryptPwd = encoder.encode(memberToUpdate.getMemberPwd());
      memberToUpdate.setMemberPwd(cryptPwd);
      //기존 비밀번호 사용
    } else {
      memberToUpdate.setMemberPwd(memberRepository.findById(memberToUpdate.getMemberEmail()).get().getMemberPwd());
    }
    try {
      //기본 이미지 사용
      if (pic == null) {
        if (memberToUpdate.getMemberImg().equals("")) {
          deleteFile(memberToUpdate.getMemberSaveimg(), session);
          memberToUpdate.setMemberImg("DefaultProfileImage.jpg");
          memberToUpdate.setMemberSaveimg("DefaultProfileImageSystemName.jpg");
        }
      } else {//새이미지사용
        deleteFile(memberToUpdate.getMemberSaveimg(), session);
        fileUpload(memberToUpdate, pic, session);
      }
      memberRepository.save(memberToUpdate);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }

    return result;
  }


  public String getToken(String code) {


    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("grant_type", "authorization_code");
    body.add("client_id", "bad1b060092a0ed86a3dfe34c2fb99f9");
    body.add("redirect_uri", "http://localhost:3000/login/kakao/callback");
    body.add("code", code);


    HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(body, httpHeaders);
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.exchange("https://kauth.kakao.com//oauth/token", HttpMethod.POST, tokenRequest, String.class);
    System.out.println("response = " + response);
    String accessToken = null;
    try {
      String responseBody = response.getBody();
      ObjectMapper objectMapper = new ObjectMapper();


      accessToken = objectMapper.readTree(responseBody).get("access_token").asText();

    } catch (Exception e) {
      e.printStackTrace();
    }


    return accessToken;

  }


  public JsonNode getMemberInfoFromKaKao(String accessToken) {


    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    httpHeaders.add("Authorization", "Bearer " + accessToken);


    HttpEntity<MultiValueMap<String, String>> infoRequest = new HttpEntity<>(httpHeaders);
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.exchange("https://kapi.kakao.com//v2/user/me", HttpMethod.POST, infoRequest, String.class);
    JsonNode jsonNode = null;
    try {
      String responseBody = response.getBody();
      ObjectMapper objectMapper = new ObjectMapper();
      jsonNode = objectMapper.readTree(responseBody);

    } catch (Exception e) {
      e.printStackTrace();
    }

    return jsonNode;
  }

  public Map<String, Object> registerOrLogin(String code) {
    Map<String, Object> resultMap = new HashMap<>();
    JsonNode jsonNode = null;
    KakaoProfile kakaoProfile = null;
    try {
      jsonNode = getMemberInfoFromKaKao(getToken(code));

      ObjectMapper objectMapper = new ObjectMapper();
      kakaoProfile = objectMapper.treeToValue(jsonNode, KakaoProfile.class);


    } catch (Exception e) {
      e.printStackTrace();

      resultMap.put("isPresent", "fail");
      resultMap.put("member", new Member());
      return resultMap;

    }


    Member member = new Member();
    String memberEmail = kakaoProfile.getKakao_account().getEmail();


    Optional<Member> dbMember = memberRepository.findById(memberEmail);
    if (dbMember.isPresent()) {
      resultMap.put("isPresent", "ok");
      resultMap.put("member", dbMember);
      return resultMap;
    }

    member.setMemberEmail(kakaoProfile.getKakao_account().getEmail());
    member.setMemberNickname(kakaoProfile.getProperties().getNickname());
    member.setMemberImg(kakaoProfile.getProperties().getProfile_image());
    member.setMemberSaveimg(kakaoProfile.getProperties().getProfile_image());
    resultMap.put("isPresent", "no");
    resultMap.put("member", member);
    return resultMap;

  }

}
