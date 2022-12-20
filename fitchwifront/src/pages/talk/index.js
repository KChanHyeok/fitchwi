import React from "react";
import TalkOpened from "./components/TalkOpened";

function index() {
    const id = sessionStorage.getItem("id");
    console.log(id);

    return (
        <TalkOpened memberEmail={id} />
    );
}

export default index;