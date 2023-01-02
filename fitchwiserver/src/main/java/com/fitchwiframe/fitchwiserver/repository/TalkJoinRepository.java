package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkJoin;
import org.springframework.data.repository.CrudRepository;

public interface TalkJoinRepository extends CrudRepository<TalkJoin, Long> {
    TalkJoin findByMemberEmailAndTalkCode(Member member, Talk talkCode);
}
