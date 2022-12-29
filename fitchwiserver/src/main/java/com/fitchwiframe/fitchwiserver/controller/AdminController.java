package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.entity.Noday;
import com.fitchwiframe.fitchwiserver.service.AdminService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getAllFacilitiesList")
    public Iterable<Facilities> getAllFacilitiesList() {
        return adminService.getAllFacilitiesList();
    }

    @PostMapping("/insertFacilities")
    public String insertFacilities(@RequestBody Facilities facilities){
        log.info("adminController.insertFacilities();");
        return adminService.insertFacilities(facilities);
    }

    @GetMapping("/getFacilitiesInfo/{facilitiesCode}")
    public Facilities getFacilitiesInfo(@PathVariable Long facilitiesCode){
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
    public List<String> getNodayList(@RequestParam Long facilitiesCode){
        log.info("adminFacilities.getNoday()");
        return adminService.getNodayList(facilitiesCode);
    }
}
