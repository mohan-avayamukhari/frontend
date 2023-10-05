import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../Themes/themes.js";
import {
  HomeOutlined,
  MenuOutlined,
  TravelExploreOutlined,
  ReportGmailerrorredOutlined,
  PersonAddOutlined,
  HelpOutlineOutlined,
  ListAltOutlined,
  GroupOutlined,
} from "@mui/icons-material";

const Item = ({ title, path, to, icon, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  return (
    <MenuItem
      active={location.pathname === path}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({isCollapsed, setIsCollapsed}) => {
  const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");
  
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${preferredMode ? "white" : "black" } !important`,
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${preferredMode ? "#242424" : "#adb5bd"} !important`,
        },
        
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="../../images/admin.png "
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              path="/dashboard"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Cluster Management
              </Typography>
            )}

            <Item
              title="Discovery"
              path="/discovery"
              to="/discovery"
              icon={<TravelExploreOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="DR Policy"
              path="/dr-policy"
              to="/dr-policy"
              icon={<ListAltOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              path="/reports"
              to="/reports"
              icon={<ReportGmailerrorredOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Admin Tools
              </Typography>
            )}

            <Item
              title="Create New User"
              path="/create-user"
              to="/create-user"
              icon={<PersonAddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Users"
              path="/all-users"
              to="/all-users"
              icon={<GroupOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              path="/faqs"
              to="/faqs"
              icon={<HelpOutlineOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;