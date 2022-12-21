import { Stack } from "@mui/system";
import React from "react";
import Sidebar from "../../layout/Sidebar";
import TalkMain from "./components/TalkMain";
import TalkOpened from "./components/TalkOpened";

function index() {
    const id = sessionStorage.getItem("id");
    console.log(id);

    return (
        <>
        <Stack direction="row" spacing={7} justifyContent="space-between">
            <Sidebar />
            <TalkMain />
            <TalkOpened memberEmail={id} />
        </Stack>
        </>
    );
}

export default index;