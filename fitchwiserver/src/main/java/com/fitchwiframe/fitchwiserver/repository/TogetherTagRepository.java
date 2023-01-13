package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Together;
import com.fitchwiframe.fitchwiserver.entity.TogetherTag;
import org.springframework.data.repository.CrudRepository;

public interface TogetherTagRepository extends CrudRepository<TogetherTag, Long> {
    TogetherTag findByTogetherCode(Together together);
}
