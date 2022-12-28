import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import TogetherMain from "./components/togetherMain";
import { Box, Stack } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";
import { Route, Routes} from "react-router-dom";
import TogetherArt from "./components/togetherArt";
import TogetherInfo from "./components/togetherInfo";
import AddButton from "./components/common/addButton";


const Together = () => {
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [togetherList, setTogetherList] = useState([]);
    const [togetherJoinList, setTogetherJoinList] = useState([]);
    
    useEffect(() => {
        getAllFacilitiesList();
        getAllTogetherList();
        getAllTogetherJoinList();
    },[])

    const getAllFacilitiesList = async () => {
        await axios.get("/getAllFacilitiesList").then((res) => {
            setFacilitiesList(res.data)
        }).catch((error) => console.log(error))
    }    
    const getAllTogetherList = async () => {
        await axios.get("/getAllTogetherList").then((res) => {
            setTogetherList(res.data)
        }).catch((error) => console.log(error))
    }
    const getAllTogetherJoinList = async () => {
        await axios.get("/getAllTogetherJoinList").then((res) => {
            setTogetherJoinList(res.data)
        }).catch((error) => console.log(error))
    }

    return (
        <Box>
            <Stack direction="row" spacing={7} justifyContent="space-between">
                <Sidebar pageurl={"together"}/>
                <Routes>
                    <Route path="/*" element={<TogetherMain togetherList={togetherList}/>}/>
                    <Route path="art" element={<TogetherArt />} />
                    <Route path="/:togetherPageCode" element={<TogetherInfo refreshTogetherJoinList={getAllTogetherJoinList} togetherJoinList={togetherJoinList} togetherList={togetherList} />} />
                    <Route path="add" element={<TogetherAdd data={facilitiesList} refreshTogetherList={getAllTogetherList} />}/>
                </Routes>
                <AddButton/>
            </Stack>
        </Box>
    );
}

export default Together;