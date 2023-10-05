import { Box } from "@mui/material";
import Sidebar from "../Pages/global/sidebar";
import Topbar from "../Pages/global/Topbar";

const Layout = ({ children, isCollapsed, setIsCollapsed }) => (
  <div className="app">
    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    <Box display="flex" flexDirection="column">
    <Topbar isCollapsed={isCollapsed}/>
    <main className="content">{children}</main>
    </Box>
  </div>
);

export default Layout