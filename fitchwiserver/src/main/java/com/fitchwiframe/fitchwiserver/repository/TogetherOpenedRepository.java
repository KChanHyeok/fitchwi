package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.TogetherOpened;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TogetherOpenedRepository extends CrudRepository<TogetherOpened, Long> {
  List<TogetherOpened> findAllByMemberEmail(Member member);

  List<TogetherOpened> findByFacilitiesCode(Facilities facilities);


}
