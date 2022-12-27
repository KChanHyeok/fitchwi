package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;

import com.fitchwiframe.fitchwiserver.repository.*;

import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@Log
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedFileRepository feedFileRepository;
    private final FeedCommentRepository feedCommentRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final FeedTagRepository feedTagRepository;
    private final MemberRepository memberRepository;


    public FeedService(FeedRepository feedRepository, FeedFileRepository feedFileRepository, FeedCommentRepository feedCommentRepository, FeedLikeRepository feedLikeRepository, FeedTagRepository feedTagRepository, MemberRepository memberRepository) {
        this.feedRepository = feedRepository;
        this.feedFileRepository = feedFileRepository;
        this.feedCommentRepository = feedCommentRepository;
        this.feedLikeRepository = feedLikeRepository;
        this.feedTagRepository = feedTagRepository;
        this.memberRepository = memberRepository;
    }



    // 피드 등록
    public String insertFeed(Feed newFeed, List<MultipartFile> files, HttpSession session ) {
        log.info("feedService.insertFeed()");
        log.info("newFeed : " + newFeed);
        String result = null;

        try {
            Feed saveFeed = feedRepository.save(newFeed);
            FeedTag feedTag = new FeedTag();
            feedTag.setFeedCode(newFeed.getFeedCode());
            feedTag.setFeedTagContent(newFeed.getFeedTag());
            feedTagRepository.save(feedTag);
            if (files != null){
                List<FeedFile> feedFiles = fileUpload(saveFeed,files,session);
                log.info("feedFiles : " + feedFiles);
                saveFeed.setFfList(feedFiles);
            }
            log.info("newFead : " + newFeed);
            log.info("saveFeed : " + saveFeed);
            log.info("등록 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    public List<FeedFile> fileUpload(Feed newFeed, List<MultipartFile> files, HttpSession session) throws Exception{
        log.info("feedService.fileupload()");
        log.info("feedInfo : " + newFeed);

        List<FeedFile> feedFiles = new ArrayList<>();
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);

        realPath += "images/";
        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir();
        }

        for(MultipartFile mf : files) {
            String orname = mf.getOriginalFilename(); //업로드 파일명 가져오기
            if (orname.equals("")) {
                //업로드하는 파일이 없는 상태.
                return null; //파일 저장 처리 중지!
            }

            //파일 정보를 피드 파일 테이블에 저장
            FeedFile ff = new FeedFile();
            ff.setFeedCode(newFeed.getFeedCode());
            ff.setFeedFileImg(orname);
            String sysname = System.currentTimeMillis() + orname.substring(orname.lastIndexOf("."));
            ff.setFeedFileSaveimg(sysname);
            //업로드하는 파일을 upload 폴더에 저장.
            File file = new File(realPath + sysname);
            //파일 저장(upload 폴더)
            mf.transferTo(file);

            //파일 정보를 DB에 저장
            feedFiles.add(feedFileRepository.save(ff));
        }
        return feedFiles;
    }


    public List<Feed> getAllFeedList() {
        log.info("feedService.getAllFeedList()");

        List<Feed> feedList = feedRepository.findAllByOrderByFeedDateDesc();
        List<Feed> newList = new ArrayList<>();

        for (Feed a : feedList){
            List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
            List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
            List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
            a.setFfList(feedFiles);
            a.setFcList(feedComments);
            a.setFlList(feedLikes);
            newList.add(a);
        }
        System.out.println("newList = " + newList);
        if (feedList == null){
            return null;
        }
        return feedList;
    }

    //멤버가 작성한 피드 조회
    public List<Feed>getMemberFeed(Member member) {
        log.info("feedService.getMemberFeed");
        //피드 가져오기
        List<Feed> feedList = feedRepository.findAllByMemberEmail(member);
        List<Feed> memberFeedList = new ArrayList<>();

        //각 피드에 해당하는 피드파일 가져오기
        for(Feed feed : feedList){
            List<FeedFile> feedFileList = feedFileRepository.findByFeedCode(feed.getFeedCode());
            feed.setFfList(feedFileList);
            memberFeedList.add(feed);
        }

        return memberFeedList;
    }


    public String insertComment(FeedComment feedComment) {
        log.info("feedService.insertComment()");

        String result = null;
        try {
            feedCommentRepository.save(feedComment);
            System.out.println("피드 추가 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            System.out.println("댓글 추가 실패");
            result = "fail";
        }
        return result;
    }

    public String likeFeed(Long feedCode, String memberInfo) {
        log.info("feedService.likeFeed()");
        FeedLike like = new FeedLike();
        like.setFeedCode(feedCode);
        String result = null;
        try {
            Member loginMember = memberRepository.findById(memberInfo).get();
            like.setMemberEmail(loginMember);
            feedLikeRepository.save(like);
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public String dLikeFeed(Long feedCode, String memberInfo) {
        String result = "fail";

        try {
            Member loginMember = memberRepository.findById(memberInfo).get();
            FeedLike like = feedLikeRepository.findByFeedCodeAndMemberEmail(feedCode, loginMember);
            feedLikeRepository.delete(like);
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public String updateFeed(Feed newFeed, List<MultipartFile> files, HttpSession session) {
        log.info("feedService.updateFeed()");
        log.info("newFeed : " + newFeed);
        String result = null;

        try {
            Feed saveFeed = feedRepository.findById(newFeed.getFeedCode()).get();
            FeedTag feedTag = feedTagRepository.findByFeedCode(saveFeed.getFeedCode());
            feedTag.setFeedCode(newFeed.getFeedCode());
            feedTag.setFeedTagContent(newFeed.getFeedTag());
            feedTagRepository.save(feedTag);
            if (files != null){
                List<FeedFile> feedFiles = fileUpload(newFeed,files,session);
                log.info("feedFiles : " + newFeed);
                saveFeed.setFfList(feedFiles);
            }
            log.info("newFead : " + newFeed);
            log.info("saveFeed : " + saveFeed);
            log.info("등록 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }
}
