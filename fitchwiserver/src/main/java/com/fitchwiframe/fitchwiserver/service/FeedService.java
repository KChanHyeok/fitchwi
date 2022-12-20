package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.repository.FeedRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.List;
import java.util.function.Supplier;

@Service
@Log
public class FeedService {

    @Autowired
    private FeedRepository feedRepository;

    // 피드 등록
    public String insertFeed(Feed newFeed, MultipartFile pic, HttpSession session) {
        log.info("feedService.insertFeed");
        String result = null;

        try {
            if (pic != null){
                newFeed = fileUpload(newFeed,pic, session);
            } else {
                newFeed.setFeedImg("이미지 원래 이름");
                newFeed.setFeedSaveimg("저장된 기본이미지 이름");
            }

            feedRepository.save(newFeed);
            log.info("등록 성공");
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            log.info("등록 실패");
            result = "fail";
        }
        return result;
    }

    public Feed fileUpload(Feed feed, MultipartFile pic, HttpSession session) throws Exception{
        log.info("feedService.fileupload()");
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);

        realPath += "images/";
        File folder = new File(realPath);
        if (!folder.isDirectory()){
            folder.mkdir();
        }

        String orname = pic.getOriginalFilename();
        feed.setFeedImg(orname);
        String sysname = System.currentTimeMillis() + orname.substring(orname.lastIndexOf("."));
        feed.setFeedSaveimg(sysname);
        File file = new File(realPath+sysname);
        pic.transferTo(file);

        return feed;
    }


    public List<Feed> getAllFeedList() {
        log.info("feedService.getAllFeedList()");
        Iterable<Feed> feeds = feedRepository.findAll(Sort.by(Sort.Direction.DESC, "feedDate"));
        if (feeds == null){
            return null;
        } else {
            return (List<Feed>) feeds;
        }
    }
}
