package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedRepository extends CrudRepository<Feed, Long> {
//    Iterable<Feed> findAll(Sort feedDate);

    List<Feed> findAllByOrderByFeedDateDesc();

    List<Feed> findAllByMemberEmail(Member member);
}
