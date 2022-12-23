package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Follow;
import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FollowRepository extends CrudRepository<Follow, Long> {
  Follow findByMemberEmailAndFollowId(Member member, String pageOwner);

  List<Follow> findAllByMemberEmail(Member member);


  List<Follow> findAllByFollowId(String pageOwner);
}
