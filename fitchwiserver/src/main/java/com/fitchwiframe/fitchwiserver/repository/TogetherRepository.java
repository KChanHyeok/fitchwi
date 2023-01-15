package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Feed;
import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherOpened;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface TogetherRepository extends CrudRepository<Together, Long> {

    List<Together> findByTogetherTitleLike(String searchText);
  Together findBytogetherOpenedCode(TogetherOpened to);


  Page<Together> findByTogetherStateLike(String cancel, Pageable pageable);

  Page<Together> findByTogetherStateAndTogetherTitleLike(String cancel, String keywordToSearch, Pageable pageable);

  Together findByTogetherOpenedCodeAndTogetherDate(TogetherOpened to, String noday);

}
