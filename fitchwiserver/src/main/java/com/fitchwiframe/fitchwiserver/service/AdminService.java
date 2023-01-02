package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log
public class AdminService {

  @Autowired
  private FacilitiesRepository facilitiesRepository;
  @Autowired
  private NodayRepository nodayRepository;
  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private ReportRepository reportRepository;
  @Autowired
  private ReportDetailRepository reportDetailRepository;

  public Iterable<Facilities> getAllFacilitiesList() {
    log.info("getAllFacilitiesList()");
    Iterable<Facilities> fList = facilitiesRepository.findAll();
    return fList;
  }

  //시설 추가
  public String insertFacilities(Facilities facilities) {
    log.info("adminService.insertfacilities()");
    String result = "fail";
    try {
      facilitiesRepository.save(facilities);
      result = "ok";

    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //시설 정보 조회
  public Facilities getFacilitiesInfo(Long facilitiesCode) {
    Facilities facilities = new Facilities();
    try {
      facilities = facilitiesRepository.findById(facilitiesCode).get();

    } catch (Exception e) {
      e.printStackTrace();
    }
    return facilities;

  }

  //시설 삭제
  public String deleteFacilities(Long facilitiesCode) {
    log.info("adminService.deleteFacilities()");
    String result = "fail";
    try {
      facilitiesRepository.deleteById(facilitiesCode);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //시설 정보 수정
  public String updateFacilities(Facilities newFacilities, Long facilitiesCode) {
    log.info("adminService.updateFacilities()");
    String result = "fail";
    try {
      newFacilities.setFacilitiesCode(facilitiesCode);
      facilitiesRepository.save(newFacilities);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //이용불가일 조회
  public List<String> getNodayList(Long facilitiesCode) {
    log.info("adminService.getNoday()");
    List<String> nodayDateList = new ArrayList<>();
    try {
      List<Noday> nodayList = nodayRepository.findAllByFacilitiesCode(facilitiesRepository.findById(facilitiesCode).orElseGet(Facilities::new));
      for (Noday noday : nodayList) {
        nodayDateList.add(noday.getNodayDate());
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return nodayDateList;
  }

  //이용불가일 추가
  public String addNodayList(List<String> noDayToSend, Long facilitiesCode) {
    log.info("adminService.addNodayList()");
    String result = "fail";
    try {
      Facilities facilities = facilitiesRepository.findById(facilitiesCode).get();
      for (String date : noDayToSend) {
        Noday noday = new Noday();
        noday.setNodayDate(date);
        noday.setFacilitiesCode(facilities);
        nodayRepository.save(noday);

      }
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //이용불가일 삭제
  public String deleteNodayList(List<String> noDayToSend, Long facilitiesCode) {
    log.info("adminService.deleteNodayList()");
    String result = "fail";
    try {
      Facilities facilities = facilitiesRepository.findById(facilitiesCode).get();
      List<Noday> allByFacilitiesCode = nodayRepository.findAllByFacilitiesCode(facilities);
      for (String date : noDayToSend) {
        for (Noday noday : allByFacilitiesCode) {
          if (noday.getNodayDate().equals(date)) {
            nodayRepository.delete(noday);
          }
        }
        result = "ok";
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //신고하기
  public String report(Report report) {
    log.info(report.toString());
    log.info("adminService.report()");
    System.out.println("report = " + report);
    String result = "fail";
    log.info(report.toString());

    try {
      Member targetMember = memberRepository.findById(report.getMemberEmail().getMemberEmail()).get();
      Report existingReport = reportRepository.findByReportCategoryAndReportTargetAndMemberEmail(report.getReportCategory(), report.getReportTarget(), targetMember);
      if (existingReport == null) {//없으면 저장
        report.setMemberEmail(targetMember);
        Report savedReport = reportRepository.save(report);
        ReportDetail reportDetail = report.getReportDetailList().get(0);
        reportDetail.setReportCode(savedReport);
        reportDetail.setMemberEmail(memberRepository.findById(reportDetail.getMemberEmail().getMemberEmail()).get());
        reportDetailRepository.save(reportDetail);
        result="ok";
      }else{
        ReportDetail reportDetail = report.getReportDetailList().get(0);
        reportDetail.setReportCode(existingReport);
        reportDetail.setMemberEmail(memberRepository.findById(reportDetail.getMemberEmail().getMemberEmail()).get());
        reportDetailRepository.save(reportDetail);
        result="ok";
      }


    } catch (Exception e) {
      e.printStackTrace();
    }

    return result;
  }

  //신고여부 확인
  public String checkReported(String user, Long target, String targetMember) {
    log.info("adminService.checkReported()");
    String result = "fail";


    try {
      Member memberReported = memberRepository.findById(targetMember).get();
      Member memberReporting = memberRepository.findById(user).get();
      List<Report> reportedList = reportRepository.findAllByMemberEmailAndReportTarget(memberReported, target);//target의 신고내역
      log.info("reportedList = " + reportedList.isEmpty());

      if (reportedList.isEmpty()) {
        result = "ok";

      } else {
        if (target != 0) {//게시글 신고
          for (Report report : reportedList) {
            ReportDetail reportDetail = reportDetailRepository.findByReportCodeAndMemberEmail(report,memberReporting);
            System.out.println("reportDetail = " + reportDetail);
            if (reportDetail!=null) {
              result = "reported";
            } else {
              result = "ok";
            }
          }
        } else {//회원신고
          for (Report report : reportedList) {
            ReportDetail reportDetail = reportDetailRepository.findByReportCodeAndMemberEmail(report,memberReporting);
            if (reportDetail!=null) {
              result = "reported";
            } else {
              result = "ok";
            }
          }
        }
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  //신고 목록 조회
  public List<Report> getReportList() {
    log.info("adminService.getReportList()");
    List<Report> reportWithDetailList = new ArrayList<>();
    try {
      List<Report> reportList = reportRepository.findAll();

      for (Report report : reportList) {
        report.getMemberEmail().setMemberPwd("");
        List<ReportDetail> reportDetailList = reportDetailRepository.findAllByReportCodeOrderByReportDetailDateDesc(report);
        for (ReportDetail reportDetail : reportDetailList) {
          reportDetail.getMemberEmail().setMemberPwd("");
        }
        report.setReportDetailList(reportDetailList);
        reportWithDetailList.add(report);
      }

    } catch (Exception e) {
      e.printStackTrace();
    }

    return reportWithDetailList;
  }


//  public Report getReport(Long reportCode) {
//    log.info("adminService.getReport()");
//    return reportRepository.findById(reportCode).get();
//  }
}
