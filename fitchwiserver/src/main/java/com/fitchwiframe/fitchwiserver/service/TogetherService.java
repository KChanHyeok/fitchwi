package com.fitchwiframe.fitchwiserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


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
    TogetherPaymentRepository togetherPaymentRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    NodayRepository nodayRepository;


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
        together.setTogetherTotalPrice(together.getTogetherPrice() + togetherOpened.getFacilitiesCode().getFacilitiesPrice());
        togetherTag.setTogetherCode(together);
        Noday noday = new Noday();
        noday.setNodayDate(together.getTogetherDate());
        noday.setFacilitiesCode(togetherOpened.getFacilitiesCode());

        togetherOpenedRepository.save(togetherOpened);
        togetherRepository.save(together);
        togetherTagRepository.save(togetherTag);
        nodayRepository.save(noday);
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
    public String insertTogetherPay(TogetherPayment togetherPayment) {
        String result = null;
        try {

            long joinMemberCount = togetherJoinRepository.countByTogetherCode(togetherPayment.getTogetherCode());
            if(joinMemberCount+1!=togetherPayment.getTogetherCode().getTogetherMax()) {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, String> body = new HashMap<>();
                body.put("imp_key", "5177641603268324");
                body.put("imp_secret", "8ECw03mlg2rRO9qJmHaWsQIiWGQDakmEkO9WvMaGV29EY01MWWt2AlQXr6A3Gu0VIEtFSMfVQaAReVf1");
                try {
                    HttpEntity<Map> tokenEntity = new HttpEntity<>(body, headers);
                    ResponseEntity<Map> token = restTemplate.postForEntity("https://api.iamport.kr/users/getToken", tokenEntity, Map.class);

                    ObjectMapper mapper = new ObjectMapper();
                    TokenDto tokenDto = mapper.convertValue(token.getBody().get("response"), TokenDto.class);
                    try {
                        if (tokenDto.getAccess_token().equals("")) {
                            throw new Exception();
                        }

                        headers.clear();
                        headers.add("Authorization", tokenDto.getAccess_token());
                        body.clear();
                        body.put("imp_uid", togetherPayment.getTogetherImp());
                        body.put("merchant_uid", togetherPayment.getTogetherPayCode());
                        body.put("amount", togetherPayment.getTogetherPayPrice() + "");

                        HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                        cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);

                    } catch (Exception e) {

                    }
                }catch (Exception e) {

                }
                    result = "인원수가 맞지 않습니다.";
                    return result;
            }
            togetherPayment.getTogetherCode().setTogetherState("결제완료");
            Together together = togetherPayment.getTogetherCode();
            togetherPayment.setTogetherPayStatus("결제완료");
            togetherPaymentRepository.save(togetherPayment);
            togetherRepository.save(together);
            result="최종결제 완료";

        }catch (Exception e) {
            result="최종결제 실패";
            e.printStackTrace();
        }
        return result;
    }

    private TokenDto Token() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String,String> body = new HashMap<>();
        body.put("imp_key", "5177641603268324");
        body.put("imp_secret", "8ECw03mlg2rRO9qJmHaWsQIiWGQDakmEkO9WvMaGV29EY01MWWt2AlQXr6A3Gu0VIEtFSMfVQaAReVf1");
        HttpEntity<Map> tokenEntity = new HttpEntity<>(body,headers);
        ResponseEntity<Map> token = restTemplate.postForEntity("https://api.iamport.kr/users/getToken",tokenEntity,Map.class);
        ObjectMapper mapper = new ObjectMapper();
        TokenDto tokenDto = mapper.convertValue(token.getBody().get("response"), TokenDto.class);
        return tokenDto;
    }

    public String insertTogetherPayJoinInfo(TogetherJoinPayment togetherJoinPayment) {
        String result = null;
        try {
            Together together = togetherRepository.findById(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherCode()).get();
            TokenDto tokenDto = Token();
            long joinMemberCount = togetherJoinRepository.countByTogetherCode(togetherJoinPayment.getTogetherJoinCode().getTogetherCode());

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date now =new Date();
            Date startDate = sdf.parse(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherRecruitStartDate());
            Date endDate = sdf.parse(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherRecruitEndDate());
            Date nowDate = sdf.parse(sdf.format(now));


            if(startDate.after(nowDate)) {
                result="아직 모집 기간이 아닙니다.";
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                Map<String,String> body = new HashMap<>();
//                        headers.clear();
                headers.add("Authorization",tokenDto.getAccess_token());
//                        body.clear();
                body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);
                return result;
            }
            if(endDate.before(nowDate)) {
                result="이미 지난 모집글입니다.";
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                Map<String,String> body = new HashMap<>();
//                        headers.clear();
                headers.add("Authorization",tokenDto.getAccess_token());
//                        body.clear();
                body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);
                return result;
            }

            if(together.getTogetherState().equals("결제완료")) {
                result = "이미 결제완료되어 모집이 만료된 방입니다 감사합니다.";

                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                Map<String,String> body = new HashMap<>();
//                        headers.clear();
                headers.add("Authorization",tokenDto.getAccess_token());
//                        body.clear();
                body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);

                return result;
            }

            if(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherMax()<=joinMemberCount+1){
                    result="인원이 가득차서 가입할수 없습니다. (자동환불됩니다)";
                    try{
                        if(tokenDto.getAccess_token().equals("")){
                            throw new Exception();
                        }
                        RestTemplate restTemplate = new RestTemplate();
                        HttpHeaders headers = new HttpHeaders();
                        Map<String,String> body = new HashMap<>();
//                        headers.clear();
                        headers.add("Authorization",tokenDto.getAccess_token());
//                        body.clear();
                        body.put("imp_uid", togetherJoinPayment.getTogetherJoinImp());
                        body.put("merchant_uid", togetherJoinPayment.getTogetherJoinPayCode());
                        body.put("amount",togetherJoinPayment.getTogetherJoinPayPrice()+"");

                        HttpEntity<Map> cancelEntity = new HttpEntity<Map>(body, headers);
                        cancleBuyDto cancle = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", cancelEntity, cancleBuyDto.class);
                }catch (Exception e) {
                    e.printStackTrace();
                }
                return result;
            }
            if(togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherType().equals("선착순")) {
                togetherJoinPayment.getTogetherJoinCode().setTogetherJoinState("가입중");
                int facilitiesPrice = togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherOpenedCode().getFacilitiesCode().getFacilitiesPrice();
                int joinPay = togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherPrice()+ facilitiesPrice;
                int totalPay = togetherJoinPayment.getTogetherJoinCode().getTogetherCode().getTogetherTotalPrice();

                togetherJoinPayment.getTogetherJoinCode().getTogetherCode().setTogetherTotalPrice(joinPay+totalPay);
                Together jtogether = togetherJoinPayment.getTogetherJoinCode().getTogetherCode();
                togetherRepository.save(together);
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
    public String insertTogetherFreeInfo(Together together) {
        String result = null;
        log.info("insertTogetherFreeInfo()");

        long joinMemberCount = togetherJoinRepository.countByTogetherCode(together);
        if(joinMemberCount+1!=together.getTogetherMax()) {
            result="인원이 맞지 않습니다.";
            return result;
        }

        try {
            together.setTogetherState("결제완료");
            togetherRepository.save(together);
            result="0원 결제완료";
        }catch (Exception e) {
            e.printStackTrace();
            result="0원 결제실패";
        }
        return result;
    }

    public String insertTogetherFreeJoinInfo(TogetherJoin togetherJoin) throws ParseException {
        String result = null;
        log.info("insertTogetherFreeJoinInfo()");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date now =new Date();
        Date startDate = sdf.parse(togetherJoin.getTogetherCode().getTogetherRecruitStartDate());
        Date endDate = sdf.parse(togetherJoin.getTogetherCode().getTogetherRecruitEndDate());
        Date nowDate = sdf.parse(sdf.format(now));
            if(startDate.after(nowDate)) {
                result="아직 모집 기간이 아닙니다.";
                return result;
            }
            if(endDate.before(nowDate)) {
                result="이미 지난 모집글입니다.";
                return result;
            }

            long joinMemberCount = togetherJoinRepository.countByTogetherCode(togetherJoin.getTogetherCode());
            log.info(joinMemberCount+"가입한 인원수");

            Together together = togetherRepository.findById(togetherJoin.getTogetherCode().getTogetherCode()).get();
            if(together.getTogetherState().equals("결제완료")){
                result="이미 마감된 모임입니다 감사합니다,";
                return result;
            }
            if(togetherJoin.getTogetherCode().getTogetherMax()<=joinMemberCount+1){
                result="인원이 가득차서 가입할수 없습니다.";
                return result;
            }

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
            if(joinTogether.getTogetherState().equals("결제완료") || joinTogether.getTogetherState().equals("삭제요청중")){
                result = "이미 결제가 완료되었거나 삭제요청이 진행중인 모임이라 취소가 불가능 합니다 챗봇을 통해 문의해주세요";
                return result;
            }
            
            TogetherJoin joinTogetherMember = togetherJoinRepository.findByMemberEmailAndTogetherCode(loginMember, joinTogether);

            togetherJoinRepository.delete(joinTogetherMember);
            result = "취소성공";
        }catch (Exception e) {
            result = "취소 실패";
            e.printStackTrace();
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

                if(joinTogether.getTogetherState().equals("결제완료") || joinTogether.getTogetherState().equals("삭제요청중")){
                    result = "이미 결제가 완료되었거나 삭제요청이 진행중인 모임이라 취소가 불가능 합니다 챗봇을 통해 문의해주세요";
                    return result;
                }

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

                int joinpay = joinTogether.getTogetherPrice();
                int totalpay = joinTogether.getTogetherTotalPrice();
                joinTogether.setTogetherTotalPrice(totalpay-joinpay);
                togetherRepository.save(joinTogether);
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
            int joinPay = togetherJoin.getTogetherCode().getTogetherPrice();
            int totalPay = togetherJoin.getTogetherCode().getTogetherTotalPrice();
            Together together = togetherJoin.getTogetherCode();
            together.setTogetherTotalPrice(totalPay+joinPay);
            togetherRepository.save(together);
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
            result="그냥거절";
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

    public List<TogetherOpened> getTogetherOpenedListByMember(String memberEmail) {
        log.info("togetherService.getTogetherOpenedListByMember()");
        List<TogetherOpened> togetherOpenedList = null;

        try {
            Member member = memberRepository.findById(memberEmail).get();
            togetherOpenedList = togetherOpenedRepository.findAllByMemberEmail(member);
        } catch (Exception e){
            e.printStackTrace();
        }
        return togetherOpenedList;

    }

    public Map<String, Object> getMemberTogether(String memberEmail) {
        log.info("togetherService.getMemberTogether()");
        Map<String, Object> togetherMap = new HashMap<>();
        try{
            List<TogetherJoin> togetherJoinListByMember = getTogetherJoinListByMember(memberEmail);
            if(!(togetherJoinListByMember.isEmpty())){
                for(TogetherJoin tj : togetherJoinListByMember){
                    Together together = tj.getTogetherCode();
                    together.setTogetherMemberCount(togetherJoinRepository.countByTogetherCode(together));
                }
            }
            List<Together> togetherListWithMemberCount = new ArrayList<>();


            List<TogetherOpened> togetherOpenedListByMember = getTogetherOpenedListByMember(memberEmail);
            if(!(togetherOpenedListByMember.isEmpty())){
                for(TogetherOpened to : togetherOpenedListByMember){
                    Together together = togetherRepository.findBytogetherOpenedCode(to);
                    together.setTogetherMemberCount(togetherJoinRepository.countByTogetherCode(together));
                    togetherListWithMemberCount.add(together);
                }
            }


            togetherMap.put("togetherJoinList", togetherJoinListByMember);
            togetherMap.put("togetherOpenedList", togetherListWithMemberCount);
        }catch (Exception e){
            e.printStackTrace();
        }

        return togetherMap;
    }

    public boolean isAvailableToDeleteMember(Member member){
        boolean result = false;
        List<TogetherJoin> togetherJoinListByMember = getTogetherJoinListByMember(member.getMemberEmail());
        List<TogetherOpened> togetherOpenedListByMember = getTogetherOpenedListByMember(member.getMemberEmail());

        if(togetherJoinListByMember.isEmpty() && togetherOpenedListByMember.isEmpty()){
            result = true;
        }
        return result;

    }

    public Map<String, Object> getTogetherCancelRequestList(Integer pageNum ,String togetherTitle) {
        log.info("togetherService.getTogetherCancelRequestList()");

        if (pageNum == null) {
            pageNum = 1;
        }
        int listCount = 10;
        Pageable pageable = PageRequest.of((pageNum - 1), listCount, Sort.Direction.DESC, "togetherCode");

        Page<Together> result = null;
        if (togetherTitle.equals("")) {
            result = togetherRepository.findByTogetherStateLike("삭제신청중",pageable);
        } else {
            String keywordToSearch = "%" + togetherTitle + "%";
            result = togetherRepository.findByTogetherStateAndTogetherTitleLike("삭제신청중",keywordToSearch, pageable);
        }
        List<Together> togetherList = result.getContent();
        int totalPage = result.getTotalPages();

        Map<String, Object> mapToReturn = new HashMap<>();
        mapToReturn.put("totalPage", totalPage);
        mapToReturn.put("pageNum", pageNum);
        mapToReturn.put("togetherList", togetherList);

        return mapToReturn;

    }







}
