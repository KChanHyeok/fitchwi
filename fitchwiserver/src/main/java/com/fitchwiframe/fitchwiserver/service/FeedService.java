package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.FeedFile;
import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.repository.FeedFileRepository;
import com.fitchwiframe.fitchwiserver.repository.FeedRepository;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log
public class FeedService {

    private final FeedRepository feedRepository;

    private final FeedFileRepository feedFileRepository;

    public FeedService(FeedRepository feedRepository, FeedFileRepository feedFileRepository) {
        this.feedRepository = feedRepository;
        this.feedFileRepository = feedFileRepository;
    }



  // 피드 등록
    public String insertFeed(Feed newFeed, List<MultipartFile> files, HttpSession session) {
        log.info("feedService.insertFeed()");
        log.info("newFeed : " + newFeed);
        String result = null;

        try {
            Feed saveFeed = feedRepository.save(newFeed);
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
            a.setFfList(feedFiles);
            newList.add(a);
        }
        System.out.println("newList = " + newList);
        if (feedList == null){
            return null;
        }
        return feedList;
    }

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
        //맵에 담기
        //리스트에 담기


    }


//멤버가 작성한 피드 조회

}
