package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedTag;
import org.springframework.data.repository.CrudRepository;


public interface FeedTagRepository extends CrudRepository<FeedTag, Integer> {
    FeedTag findByFeedCode(Long feedCode);
}
