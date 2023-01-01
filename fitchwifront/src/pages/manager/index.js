import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFacilities from "./components/facilities/AddFacilities";
import EditFacilities from "./components/facilities/EditFacilities";
import Facilities from "./components/facilities/Facilities";
import ViewFacilities from "./components/facilities/ViewFacilities";
import Manager from "./components/Manager";
import ManagerSideBar from "./components/ManagerSideBar";
import ReportDetail from "./components/report/ReportDetail";
import ReportManagement from "./components/report/ReportManagement";

export default function index() {
  return (
    <Box>
      <ManagerSideBar pageurl={"manager"} />
      <Routes>
        <Route path="/" element={<Manager />} />

        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/insertFacilities" element={<AddFacilities />} />
        <Route path="/facilities/updateFacilities/:facilitiesCode" element={<EditFacilities />} />
        <Route path="/facilities/getFacilitiesInfo/:facilitiesCode" element={<ViewFacilities />} />
        <Route path="/report" element={<ReportManagement />} />
        <Route path="/report/detail/:reportCode" element={<ReportDetail />} />
      </Routes>
    </Box>
  );
}
