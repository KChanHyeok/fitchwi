package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.entity.Noday;
import com.fitchwiframe.fitchwiserver.entity.Report;
import com.fitchwiframe.fitchwiserver.service.AdminService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Log
public class AdminController {

  @Autowired
  private AdminService adminService;

  @GetMapping("/getAllFacilitiesList")
  public Map<String, Object> getAllFacilitiesList(@RequestParam Integer pageNum) {
    log.info("adminController.getAllFacilitiesList() pageNum = " + pageNum);
    return adminService.getAllFacilitiesList(pageNum);
  }

  @PostMapping("/insertFacilities")
  public String insertFacilities(@RequestBody Facilities facilities) {
    log.info("adminController.insertFacilities();");
    return adminService.insertFacilities(facilities);
  }

  @GetMapping("/getFacilitiesInfo/{facilitiesCode}")
  public Facilities getFacilitiesInfo(@PathVariable Long facilitiesCode) {
    log.info("adminController.getFacilitiesInfo()");
    return adminService.getFacilitiesInfo(facilitiesCode);
  }

  @DeleteMapping("/deleteFacilities/{facilitiesCode}")
  public String deleteFacilities(@PathVariable Long facilitiesCode) {
    log.info("adminController.deleteFacilities();");
    return adminService.deleteFacilities(facilitiesCode);
  }

  @PutMapping("/updateFacilities/{facilitiesCode}")
  public String updateFacilities(@RequestBody Facilities newFacilities, @PathVariable Long facilitiesCode) {
    log.info("adminController.updateFacilities();");
    return adminService.updateFacilities(newFacilities, facilitiesCode);
  }

  @GetMapping("/getNodayList")
  public List<String> getNodayList(@RequestParam Long facilitiesCode) {
    log.info("adminFacilities.getNoday()");
    return adminService.getNodayList(facilitiesCode);
  }

  @GetMapping("/addNodayList")
  public String addNodayList(@RequestParam List<String> noDayToSend, @RequestParam Long facilitiesCode) {
    log.info("adminController.addNodayList()");
    return adminService.addNodayList(noDayToSend, facilitiesCode);
  }

  @DeleteMapping("/deleteNodayList")
  public String deleteNodayList(@RequestParam List<String> noDayToSend, @RequestParam Long facilitiesCode) {
    log.info("adminController.deleteNodayList()");
    return adminService.deleteNodayList(noDayToSend, facilitiesCode);
  }

  @PostMapping("/report")
  public String report(@RequestBody Report report) {
    log.info("adminController.report()");
    return adminService.report(report);
  }

  @GetMapping("/checkReported")
  public String checkReported(@RequestParam String user, @RequestParam Long target, @RequestParam String targetMember) {
    log.info("adminController.checkReported()");
    return adminService.checkReported(user, target, targetMember);
  }

  @GetMapping("/getReports")
  public Map<String, Object> getReportList(@RequestParam Integer pageNum) {
    log.info("adminController.getReportList() pageNum = "+pageNum);
    return adminService.getReportList(pageNum);
  }

  @GetMapping("/restrictMember")
  public String restrictMember(String restrictDate, String targetMemberEmail) {
    log.info("adminController.restrictMember");
    return adminService.restrictMember(restrictDate, targetMemberEmail);
  }

  @DeleteMapping("/deleteReport")
  public String deleteReport(Long reportCode) {
    log.info("adminController.deleteReport()");
    return adminService.deleteReport(reportCode);
  }
}
