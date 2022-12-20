import React from "react";
import Sidebar from "../../layout/Sidebar";
import TogetherMain from "./components/togetherMain";
import { Box, Stack } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";


const Together = () => {
    
    axios.get("/getAllFeedList").then((res) => {
        console.log(res)
    })


    return (
        <Box>
            <Stack direction="row" spacing={7} justifyContent="space-between">
                <Sidebar/>
                <TogetherMain/>
                <TogetherAdd/>
            </Stack>
        </Box>
    );
}

export default Together;