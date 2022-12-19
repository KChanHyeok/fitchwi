import { Box, Stack } from "@mui/material";
import FeedAdd from "./components/FeedAdd";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "../../layout/Sidebar";

function index() {
  return (
    <Box>
      <Stack direction="row" spacing={7} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
      <FeedAdd />
    </Box>
  );
}

export default index;
