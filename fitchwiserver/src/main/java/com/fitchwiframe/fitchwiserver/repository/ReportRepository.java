package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends CrudRepository<Report, Long> {


  List<Report> findAllByMemberEmailAndReportTarget(Member memberReported, Long target);


  Report findByReportCategoryAndReportTargetAndMemberEmail(String reportCategory, Long reportTarget, Member targetMember);

  Page<Report> findAll(Pageable pageable);

  List<Report> findByMemberEmail(Member member);


}
