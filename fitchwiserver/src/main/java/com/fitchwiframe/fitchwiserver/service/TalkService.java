package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;

import java.util.*;


@Service
@Log
public class TalkService {

    @Autowired
    private TalkRepository talkRepository;

    @Autowired
    private TalkOpenedRepository talkOpenedRepository;

    @Autowired
    private TalkTagRepository talkTagRepository;

    @Autowired
    private TalkJoinRepository talkJoinRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private FeedFileRepository feedFileRepository;

    public String addTalk(Talk newTalk, TalkTag talkTag , MultipartFile pic, HttpSession session) {
        log.info("talkService.addTalk");
        String result = null;

        try {
            if (pic != null) {
                newTalk = talkFileUpload(newTalk, pic, session);
            } else {
                newTalk.setTalkImg("이미지 원래 이름");
                newTalk.setTalkSaveimg("저장된 기본이미지 이름");
            }
            talkTag.setTalkCode(newTalk); //talkCode 외래키 연결
            talkRepository.save(newTalk);
            talkTagRepository.save(talkTag); //얘기해요 태그값 DB 저장
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    private Talk talkFileUpload(Talk talk, MultipartFile pic, HttpSession session)
            throws Exception {
        log.info("talkService.talkFileUpload()");
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);

        realPath += "images/";
        File folder = new File(realPath);
        if (!folder.isDirectory()){
            folder.mkdir();
        }

        String orname = pic.getOriginalFilename();
        talk.setTalkImg(orname);
        String sysname = System.currentTimeMillis()
                + orname.substring(orname.lastIndexOf("."));
        talk.setTalkSaveimg(sysname);
        File file = new File(realPath + sysname);
        pic.transferTo(file);

        return talk;
    }

    //개설 코드 값 저장
    public void addTalkOpened(TalkOpened talkOpened, Talk newTalk) {
        log.info("talkService.addTalkOpened()");
        talkOpenedRepository.save(talkOpened);
        newTalk.setTalkOpenCode(talkOpened);
    }

    public Iterable<Talk> getAllTalkList() {
        log.info("talkService.getAllTalkList()");
        Iterable<Talk> talkList = talkRepository.findAllByOrderByTalkOpenCodeDesc();
        for (Talk t : talkList){
            t.setTalkMemberCount(talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(t,"가입중"));
        }
        return talkList;
    }

    public Iterable<TalkTag> getAllTalkTagList() {
        log.info("talkService.getAllTalkTagList()");
        Iterable<TalkTag> talkTagList = talkTagRepository.findAll();
        return talkTagList;
    }

    public String updateTalk(Talk talk, MultipartFile pic, HttpSession session) {
        log.info("talkService.updateTalk()");
        log.info("talk :" + talk);
        String result = null;
        try {
            if(pic != null) {
                deleteTalkFile(talk, session);
                talk = talkFileUpload(talk, pic, session);
            } else {
                talk.setTalkImg(talk.getTalkImg());
                talk.setTalkSaveimg(talk.getTalkSaveimg());
            }
            talkRepository.save(talk);
            log.info("updateTalk : " + talk);
            log.info("수정 성공");
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("수정 실패");
            result = "fail";
        }
        return result;
    }

    public String updateTalkTag(TalkTag talkTag) {
        log.info("talkService.updateTalkTag()");
        String result = null;
        try {
            talkTagRepository.save(talkTag);
            log.info("updateTalkTag : " + talkTag);
            log.info("태그 수정 성공");
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("태그 수정 실패");
            result = "fail";
        }
        return result;
    }

    public String deleteTalk(Talk talk, HttpSession session) {
        log.info("talkService.deleteTalk()");
        String result = "fail";
        log.info("talk value: " + talk);

        try {
            deleteTalkFile(talk, session);
            //talkCode가 담긴 객체를 보내야함
            talkTagRepository.deleteAllByTalkCode(talk);
            talkJoinRepository.deleteAllByTalkCode(talk);
            talkRepository.deleteById(talk.getTalkCode());
            talkRepository.deleteAllByTalkOpenCode(talk.getTalkOpenCode());
            talkOpenedRepository.deleteById(talk.getTalkOpenCode().getTalkOpenCode());


            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    private void deleteTalkFile(Talk talk, HttpSession session) {
        log.info("deleteTalkFile");

        try {
            String realPath = session.getServletContext().getRealPath("/");
            realPath += "images/";

            File fileToDelete = new File(realPath + talk.getTalkSaveimg());
            System.out.println("fileToDelete = " + fileToDelete);
            if (fileToDelete.exists()) {
                fileToDelete.delete();
                log.info("파일 삭제 성공");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String insertTalkJoinInfo(TalkJoin talkJoin) {
        log.info("talkService.insertTalkJoinInfo()");
        String result = null;

        try {
            long talkJoinMemberCount = talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(talkJoin.getTalkCode(), "가입중");
            log.info("가입한 인원수 : " + talkJoinMemberCount);
            if (talkJoin.getTalkCode().getTalkMax()<=talkJoinMemberCount+1) {
                result="memberMax";
                return result;
            }
            if (talkJoin.getTalkCode().getTalkType().equals("선착순")) {
                talkJoin.setTalkJoinState("가입중");
                talkJoinRepository.save(talkJoin);
                result = "joinOk";
            } else {
                talkJoinRepository.save(talkJoin);
                result = "ok";
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    public Iterable<TalkJoin> getTalkJoinList() {
        log.info("talkService.getTalkJoinList()");
        Iterable<TalkJoin> talkJoinList = talkJoinRepository.findAll();
        return talkJoinList;
    }

    public String deleteTalkJoinInfo(String memberEmail, long talkCode) {
        log.info("talkService.deleteTalkJoinInfo()");
        String result = null;

        try {
            Member loginMember = memberRepository.findById(memberEmail).get();
            Talk joinTalk = talkRepository.findById(talkCode).get();
            TalkJoin joinTalkMember =  talkJoinRepository.findByMemberEmailAndTalkCode(loginMember, joinTalk);
            talkJoinRepository.delete(joinTalkMember);
            result = "모임 탈퇴 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "모임 탈퇴 실패";
        }
        return result;
    }

    public List<Talk> getTalkListBySearch(String searchText) {
        log.info("getTalkListBySearch()");
        List<Talk> talkList = new ArrayList<>();

        String searchTag = "%"+searchText+"%";

        try {
            log.info("searchTag : " + searchTag);
            talkList = talkRepository.findByTalkTitleLike(searchTag);
            for (Talk t : talkList){
                t.setTalkMemberCount(talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(t,"가입중"));
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkList;
    }

    public String deleteJoinMember(TalkJoin talkJoin) {
        log.info("talkService.deleteJoinMember()");
        String result = null;
        try {
            talkJoin.setTalkJoinState("강제탈퇴");
            talkJoinRepository.save(talkJoin);
            result = "탈퇴 처리 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "탈퇴 처리 실패";
        }
        return result;
    }

    public String approvalTalkMember(TalkJoin talkJoin) {
        log.info("talkService.approvalTalkMember()");
        String result = null;
        try {
            long talkJoinMemberCount = talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(talkJoin.getTalkCode(), "가입중");
            log.info("가입한 인원수 : " + talkJoinMemberCount);
            if (talkJoin.getTalkCode().getTalkMax()<=talkJoinMemberCount+1) {
                result="인원이 가득찼습니다.\n회원을 더 추가하려면 최대인원 설정을 변경해주세요.";
                return result;
            }
            talkJoin.setTalkJoinState("가입중");
            talkJoinRepository.save(talkJoin);
            result = "가입 처리 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "가입 처리 실패";
        }
        return result;
    }

    public String refusalTalkMember(TalkJoin talkJoin) {
        log.info("talkService.refusalTalkMember()");
        String result = null;
        try {
            talkJoin.setTalkJoinState("거절");
            talkJoinRepository.save(talkJoin);
            result = "거절 처리 완료";
        } catch (Exception e) {
            e.printStackTrace();
            result = "거절 처리 실패";
        }
        return result;
    }

    public List<TalkJoin> getTalkJoinListByMember(String memberEmail) {
        log.info("talkService.getTalkJoinListByMember()");
        List<TalkJoin> talkJoinList = null;

        try {
            Member member = memberRepository.findById(memberEmail).get();
            talkJoinList = talkJoinRepository.findAllByMemberEmail(member);
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkJoinList;
    }
    public List<TalkOpened> getTalkOpenedListByMember(String memberEmail) {
        log.info("talkService.getTalkJoinListByMember()");
        List<TalkOpened> talkOpenedList = null;

        try {
            Member member = memberRepository.findById(memberEmail).get();
            talkOpenedList = talkOpenedRepository.findAllByMemberEmail(member);
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkOpenedList;

    }

        public Map<String, Object> getMemberTalk(String memberEmail) {
            Map<String, Object> talkMap = new HashMap<>();
        try{

            List<TalkJoin> talkJoinListByMember = getTalkJoinListByMember(memberEmail);


            if(!(talkJoinListByMember.isEmpty())) {
                for (TalkJoin tj : talkJoinListByMember) {
                    Talk talk = tj.getTalkCode();
                    talk.setTalkMemberCount(talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(talk,"가입중"));

                }
            }

            List<Talk> talkListWithMemberCount = new ArrayList<>();

            List<TalkOpened> talkOpenedListByMember = getTalkOpenedListByMember(memberEmail);
            if(!talkOpenedListByMember.isEmpty()) {
                for (TalkOpened to : talkOpenedListByMember) {
                 Talk   talk = talkRepository.findByTalkOpenCode(to);
                 talk.setTalkMemberCount(talkJoinRepository.countByTalkCodeAndTalkJoinStateContains(talk,"가입중"));


                 talkListWithMemberCount.add(talk);
                }
            }

            talkMap.put("talkJoinList", talkJoinListByMember);
            talkMap.put("talkOpenedList", talkListWithMemberCount);
        }catch (Exception e){
            e.printStackTrace();
        }
            System.out.println("talkMap = " + talkMap);
        return talkMap;
    }

    public Talk getTalk(long talkCode) {
        log.info("talkService.getTalk()");
        Talk talkInfo = null;
        try {
            talkInfo = talkRepository.findById(talkCode).get();
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkInfo;
    }


    public List<Talk> getTalkListByCategory(String talkCategory) {
        log.info("talkService.getTalkListByCategory()");
        List<Talk> talkList = new ArrayList<>();

        try {
            System.out.println("category = " + talkCategory);
            talkList = talkRepository.findAllByTalkCategory(talkCategory);
        } catch (Exception e){
            e.printStackTrace();
        }
        return talkList;
    }

    public void deleteAllByMember(Member member, HttpSession session){
        //가입중
        List<TalkJoin> talkJoinListByMember = getTalkJoinListByMember(member.getMemberEmail());
        if(!(talkJoinListByMember.isEmpty())){
            talkJoinRepository.deleteAll(talkJoinListByMember);
        }
      //운영중
        List<Talk> talkList =new ArrayList<>();

        List<TalkOpened> talkOpenedListByMember = getTalkOpenedListByMember(member.getMemberEmail());
        if(!(talkOpenedListByMember.isEmpty())){
            for(TalkOpened talkOpen : talkOpenedListByMember){
                talkList.add(talkRepository.findByTalkOpenCode(talkOpen));
        }

        for(Talk talk : talkList){
            deleteTalk(talk, session);
        }
        }
    }

    public List<Feed> getFeedListByTalk(Long feedClassificationcode) {
        log.info("talkService.getFeedListByTalk()");
        List<Feed> talkFeedList = new ArrayList<>();
        try {
        talkFeedList = feedRepository.findAllByFeedClassificationcode(feedClassificationcode);
        for (Feed a : talkFeedList) {
            List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
            a.setFfList(feedFiles);
        }
            System.out.println("talkFeedList = " + talkFeedList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return talkFeedList;
    }
}
