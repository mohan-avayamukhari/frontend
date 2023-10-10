import React, { useState } from "react";
import { Box, IconButton, useMediaQuery, Menu, MenuItem, Dialog, DialogContent, InputLabel, TextField, Button, Snackbar, Alert,} from "@mui/material";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import { useContext, useEffect, useMemo } from "react";
import { ColorModeContext } from "../../../Themes/themes.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup"
import { changePsw, removeToken } from "../../Services/Login.js";


const NotificationsButton = () => {
  return (
    <IconButton>
      <NotificationsOutlinedIcon />
    </IconButton>
  );
};

// Component for handling settings menu
const SettingsMenu = () => {
  const[isFormVisible, setIsFormVisible] = useState(false)
  const[isPswChange, setIsPswChange] = useState(false)
  const navigate = useNavigate();
  const initialValues = {
    currentPsw: "",
    newPsw: "",
    confirmPsw:""
  };

  const nameRegex = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, []); 

  const checkoutSchema = yup.object().shape({
    currentPsw: yup.string().required("Please enter your current password"),
    newPsw: yup.string().matches(nameRegex, "Need Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character").required("required"),
    confirmPsw: yup.string().oneOf([yup.ref('newPsw')], 'Passwords must match').required("Please retype your new password")
  });

  const handelLogout = async() => {
    try {
      navigate('/login')
      await removeToken()
    }catch (error) {
      console.error(error);
  }
}

  const handleFormSubmit = async(values) => {
    try{
      setIsFormVisible(false)
      await changePsw(values).then(statusCode => {
      if(statusCode === 200){
        setIsPswChange(true)
      }
    })
    }catch(error){
      console.error(error);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsPswChange(false);
  };

  return (
    <div>
    <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
      "& .MuiDialogContent-root": {width: "31rem"} ,
      bottom: '45%'
    }}>
      <DialogContent>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (<form onSubmit={handleSubmit}>
          <Box
          display="flex"
          flexDirection="column"
          gap="5px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <Box display="flex" alignItems="center">
              <InputLabel htmlFor="currentPsw" sx={{ marginRight: 1, width:"37%"}}>
                Current Password:
              </InputLabel>
                <TextField
                fullWidth
                variant="outlined"
                type="text"
                color="secondary"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentPsw}
                name="currentPsw"
                error={!!touched.currentPsw && !!errors.currentPsw}
                helperText={touched.currentPsw && errors.currentPsw}
                />
            </Box>
            <Box display="flex" alignItems="center">
              <InputLabel htmlFor="newPsw" sx={{ marginRight: 1, width:"37%"}}>
                New Password:
              </InputLabel>
                <TextField
                fullWidth
                variant="outlined"
                type="text"
                color="secondary"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPsw}
                name="newPsw"
                error={!!touched.newPsw && !!errors.newPsw}
                helperText={touched.newPsw && errors.newPsw}
                />
            </Box>
            <Box display="flex" alignItems="center">
              <InputLabel htmlFor="confirmPsw" sx={{ marginRight: 1, width:"37%"}}>
                Confirm Password:
              </InputLabel>
                <TextField
                fullWidth
                variant="outlined"
                type="text"
                color="secondary"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPsw}
                name="confirmPsw"
                error={!!touched.confirmPsw && !!errors.confirmPsw}
                helperText={touched.confirmPsw && errors.confirmPsw}
                />
            </Box>
          </Box>
          <Box display="flex" justifyContent="right" marginTop= "1rem">
          <Button type="submit" color="secondary" variant="contained">
                Update
          </Button>
          </Box>
        </form>
        )}
        </Formik>
      </DialogContent>
    </Dialog>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            <SettingsOutlinedIcon/>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => setIsFormVisible(!isFormVisible)}>Change Password</MenuItem>
            <MenuItem onClick={handelLogout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    <Snackbar open={isPswChange} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password change
        </Alert>
      </Snackbar>
</div>
  );
};

// Main Topbar component
const Topbar = ({ isCollapsed }) => {

  const colorMode = useContext(ColorModeContext);

  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    colorMode.toggleColorMode(preferredMode ? 'dark' : 'light');
  }, [preferredMode, colorMode]);

  return (
    <Box width={isCollapsed ? "99rem" : "87rem"} sx={{ transition: "width 0.3s ease-in-out" }}>
      <Box display="flex" justifyContent="right" p={2}>
        <NotificationsButton />
        <SettingsMenu />
      </Box>
    </Box>
  );
};

export default Topbar;
