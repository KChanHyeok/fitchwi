import React from "react";
import Sidebar from "../../layout/Sidebar";
import TogetherMain from "./components/togetherMain";
import { Box, Stack } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";

const Together = () => {
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