package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Talk;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TalkRepository extends CrudRepository<Talk, Long> {

    List<Talk> findByTalkTitleLike(String searchText);
}
