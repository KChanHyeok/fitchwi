package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import org.springframework.data.repository.CrudRepository;


import javax.transaction.Transactional;
import java.util.List;

public interface TalkRepository extends CrudRepository<Talk, Long> {
    List<Talk> findAllByOrderByTalkOpenCodeDesc();
    @Transactional
    void deleteAllByTalkOpenCode(TalkOpened talkOpenCode);


    List<Talk> findByTalkTitleLike(String searchText);

  Talk findByTalkOpenCode(TalkOpened to);

  List<Talk> findAllByTalkCategory(String talkCategory);
}
