import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import TogetherMain from "./components/togetherMain";
import { Box, Stack } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";


const Together = () => {
    const [facilitiesList, setFacilitiesList] = useState([]);
    
    useEffect(() => {
        getAllFacilitiesList();
    },[])

    const getAllFacilitiesList = () => {
        axios.get("/getAllFacilitiesList").then((res) => {
            setFacilitiesList(res.data)
            // facilitiesCode: 0,
            // facilitiesGrade: "",
            // facilitiesManager: "",
            // facilitiesName: "",
            // facilitiesPhone: "",
            // facilitiesPosition: "",
            // facilitiesPrice: "",
        }).catch((error) => console.log(error))
    }    


    return (
        <Box>
            <Stack direction="row" spacing={7} justifyContent="space-between">
                <Sidebar/>
                <TogetherMain/>
                <TogetherAdd data={facilitiesList}/>
            </Stack>
        </Box>
    );
}

export default Together;