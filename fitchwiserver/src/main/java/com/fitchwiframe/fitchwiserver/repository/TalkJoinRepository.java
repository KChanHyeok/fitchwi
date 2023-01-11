package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkJoin;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TalkJoinRepository extends CrudRepository<TalkJoin, Long> {
    TalkJoin findByMemberEmailAndTalkCode(Member member, Talk talkCode);

    @Transactional
    void deleteAllByTalkCode(Talk talkCode);

    List<TalkJoin> findAllByMemberEmail(Member member);

  Long countByTalkCodeAndTalkJoinStateContains(Talk talk, String joinState);
}
