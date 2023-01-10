package com.fitchwiframe.fitchwiserver.repository;

import com.fitchwiframe.fitchwiserver.entity.Member;
import com.fitchwiframe.fitchwiserver.entity.Report;
import com.fitchwiframe.fitchwiserver.entity.ReportDetail;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ReportDetailRepository extends CrudRepository<ReportDetail, Long> {





 List<ReportDetail> findAllByReportCodeOrderByReportDetailDateDesc(Report report);


 ReportDetail findByReportCodeAndMemberEmail(Report report, Member memberReporting);

 void deleteAllByReportCode(Report reportToDelete);

  List<ReportDetail> findByMemberEmail(Member member);

 List<ReportDetail> findByReportCode(Report report);
}
