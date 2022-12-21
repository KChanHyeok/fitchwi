package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.FeedFile;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedFileRepository extends CrudRepository<FeedFile, Long> {
    List<FeedFile> findByFeedCode(Feed feed);

}
