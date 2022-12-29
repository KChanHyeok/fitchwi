package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.FeedFile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FeedFileRepository extends CrudRepository<FeedFile, Long> {
    List<FeedFile> findByFeedCode(Long feedCode);

    @Transactional
    void deleteAllByFeedCode(Long feedCode);
}
