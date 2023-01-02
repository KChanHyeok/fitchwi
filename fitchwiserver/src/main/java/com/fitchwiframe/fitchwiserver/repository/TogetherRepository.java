package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.Together;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TogetherRepository extends CrudRepository<Together, Long> {

    List<Together> findByTogetherTitleLike(String searchText);
}
