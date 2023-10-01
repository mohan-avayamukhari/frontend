import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../Themes/themes.js";

const Header = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
      variant="h3"
      color={colors.grey[100]}
      fontWeight="bold"
      sx={{ m: "0 0 5px 0", textAlign: "center" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;