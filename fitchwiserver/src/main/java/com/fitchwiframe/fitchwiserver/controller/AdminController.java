package com.fitchwiframe.fitchwiserver.controller;

import com.fitchwiframe.fitchwiserver.entity.Facilities;
import com.fitchwiframe.fitchwiserver.service.AdminService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getAllFacilitiesList")
    public Iterable<Facilities> getAllFacilitiesList() {
        return adminService.getAllFacilitiesList();
    }
}
