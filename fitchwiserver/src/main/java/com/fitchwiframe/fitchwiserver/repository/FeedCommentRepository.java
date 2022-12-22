package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedCommentRepository extends CrudRepository<FeedComment, Long> {
    List<FeedComment> findByFeedCode(Long feedCode);
}
