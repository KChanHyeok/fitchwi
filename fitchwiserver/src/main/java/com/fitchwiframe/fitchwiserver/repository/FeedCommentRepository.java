package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedComment;
import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FeedCommentRepository extends CrudRepository<FeedComment, Long> {
    List<FeedComment> findByFeedCode(Long feedCode);

    List<FeedComment> findAllByFeedCode(Long feedCode);

    @Transactional
    void deleteAllByFeedCode(Long feedCode);

  List<FeedComment> findByMemberEmail(Member member);
}
