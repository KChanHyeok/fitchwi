import { Box, Stack } from "@mui/material";
import FeedAdd from "./components/FeedAdd";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";

function index() {
  return (
    <Box>
      <Navbar />
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
