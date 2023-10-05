import { Box, IconButton, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../../Themes/themes.js";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    // Update theme based on preferred mode when it changes
    colorMode.toggleColorMode(preferredMode ? 'dark' : 'light');
  }, [preferredMode, colorMode]);

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/*<IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
          </IconButton>*/}
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