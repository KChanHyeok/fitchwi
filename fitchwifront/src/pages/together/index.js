import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import TogetherMain from "./components/togetherMain";
import { Box, Stack } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";


const Together = () => {
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [togetherList, setTogetherList] = useState([]);
    
    useEffect(() => {
        getAllFacilitiesList();
        getAllTogetherList();
    },[])

    const getAllFacilitiesList = () => {
        axios.get("/getAllFacilitiesList").then((res) => {
            setFacilitiesList(res.data)
        }).catch((error) => console.log(error))
    }    
    const getAllTogetherList = () => {
        axios.get("/getAllTogetherList").then((res) => {
            setTogetherList(res.data)
        }).catch((error) => console.log(error))
    }

    return (
        <Box>
            <Stack direction="row" spacing={7} justifyContent="space-between">
                <Sidebar/>
                <TogetherMain togetherList={togetherList}/>
                <TogetherAdd data={facilitiesList}/>
            </Stack>
        </Box>
    );
}

export default Together;