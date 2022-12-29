package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;


public interface FeedTagRepository extends CrudRepository<FeedTag, Integer> {
    FeedTag findByFeedCode(Long feedCode);

    @Transactional
    void deleteAllByFeedCode(Long feedCode);
}
