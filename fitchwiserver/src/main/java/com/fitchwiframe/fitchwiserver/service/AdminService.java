package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.entity.Noday;
import com.fitchwiframe.fitchwiserver.repository.FacilitiesRepository;
import com.fitchwiframe.fitchwiserver.repository.NodayRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log
public class AdminService {

  @Autowired
  private FacilitiesRepository facilitiesRepository;
  @Autowired
  private NodayRepository nodayRepository;

  public Iterable<Facilities> getAllFacilitiesList() {
    log.info("getAllFacilitiesList()");
    Iterable<Facilities> fList = facilitiesRepository.findAll();
    return fList;
  }

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

  public Facilities getFacilitiesInfo(Long facilitiesCode) {
    Facilities facilities = new Facilities();
    try {
      facilities = facilitiesRepository.findById(facilitiesCode).get();

    } catch (Exception e) {
      e.printStackTrace();
    }
    return facilities;

  }

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
}
