package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherJoin;
import org.springframework.data.repository.CrudRepository;

public interface TogetherJoinRepository extends CrudRepository<TogetherJoin, Long> {
    TogetherJoin findByMemberEmailAndTogetherCode(Member member, Together togetherCode);
}
