package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface FeedRepository extends CrudRepository<Feed, Long> {
    Iterable<Feed> findAll(Sort feedDate);
    
}
