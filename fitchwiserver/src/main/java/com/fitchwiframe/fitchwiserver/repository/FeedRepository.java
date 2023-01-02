package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedRepository extends CrudRepository<Feed, Long> {
    List<Feed> findAllByOrderByFeedDateDesc();

    List<Feed> findAllByMemberEmail(Member member);

    List<Feed> findAll(Pageable feedPageable);

    List<Feed> findAllByFeedCategoryContains(String feedCategory, Pageable feedPageable);

}
