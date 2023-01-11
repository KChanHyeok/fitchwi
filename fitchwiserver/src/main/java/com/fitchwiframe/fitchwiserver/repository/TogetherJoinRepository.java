package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherJoin;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TogetherJoinRepository extends CrudRepository<TogetherJoin, Long> {
    TogetherJoin findByMemberEmailAndTogetherCode(Member member, Together togetherCode);
    List<TogetherJoin> findAllByMemberEmail(Member member);

  Long countByTogetherCode(Together together);

  List<TogetherJoin> findByTogetherCodeAndTogetherJoinStateContains(Together together, String wait);

  Long countByTogetherCodeAndTogetherJoinStateContains(Together together, String joinState);
}
