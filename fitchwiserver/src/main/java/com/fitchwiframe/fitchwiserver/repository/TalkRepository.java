package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import org.springframework.data.repository.CrudRepository;


import javax.transaction.Transactional;

public interface TalkRepository extends CrudRepository<Talk, Long> {
    @Transactional
    void deleteAllByTalkOpenCode(TalkOpened talkOpenCode);


    List<Talk> findByTalkTitleLike(String searchText);

}
