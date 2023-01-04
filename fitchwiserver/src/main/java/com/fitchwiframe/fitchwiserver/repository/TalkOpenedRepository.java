package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.TalkOpened;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TalkOpenedRepository extends CrudRepository<TalkOpened, Long> {
  List<TalkOpened> findAllByMemberEmail(Member member);
}
