import React from "react";
import Sidebar from "../../layout/Sidebar";
import SideMain from "./components/main";
import { Box, Stack } from "@mui/material";

const Together = () => {
    return (
        <Box>
            <Stack direction="row" spacing={7} justifyContent="space-between">
                <Sidebar/>
                <SideMain/>
            </Stack>
        </Box>
    );
}

export default Together;