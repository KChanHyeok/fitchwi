package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedRepository extends CrudRepository<Feed, Long> {
    List<Feed> findAllByOrderByFeedDateDesc();

//    List<Feed> findAllByMemberEmail(Member member);

    List<Feed> findAll(Pageable feedPageable);

    List<Feed> findAllByFeedCategoryContains(String feedCategory, Pageable feedPageable);

    List<Feed> findByFeedTagLike(String searchText);



    List<Feed> findAllByMemberEmailOrderByFeedDateDesc(Member member);

    List<Feed> findAllByFeedClassificationcode(Long feedClassificationcode);

    List<Feed> findDistinctByOrderByMemberEmail();

    Long countByMemberEmail(Member member);
}
