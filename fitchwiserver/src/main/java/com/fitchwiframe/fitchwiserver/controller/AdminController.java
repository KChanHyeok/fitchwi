package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.service.AdminService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
