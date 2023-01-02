package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface TalkTagRepository extends CrudRepository<TalkTag, Integer> {
    @Transactional
    void deleteAllByTalkCode(Talk talkCode);
}
