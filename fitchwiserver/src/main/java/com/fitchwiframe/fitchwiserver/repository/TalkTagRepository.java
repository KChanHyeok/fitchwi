package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkTag;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface TalkTagRepository extends CrudRepository<TalkTag, Integer> {
    TalkTag findByTalkCode(Long talkCode);

    @Transactional
    void deleteAllByTalkCode(Talk talkCode);
}
