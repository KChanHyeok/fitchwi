package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MemberRepository extends CrudRepository<Member, String> {


  Member findByMemberPhone(String memberPhone);

}
