package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;

import com.fitchwiframe.fitchwiserver.repository.*;

import lombok.extern.java.Log;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
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

    private final TagRepository tagRepository;


    public FeedService(FeedRepository feedRepository, FeedFileRepository feedFileRepository, FeedCommentRepository feedCommentRepository, FeedLikeRepository feedLikeRepository, FeedTagRepository feedTagRepository, MemberRepository memberRepository, TagRepository tagRepository) {
        this.feedRepository = feedRepository;
        this.feedFileRepository = feedFileRepository;
        this.feedCommentRepository = feedCommentRepository;
        this.feedLikeRepository = feedLikeRepository;
        this.feedTagRepository = feedTagRepository;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
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

        List<Feed> feedList = null;
        try {
            feedList = feedRepository.findAllByOrderByFeedDateDesc();
            List<Feed> newList = new ArrayList<>();

            for (Feed a : feedList) {
                List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
                List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
                a.setFfList(feedFiles);
                a.setFcList(feedComments);
                a.setFlList(feedLikes);
                newList.add(a);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return feedList;
    }

    //멤버가 작성한 피드 조회
    public List<Feed>getMemberFeed(String memberEmail) {
        log.info("feedService.getMemberFeed");
        Member member = memberRepository.findById(memberEmail).get();
        List<Feed> memberFeedList = new ArrayList<>();
        try {
            List<Feed> feedList = feedRepository.findAllByMemberEmailOrderByFeedDateDesc(member);
            //각 피드에 해당하는 피드파일 가져오기
            for(Feed feed : feedList){
                List<FeedFile> feedFileList = feedFileRepository.findByFeedCode(feed.getFeedCode());
                feed.setFfList(feedFileList);
                memberFeedList.add(feed);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        //피드 가져오기
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

    public String updateFeed(Feed newFeed) {
        log.info("feedService.updateFeed()");
        log.info("newFeed : " + newFeed);
        String result = null;

        try {
            FeedTag feedTag = feedTagRepository.findByFeedCode(newFeed.getFeedCode());
            feedTag.setFeedTagContent(newFeed.getFeedTag());
            feedTagRepository.save(feedTag);
            feedRepository.save(newFeed);
            log.info("saveFeed : " + newFeed);
            log.info("수정 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            log.info("수정 실패");
            result = "fail";
        }
        return result;
    }

    public String deleteFeed(Feed feed, HttpSession session) {
        String result = "fail";
        log.info("feedService.deleteFeed()");
        try {
            deleteFeedFile(feed, session);
            feedCommentRepository.deleteAllByFeedCode(feed.getFeedCode());
            feedLikeRepository.deleteAllByFeedCode(feed.getFeedCode());
            feedTagRepository.deleteAllByFeedCode(feed.getFeedCode());
            feedRepository.deleteById(feed.getFeedCode());
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public String deleteComment(FeedComment data) {
        String result = "fail";
        log.info("feedService.deleteComment()");
        try {
            feedCommentRepository.delete(data);
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    private void deleteFeedFile(Feed feed, HttpSession session) {
        log.info("deleteFeedFile()");
        try {
            List<FeedFile> feedFiles = feed.getFfList();
            System.out.println("feedFiles = " + feedFiles);
            if (feedFiles.isEmpty()){
                return;
            }
            feedFileRepository.deleteAllByFeedCode(feed.getFeedCode());
            String realPath = session.getServletContext().getRealPath("/");
            realPath += "images/";

            for (FeedFile file : feedFiles) {
                File fileToDelete = new File(realPath + file.getFeedFileSaveimg());
                System.out.println("fileToDelete = " + fileToDelete);
                if (fileToDelete.exists()) {
                    fileToDelete.delete();
                    log.info("파일 삭제 성공");
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<Feed> getFeedList(Integer page, String category, HttpSession session) {
        log.info("feedService.getFeedList()");

        int listCnt = 5;

        if (page == null){
            page = 1;
        }

        Pageable feedPageable = PageRequest.of(page -1, listCnt, Sort.Direction.DESC, "feedDate");
        List<Feed> feedList;
        List<Feed> newList = new ArrayList<>();

        switch (category){
            case "all" :
                feedList = feedRepository.findAll(feedPageable);
                for (Feed a : feedList){
                    List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                    List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
                    List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
                    a.setFfList(feedFiles);
                    a.setFcList(feedComments);
                    a.setFlList(feedLikes);
                    newList.add(a);
                }
                break;
            default:
                feedList = feedRepository.findAllByFeedCategoryContains(category, feedPageable);
                for (Feed a : feedList){
                    List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                    List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
                    List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
                    a.setFfList(feedFiles);
                    a.setFcList(feedComments);
                    a.setFlList(feedLikes);
                    newList.add(a);
                }
        }

        return newList;
    }

    public List<Tag> getTagList() {
        log.info("feedServie.getTagList()");
        List<Tag> tagList = null;
        try {
            tagList = tagRepository.findAll();
        } catch (Exception e){
            e.printStackTrace();
        }
        return tagList;
    }

    public List<Feed> getFeedListBySearch(String searchText) {
        log.info("feedService.getFeedListBySearch()");

        String searchTag = "%"+searchText+"%";
        List<Feed> feedList;
        List<Feed> newList = new ArrayList<>();

        try {
            feedList = feedRepository.findByFeedTagLike(searchTag);
            for (Feed a : feedList){
                List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                a.setFfList(feedFiles);
                newList.add(a);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return newList;
    }

    public String insertTag(String tag) {
        log.info("feedService.insertTag()");
        String result = null;

        try {
            log.info("tag : "+ tag);
            Tag newtag = new Tag();
            newtag.setTagContent(tag);
            tagRepository.save(newtag);
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    public Feed getFeedInfo(Long feedCode) {
        log.info("feedService.getFeedInfo()");
        Feed feed = null;
        try {
            feed = feedRepository.findById(feedCode).get();
            List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(feedCode);
            List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(feedCode);
            List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(feedCode);
            feed.setFfList(feedFiles);
            feed.setFcList(feedComments);
            feed.setFlList(feedLikes);
        } catch (Exception e){
            e.printStackTrace();
        }
        return feed;

    }


    public List<Feed> getFeedListTillPage(Integer page, String category, HttpSession session) {
        log.info("feedService.getFeedListTillPage()");

        int listCnt = 5;

        if (page == null) {
            page = 1;
        }

        List<Feed> newList = new ArrayList<>();
        for (int i = 1; i <= page; i++) {
            Pageable feedPageable = PageRequest.of(i - 1, listCnt, Sort.Direction.DESC, "feedDate");
            List<Feed> feedList;

            switch (category) {
                case "all":
                    feedList = feedRepository.findAll(feedPageable);
                    for (Feed a : feedList) {
                        List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                        List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
                        List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
                        a.setFfList(feedFiles);
                        a.setFcList(feedComments);
                        a.setFlList(feedLikes);
                        newList.add(a);
                    }
                    break;
                default:
                    feedList = feedRepository.findAllByFeedCategoryContains(category, feedPageable);
                    for (Feed a : feedList) {
                        List<FeedFile> feedFiles = feedFileRepository.findByFeedCode(a.getFeedCode());
                        List<FeedComment> feedComments = feedCommentRepository.findByFeedCode(a.getFeedCode());
                        List<FeedLike> feedLikes = feedLikeRepository.findByFeedCode(a.getFeedCode());
                        a.setFfList(feedFiles);
                        a.setFcList(feedComments);
                        a.setFlList(feedLikes);
                        newList.add(a);
                    }
            }
        }
        return newList;
    }
@Transactional
    public void deleteAllByMember(Member member, HttpSession session){

        List<FeedComment> memberCommentList = feedCommentRepository.findByMemberEmail(member);
        if(!(memberCommentList.isEmpty())){
            feedCommentRepository.deleteAll(memberCommentList);
        }

        List<FeedLike> memberFeedLikeList = feedLikeRepository.findByMemberEmail(member);
        if(!(memberFeedLikeList.isEmpty())){
            feedLikeRepository.deleteAll(memberFeedLikeList);
        }

        List<Feed> memberFeedList = getMemberFeed(member.getMemberEmail());
        if(!(memberFeedList.isEmpty())){
            for(Feed feed : memberFeedList){
                deleteFeed(feed, session);
            }
        }


    }

    public List<Member> getFeedListOrderByMember() {
        log.info("feedService.getFeedListOrderByMember()");
        List<Feed> feedList = null;
        List<Member> members = new ArrayList<>();
        try {
            feedList = feedRepository.findDistinctByOrderByMemberEmail();
            System.out.println("feedList = " + feedList);
            for (Feed m : feedList){
                System.out.println("m = " + m);
                Member member = m.getMemberEmail();
                System.out.println("카운트 시작");
                Long count = feedRepository.countByMemberEmail(member);
                System.out.println("카운트 = " + count);
                member.setMemberFeedCount(count);
                members.add(member);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return members;
    }


}
