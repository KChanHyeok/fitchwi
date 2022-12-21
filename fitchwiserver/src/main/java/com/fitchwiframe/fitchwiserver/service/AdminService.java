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
}
