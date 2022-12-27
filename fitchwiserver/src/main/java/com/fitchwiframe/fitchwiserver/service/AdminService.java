package com.fitchwiframe.fitchwiserver.service;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.repository.FacilitiesRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log
public class AdminService {

    @Autowired
    private FacilitiesRepository facilitiesRepository;

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
      try{
        facilities = facilitiesRepository.findById(facilitiesCode).get();

      }catch (Exception e){
        e.printStackTrace();
      }
      return facilities;

  }

  public String deleteFacilities(Long facilitiesCode) {
      log.info("adminService.deleteFacilities()");
      String result = "fail";
      try{
        facilitiesRepository.deleteById(facilitiesCode);
        result ="ok";
      }catch(Exception e){
        e.printStackTrace();
      }
    return result;
  }

  public String updateFacilities(Facilities newFacilities, Long facilitiesCode) {
      log.info("adminService.updateFacilities()");
      String result ="fail";
      try{
        newFacilities.setFacilitiesCode(facilitiesCode);
        facilitiesRepository.save(newFacilities);
        result="ok";
      }catch (Exception e){
        e.printStackTrace();
      }
      return result;
  }
}
