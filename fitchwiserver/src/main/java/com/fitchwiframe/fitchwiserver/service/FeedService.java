package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.FeedFile;
import com.fitchwiframe.fitchwiserver.repository.FeedFileRepository;
import com.fitchwiframe.fitchwiserver.repository.FeedRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@Log
public class FeedService {

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private FeedFileRepository feedFileRepository;

    // 피드 등록
    public String insertFeed(Feed newFeed, List<MultipartFile> files, HttpSession session) {
        log.info("feedService.insertFeed()");
        String result = null;

        try {
            Feed saveFeed = feedRepository.save(newFeed);
            if (files != null){
                List<FeedFile> saveFeedFile = fileUpload(saveFeed,files,session);
                saveFeed.setFfList(saveFeedFile);
            }
            log.info("등록 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    public List<FeedFile> fileUpload(Feed feed, List<MultipartFile> files, HttpSession session) throws Exception{
        log.info("feedService.fileupload()");
        log.info("feedInfo : " + feed);

        List<FeedFile> saveFeedFile = new ArrayList<>();
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);

        realPath += "images/";
        File folder = new File(realPath);
        if (!folder.isDirectory()){
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
            ff.setFeedCode(feed);
            ff.setFeedFileImg(orname);
            String sysname = System.currentTimeMillis() + orname.substring(orname.lastIndexOf("."));
            ff.setFeedFileSaveimg(sysname);
            //업로드하는 파일을 upload 폴더에 저장.
            File file = new File(realPath + sysname);
            //파일 저장(upload 폴더)
            mf.transferTo(file);

            //파일 정보를 DB에 저장
            saveFeedFile.add(feedFileRepository.save(ff));
        }
        log.info("saveFeedFile : " + saveFeedFile);
        return saveFeedFile;
    }


    public List<Feed> getAllFeedList() {
        log.info("feedService.getAllFeedList()");
        Iterable<Feed> feeds = feedRepository.findAll(Sort.by(Sort.Direction.DESC, "feedDate"));
        log.info("feeds : " + feeds);
        if (feeds == null){
            return null;
        } else {
            return (List<Feed>) feeds;
        }
    }

    public List<FeedFile> getFeedFile(Feed feed) {
        log.info("feedService.getAllFeedListWithFeedFile()");
        List<FeedFile> files = feedFileRepository.findByFeedCode(feed);
        return files;
    }
}
