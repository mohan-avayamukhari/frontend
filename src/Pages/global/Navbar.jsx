import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { Dialog, DialogContent } from '@mui/material';
import { Formik } from "formik";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NotificationsOutlined } from '@mui/icons-material';
import { changePsw, removeToken } from "../../Services/Login.js";
import { Menu, MenuItem, InputLabel, TextField, Button} from "@mui/material"
import {HomeOutlined, TravelExploreOutlined, ListAltOutlined, ReportGmailerrorredOutlined, PersonAddOutlined, GroupOutlined, HelpOutlineOutlined} from "@mui/icons-material"


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NotificationsButton = () => {
  return (
    <IconButton>
      <NotificationsOutlined sx={{color:"white"}}/>
    </IconButton>
  );
};

const SettingsMenu = ({setIsAuthenticated, theme, preferredMode}) => {
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
      await removeToken()
      navigate('/login')
      setIsAuthenticated(false)
    }catch (error) {
      navigate('/login')
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

  return (
    <div>
    <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
      "& .MuiDialogContent-root": {width: "36rem"} ,
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
                color={preferredMode? "secondary":"primary"}
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
                color={preferredMode? "secondary":"primary"}
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
                color={preferredMode? "secondary":"primary"}
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
          <Button type="submit" color={preferredMode? "secondary":"primary"} variant="contained">
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
            <SettingsOutlinedIcon sx={{color:"white"}}/>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => setIsFormVisible(!isFormVisible)}>Change Password</MenuItem>
            <MenuItem onClick={handelLogout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
</div>
  );
};

const Navbar = ({preferredMode, setOpen, open, setIsAuthenticated, theme}) => {
  const clusterManagementIcons = [HomeOutlined, TravelExploreOutlined, ListAltOutlined, ReportGmailerrorredOutlined]
  const adminToolIcons = [PersonAddOutlined, GroupOutlined, HelpOutlineOutlined]
  const location = useLocation();
  const pathName = location.pathname;
  const allMenuItems = ['Dashboard', 'Discovery', 'DR Policy', 'Reports', 'All mail', 'Trash', 'Spam']
  const initialSelectedItem = allMenuItems.find(item => pathName.endsWith(item.toLowerCase())) || 'Dashboard';
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const clusterManagementPaths = ['/dashboard', '/discovery', '/dr-policy', '/reports'];

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:"flex", justifyContent: "space-between"}}>
          <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          </Box>
          <Box display="flex" justifyContent="right">
            <NotificationsButton preferredMode={preferredMode}/>
            <SettingsMenu setIsAuthenticated={setIsAuthenticated} preferredMode={preferredMode} theme={theme}/>
          </Box>
        </Toolbar>
        </AppBar>
      <Drawer variant="permanent" open={open} sx={{"& .MuiPaper-root":{display:"block"}}}>
        <DrawerHeader sx={{display:"flex", flexDirection:"column"}}>
          <Box height="0rem" paddingLeft="8.5rem" marginBottom={5}>
          <IconButton onClick={handleDrawerClose} sx={{position:"fixed"}}>
            <ChevronLeftIcon fontSize='large'/>
          </IconButton>
          </Box>
          <Box mb="25px" display= {open?"flex":"none"} flexDirection="column">
              <Box paddingLeft="0.5rem" paddingTop="1rem">
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
                  variant="h4"
                  fontWeight="bold"
                >
                  Admin
                </Typography>
              </Box>
            </Box>
        </DrawerHeader>
        <List>
          <Typography variant='h6' align='center' display={open? "block":"none"} >
            Cluster Management
          </Typography>
          {['Dashboard', 'Discovery', 'DR Policy', 'Reports'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton style={{padding: open? "0.5rem 3rem":"0.5rem 2rem"}}
                sx={{
                  minHeight: 28,
                  justifyContent: open ? 'center' : 'center',
                  '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                    color: selectedItem === text ?(preferredMode? '#18ffff':'#1876D1'):(preferredMode? 'white':'black'),
                  },
                  '&:hover': {
                    backgroundColor:"transparent",
                    '& .MuiListItemIcon-root':{
                      animationName: 'wiggle',
                      animationDuration: '600ms',
                      animationIterationCount: 1,
                      animationTimingFunction: 'ease-in-out',
                      backgroundColor: 'transparent',
                    },
                    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                      color: preferredMode? '#18ffff':'#1876D1',
                    },
                    '@keyframes wiggle': {
                      '0%': { transform: 'rotate(0deg)' },
                      '25%': { transform: 'rotate(15deg)' },
                      '50%': { transform: 'rotate(-15deg)' },
                      '75%': { transform: 'rotate(9deg)' },
                      '100%': { transform: 'rotate(0deg)' },
                    },
                  },
                  color: selectedItem === text ? '#18ffff' : 'white'
                }}
                onClick={() => {
                  navigate(clusterManagementPaths[index]);    
                  setSelectedItem(text)
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedItem === text ? '#18ffff' : 'white'
                  }}
                >
                  {React.createElement(clusterManagementIcons[index])}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{display: open? "none":"block"}}/>
        <Typography variant='h6' align='center' display={open? "block":"none"}>
            Admin Tools
          </Typography>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block'}}>
              <ListItemButton 
                sx={{
                  padding: open? "0.5rem 3rem":"0.5rem 2rem",
                  minHeight: 28,
                  justifyContent: open ? 'initial' : 'center',
                  '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                    color: selectedItem === text ?(preferredMode? '#18ffff':'#1876D1'):(preferredMode? 'white':'black'),
                  },
                  '&:hover': {
                    backgroundColor:"transparent",
                    '& .MuiListItemIcon-root':{
                      animationName: 'wiggle',
                      animationDuration: '500ms',
                      animationIterationCount: 1,
                      animationTimingFunction: 'ease-in-out',
                      backgroundColor: 'transparent',
                    },
                    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                      color: preferredMode? '#18ffff':'#1876D1',
                    },
                    '@keyframes wiggle': {
                      '0%': { transform: 'rotate(0deg)' },
                      '25%': { transform: 'rotate(10deg)' },
                      '50%': { transform: 'rotate(-10deg)' },
                      '75%': { transform: 'rotate(3deg)' },
                      '100%': { transform: 'rotate(0deg)' },
                    },
                  },
                  color: selectedItem === text ? '#18ffff' : '#1876D1'
                }}
                onClick={() => {
                  navigate(clusterManagementPaths[index]);    
                  setSelectedItem(text)
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedItem === text ? '#18ffff' : 'white'
                  }}
                >
                  {React.createElement(adminToolIcons[index])}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}

export default Navbar;
