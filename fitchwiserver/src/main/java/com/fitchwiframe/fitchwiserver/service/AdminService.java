package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.*;
import com.fitchwiframe.fitchwiserver.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Log
public class AdminService {
  @Autowired
  private FeedService feedService;
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

  @Autowired
  private ManagerRepository managerRepository;

  public Iterable<Facilities> getAllFacilitiesList() {
    log.info("adminController.getAllFacilitiesList()");
    return facilitiesRepository.findAll();
  }


  public Map<String, Object> getFacilitiesList(Integer pageNum, String keyword) {
    log.info("getFacilitiesList()");
    if (pageNum == null) {
      pageNum = 1;
    }
    int listCount = 6;
    Pageable pageable = PageRequest.of((pageNum - 1), listCount, Sort.Direction.DESC, "facilitiesCode");


    Page<Facilities> result = null;

    if (keyword.equals("")) {
      result = facilitiesRepository.findAll(pageable);
    } else {
      String keywordToSearch = "%" + keyword + "%";
      result = facilitiesRepository.findByFacilitiesNameLike(keywordToSearch, pageable);
    }

    List<Facilities> facilitiesList = result.getContent();
    int totalPage = result.getTotalPages();

    Map<String, Object> mapToReturn = new HashMap<>();
    mapToReturn.put("totalPage", totalPage);
    mapToReturn.put("pageNum", pageNum);
    mapToReturn.put("facilitiesList", facilitiesList);
    mapToReturn.put("keyword",keyword);
    return mapToReturn;
  }


  //시설 추가
  public String insertFacilities(Facilities facilities) {
    log.info("adminService.insertfacilities()");
    String result = "fail";
    try {

      facilitiesRepository.save(facilities);

//    createfacilities
//      for(int i=0; i<=50; i++){
//        Facilities f = new Facilities();
//        f.setFacilitiesName("asdf"+i+i);
//        f.setFacilitiesPrice(3);
//        f.setFacilitiesPosition("asdf");
//        f.setFacilitiesManager("asdf");
//        f.setFacilitiesPhone("11");
//        f.setFacilitiesGrade("asdf");
//        facilitiesRepository.save(f);
//
//      }


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

  @Autowired
  TogetherOpenedRepository togetherOpenedRepository;

  //시설 삭제
  public String deleteFacilities(Long facilitiesCode) {
    log.info("adminService.deleteFacilities()");
    String result = "fail";
    try {
      Facilities facilities = facilitiesRepository.findById(facilitiesCode).get();
      List<TogetherOpened> togetherOpenedList = togetherOpenedRepository.findByFacilitiesCode(facilities);

      if (!(togetherOpenedList.isEmpty())) {
        result = "togetherExist";
        return result;
      }


      System.out.println("facilities = " + nodayRepository.findAllByFacilitiesCode(facilities));
      nodayRepository.deleteAll(nodayRepository.findAllByFacilitiesCode(facilities));
      System.out.println("facilitiesCode = " + facilitiesCode);

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
@Autowired TogetherRepository togetherRepository;
  //이용불가일 삭제
  public String deleteNodayList(List<String> noDayToSend, Long facilitiesCode) {
    log.info("adminService.deleteNodayList()");
    String result = "fail";
    try {
      Facilities facilities = facilitiesRepository.findById(facilitiesCode).get();


      for(String noday : noDayToSend){
        System.out.println("noday = " + noday);

        List<TogetherOpened> togetherOpenedList =  togetherOpenedRepository.findByFacilitiesCode(facilities);

        for( TogetherOpened to : togetherOpenedList){
          Together together = togetherRepository.findByTogetherOpenedCodeAndTogetherDate(to, noday);
          if(together!=null){
            result="togetherExist";
            return result;
          }

        }
      }





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
        result = "ok";
      } else {
        existingReport.setReportedCount(existingReport.getReportedCount()+1);
        ReportDetail reportDetail = report.getReportDetailList().get(0);
        reportDetail.setReportCode(existingReport);
        reportDetail.setMemberEmail(memberRepository.findById(reportDetail.getMemberEmail().getMemberEmail()).get());
        reportDetailRepository.save(reportDetail);
        result = "ok";
      }

//create report
     /* for (int i = 1; i <= 45; i++) {
        if (i == 43) {
          break;
        }
        Report report1 = new Report();
        report1.setMemberEmail(memberRepository.findById("test20@test.com").get());
        report1.setReportCategory("memberpage");
        report1.setReportTarget(0L);
        reportRepository.save(report1);

        ReportDetail reportDetail = new ReportDetail();
        reportDetail.setReportCode(report1);
        reportDetail.setMemberEmail(memberRepository.findById("test21@test.com").get());
        reportDetail.setReportDetailContent("내용" + i);
        reportDetail.setReportDetailDate("2023-01-01");
        reportDetailRepository.save(reportDetail);
      }*/


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
            ReportDetail reportDetail = reportDetailRepository.findByReportCodeAndMemberEmail(report, memberReporting);
            System.out.println("reportDetail = " + reportDetail);
            if (reportDetail != null) {
              result = "reported";
            } else {
              result = "ok";
            }
          }
        } else {//회원신고
          for (Report report : reportedList) {
            ReportDetail reportDetail = reportDetailRepository.findByReportCodeAndMemberEmail(report, memberReporting);
            if (reportDetail != null) {
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
  public Map<String, Object> getReportList(Integer pageNum, String keyword) {
    log.info("adminService.getReportList()");
    System.out.println("keyword = " + keyword);

    if (pageNum == null) {
      pageNum = 1;
    }
    int listCount = 8;

    Pageable pageable  = PageRequest.of((pageNum - 1), listCount, Sort.Direction.DESC, keyword);
    Page<Report> result = reportRepository.findAll(pageable);



    List<Report> reportList = result.getContent();
    int totalPage = result.getTotalPages();


    Map<String, Object> mapToReturn = new HashMap<>();
    mapToReturn.put("totalPage", totalPage);
    mapToReturn.put("pageNum", pageNum);
    mapToReturn.put("keyword", keyword);


    try {


      for (Report report : reportList) {
        report.getMemberEmail().setMemberPwd(null);
        List<ReportDetail> reportDetailList = reportDetailRepository.findAllByReportCodeOrderByReportDetailDateDesc(report);
        for (ReportDetail reportDetail : reportDetailList) {
          reportDetail.getMemberEmail().setMemberPwd(null);
        }
        report.setReportDetailList(reportDetailList);

      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    mapToReturn.put("reportList", reportList);
    return mapToReturn;
  }

  public String restrictMember(String restrictDate, String targetMemberEmail) {
    log.info("restrictMemberEmail()");
    System.out.println("restrictDate = " + restrictDate);
    System.out.println("targetMemberEmail = " + targetMemberEmail);
    String result = "fail";
    try {
      Member targetMember = memberRepository.findById(targetMemberEmail).get();
      targetMember.setMemberRestriction(restrictDate);
      System.out.println("targetMember = " + targetMember);
      memberRepository.save(targetMember);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;

  }

  @Transactional
  public String deleteReport(Long reportCode) {
    String result = "fail";
    log.info("adminService.deleteReport()");
    try {
      Report reportToDelete = reportRepository.findById(reportCode).get();

      reportDetailRepository.deleteAllByReportCode(reportToDelete);

      reportRepository.delete(reportToDelete);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  public String updateReportState(Long reportCode, String reportTreatment) {
    String result = "fail";
    log.info("adminService.updateReportState()");
    try {
      Report report = reportRepository.findById(reportCode).get();
      if (reportTreatment.equals("신고 대상 삭제")) {
        report.setReportState(reportTreatment);
      } else {
        report.setReportState(reportTreatment + "까지 이용 제한");
      }

      reportRepository.save(report);
      result = "ok";
    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  public void deleteAllByMember(Member member) {
    //내가 신고한 reportdetail
    List<ReportDetail> reportDetailList = reportDetailRepository.findByMemberEmail(member);
    System.out.println("reportDetailList = " + reportDetailList);
    if (!(reportDetailList.isEmpty())) {
      reportDetailRepository.deleteAll(reportDetailList);
    }

    //내가 신고받은 report
    List<Report> reportList = reportRepository.findByMemberEmail(member);

    if (!(reportList.isEmpty())) {
      for (Report report : reportList) {
        //나를 신고한 reportdetail
        List<ReportDetail> reportedDetailList = reportDetailRepository.findByReportCode(report);
        reportDetailRepository.deleteAll(reportedDetailList);
      }
      System.out.println("reportList = " + reportList);

      reportRepository.deleteAll(reportList);
    }


  }

  public String managerLogin(Manager manager) {
    log.info("adminService.managerLogin()");
    String result = "fail";
    System.out.println("manager = " + manager);
    try {
      Optional<Manager> byId = managerRepository.findById(manager.getManagerId());
      if (byId.isPresent()) {
        System.out.println("byId.get() = " + byId.get());
        Manager dbManager = byId.get();
        if (dbManager.getManagerPwd().equals(manager.getManagerPwd())) {
          result = "ok";
        } else {
          result = "wrong pwd";
        }

      } else {
        result = "no data";
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    return result;


  }
}
