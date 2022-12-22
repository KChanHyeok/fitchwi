import React from "react";
import { Box } from "@mui/material";

const TogetherMain = ({togetherList}) => {
    return (
        <Box flex={4} p={2}>
            {
                togetherList.map((data) => (
                    <div key={data.togetherCode}>
                        {data.togetherTitle}<br/>
                    </div>
                ))
            }
        </Box>
    )
}
export default TogetherMain;