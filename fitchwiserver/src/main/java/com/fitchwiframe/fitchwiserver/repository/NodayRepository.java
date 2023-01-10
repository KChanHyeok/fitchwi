package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.entity.Noday;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NodayRepository extends CrudRepository<Noday, Long> {
  List<Noday> findAllByFacilitiesCode(Facilities facilities);

}
