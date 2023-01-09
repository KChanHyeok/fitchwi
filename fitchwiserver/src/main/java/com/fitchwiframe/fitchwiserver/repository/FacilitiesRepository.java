package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface FacilitiesRepository extends CrudRepository<Facilities, Long> {

  Page<Facilities> findAll(Pageable pageable);

  Page<Facilities> findByFacilitiesNameLike(String keywordToSearch, Pageable pageable);

}
