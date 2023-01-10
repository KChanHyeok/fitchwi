import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckMangerPwdModal from "./components/CheckMangerPwdModal";
import AddFacilities from "./components/facilities/AddFacilities";
import EditFacilities from "./components/facilities/EditFacilities";
import Facilities from "./components/facilities/Facilities";
import ViewFacilities from "./components/facilities/ViewFacilities";
import Manager from "./components/Manager";
import ReportManagement from "./components/report/ReportManagement";
import TogeterManagement from "./components/togethermanagement/TogetherManagement";

export default function ManagerIndex({ setIsManager, isManager }) {
  // const [isManager, setIsManager] = useState(false);

  return (
    <Box>
      {isManager === false ? (
        <CheckMangerPwdModal setIsManager={setIsManager} />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Manager />} />

            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/insertFacilities" element={<AddFacilities />} />
            <Route
              path="/facilities/updateFacilities/:facilitiesCode"
              element={<EditFacilities />}
            />
            <Route
              path="/facilities/getFacilitiesInfo/:facilitiesCode"
              element={<ViewFacilities />}
            />
            <Route path="/report" element={<ReportManagement />} />
            <Route path="/togetherManagement" element={<TogeterManagement />} />
          </Routes>
        </div>
      )}
    </Box>
  );
}
