import React from "react";
import { Box, IconButton, useMediaQuery, Menu, MenuItem, } from "@mui/material";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import { useContext, useEffect } from "react";
import { ColorModeContext } from "../../../Themes/themes.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";


const NotificationsButton = () => {
  return (
    <IconButton>
      <NotificationsOutlinedIcon />
    </IconButton>
  );
};

// Component for handling settings menu
const SettingsMenu = ({setIsAuthenticated}) => {
  const navigate = useNavigate();

  const handelLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {/* Settings button */}
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            <SettingsOutlinedIcon/>
          </IconButton>
          {/* Settings menu */}
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={handelLogout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

// Main Topbar component
const Topbar = ({ isCollapsed, setIsAuthenticated}) => {

  const colorMode = useContext(ColorModeContext);

  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    colorMode.toggleColorMode(preferredMode ? 'dark' : 'light');
  }, [preferredMode, colorMode]);

  return (
    <Box width={isCollapsed ? "99rem" : "87rem"} sx={{ transition: "width 0.3s ease-in-out" }}>
      <Box display="flex" justifyContent="right" p={2}>
        <NotificationsButton />
        <SettingsMenu setIsAuthenticated={setIsAuthenticated}/>
      </Box>
    </Box>
  );
};

export default Topbar;
