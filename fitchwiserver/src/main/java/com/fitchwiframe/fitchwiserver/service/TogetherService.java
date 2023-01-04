package com.fitchwiframe.fitchwiserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

import java.util.ArrayList;
import java.util.List;


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
    TogetherJoinPayRepository togetherJoinPayRepository;

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

    public String insertTogetherPayJoinInfo(TogetherJoinPayment togetherJoinPayment) {
        String result = null;
        try {
            if(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherType().equals("선착순")) {
                togetherJoinPayment.getTogetherJoinCode().setTogetherJoinState("가입중");
            }
            togetherJoinRepository.save(togetherJoinPayment.getTogetherJoinCode());

            togetherJoinPayment.setTogetherJoinCode(togetherJoinRepository.findById(togetherJoinPayment.getTogetherJoinCode().getTogetherJoinCode()).get());
            togetherJoinPayment.setTogetherJoinPayStatus("결제완료");
            togetherJoinPayRepository.save(togetherJoinPayment);

            result="성공";
        }catch (Exception e) {
            e.printStackTrace();
            result="실패";
        }

        return result;
    }

    public String insertTogetherFreeJoinInfo(TogetherJoin togetherJoin) {
        String result = null;
        log.info("insertTogetherFreeJoinInfo()");
        try {
            if(togetherJoin.getTogetherCode().getTogetherType().equals("선착순")) {
                togetherJoin.setTogetherJoinState("가입중");
            }
            togetherJoinRepository.save(togetherJoin);
            result = "가입성공";
        }catch (Exception e) {
            result = "가입실패";
        }
        return result;
    }

    public Iterable<TogetherJoin> getAllTogetherJoinList() {
        log.info("getAllTogetherJoinList()");
        Iterable<TogetherJoin> togetherJoinList = togetherJoinRepository.findAll();
        return togetherJoinList;
    }

    public String deleteTogetherFreeJoinInfo(String memberEmail, long togetherCode) {
        String result = null;
        try {
            Member loginMember = memberRepository.findById(memberEmail).get();
            Together joinTogether = togetherRepository.findById(togetherCode).get();

            TogetherJoin joinTogetherMember = togetherJoinRepository.findByMemberEmailAndTogetherCode(loginMember, joinTogether);

            togetherJoinRepository.delete(joinTogetherMember);
            result = "취소성공";
        }catch (Exception e) {
            result = "취소 실패";
        }



        return result;
    }


    public String deleteTogetherPayJoinInfo(String memberEmail, long togetherCode) {
        String result = null;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String,String> body = new HashMap<>();
            body.put("imp_key", "5177641603268324");
            body.put("imp_secret", "8ECw03mlg2rRO9qJmHaWsQIiWGQDakmEkO9WvMaGV29EY01MWWt2AlQXr6A3Gu0VIEtFSMfVQaAReVf1");
        try {
            HttpEntity<Map> tokenEntity = new HttpEntity<>(body,headers);
            ResponseEntity<Map> token = restTemplate.postForEntity("https://api.iamport.kr/users/getToken",tokenEntity,Map.class);

            ObjectMapper mapper = new ObjectMapper();
            TokenDto tokenDto = mapper.convertValue(token.getBody().get("response"), TokenDto.class);

            try {
                if(tokenDto.getAccess_token().equals("")){
                    throw new Exception();
                }
                Member loginMember = memberRepository.findById(memberEmail).get();
                Together joinTogether = togetherRepository.findById(togetherCode).get();

                TogetherJoin joinTogetherMember = togetherJoinRepository.findByMemberEmailAndTogetherCode(loginMember, joinTogether);


                TogetherJoinPayment togetherJoinPayment = togetherJoinPayRepository.findByTogetherJoinCode(joinTogetherMember);

                headers.clear();
                headers.add("Authorization",tokenDto.getAccess_token());
                body.clear();
                body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);

                togetherJoinPayRepository.delete(togetherJoinPayment);
                togetherJoinRepository.delete(joinTogetherMember);
                log.info(cancle+"");
                result="삭제성공";
            }catch (Exception e) {
                e.printStackTrace();
                result="삭제실패";
            }

        }catch (Exception e) {
            e.printStackTrace();
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
    public String approvalTogetherMemberState(TogetherJoin togetherJoin) {
        String result = null;
        log.info("approvalTogetherMemberState()");
        try {
            togetherJoin.setTogetherJoinState("가입중");
            togetherJoinRepository.save(togetherJoin);
            result="성공";
        }catch (Exception e) {
            result="실패";
        }
        return result;
    }
    public String refusalTogetherMemberState(TogetherJoin togetherJoin) {
        String result = null;
        log.info("refusalTogetherMemberState()");
        TogetherJoinPayment togetherJoinPayment = togetherJoinPayRepository.findByTogetherJoinCode(togetherJoin);

        if(togetherJoinPayment==null){
            togetherJoin.setTogetherJoinState("거절");
            togetherJoinRepository.save(togetherJoin);
            result="돈없는그냥거절";
            return result;
        }
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String,String> body = new HashMap<>();
        body.put("imp_key", "5177641603268324");
        body.put("imp_secret", "8ECw03mlg2rRO9qJmHaWsQIiWGQDakmEkO9WvMaGV29EY01MWWt2AlQXr6A3Gu0VIEtFSMfVQaAReVf1");

        try {
            HttpEntity<Map> tokenEntity = new HttpEntity<>(body,headers);
            ResponseEntity<Map> token = restTemplate.postForEntity("https://api.iamport.kr/users/getToken",tokenEntity,Map.class);

            ObjectMapper mapper = new ObjectMapper();
            TokenDto tokenDto = mapper.convertValue(token.getBody().get("response"), TokenDto.class);

            try {
                if (tokenDto.getAccess_token().equals("")) {
                    throw new Exception();
                }
                headers.clear();
                headers.add("Authorization",tokenDto.getAccess_token());
                body.clear();
                body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);

                log.info(cancle+"");
            }catch (Exception e) {
                e.printStackTrace();
            }
            togetherJoin.setTogetherJoinState("거절");
            togetherJoinRepository.save(togetherJoin);
            result ="성공";
        }catch (Exception e) {
            result ="실패";
            e.printStackTrace();
        }
        return result;
    }

    public List<Together> getTogetherListBySearch(String searchText) {
        log.info("getTogetherListBySearch()");
        List<Together> togetherList = null;

        String searchTag = "%"+searchText+"%";

        try {
            log.info("searchTag : " + searchTag);
            togetherList = togetherRepository.findByTogetherTitleLike(searchTag);
        } catch (Exception e){
            e.printStackTrace();
        }
        return togetherList;
    }

    public List<TogetherJoin> getTogetherJoinListByMember(String memberEmail) {
        log.info("togetherService.getTogetherJoinListByMember()");
        List<TogetherJoin> togetherList = null;

        try {
            Member member = memberRepository.findById(memberEmail).get();
            togetherList = togetherJoinRepository.findAllByMemberEmail(member);
        } catch (Exception e){
            e.printStackTrace();
        }
        return togetherList;
    }

}
