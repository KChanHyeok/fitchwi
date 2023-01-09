package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedLike;
import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FeedLikeRepository extends CrudRepository<FeedLike, Long> {
    FeedLike findByFeedCodeAndMemberEmail(Long feedCode, Member member);

    List<FeedLike> findByFeedCode(Long feedCode);

    @Transactional
    void deleteAllByFeedCode(Long feedCode);

  List<FeedLike> findByMemberEmail(Member member);
}
