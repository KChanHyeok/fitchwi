package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.TogetherJoin;
import com.fitchwiframe.fitchwiserver.entity.TogetherJoinPayment;
import org.springframework.data.repository.CrudRepository;

public interface TogetherJoinPayRepository extends CrudRepository<TogetherJoinPayment, String> {
    TogetherJoinPayment findByTogetherJoinCode(TogetherJoin togetherJoin);
}
