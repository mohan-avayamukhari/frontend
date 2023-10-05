import { Box, IconButton, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../../Themes/themes.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Topbar = ({isCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    colorMode.toggleColorMode(preferredMode ? 'dark' : 'light');
  }, [preferredMode, colorMode]);

  return (
    <Box width= {isCollapsed?"99rem":"87rem"} sx={{transition:"width 0.3s ease-in-out"}}>
      <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
    </Box>
  );
};

export default Topbar;