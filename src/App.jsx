import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { CssBaseline, ThemeProvider, createTheme, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import {css} from  "@emotion/react"
import Discovery from "./Pages/Discovery/Discovery.jsx"
import {refreshToken, verifyLoginState } from "./Services/Login.js"
import DrPolicy from "./Pages/DrPolicy/DrPolicy.jsx";
import Reports from "./Pages/Reports.jsx";


const App = () => {

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff; /* Change the border color for the spinner */
`;

const darkModeStyles = {
  backgroundColor: '#333', // Dark background color
  color: '#fff', // Light text color
  height: '100vh', // Full viewport height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
    palette: {
      mode: preferredMode? 'dark':"light",
      primary: {
        main: '#03a9f4',
      },
      secondary: {
        main: '#18ffff',
      },
    },
  });

  useEffect(() => {
    verifyLoginState().then(() => {
      setIsAuthenticated(true)
      setIsLoading(false);
    }).catch(function (error){
      setIsAuthenticated(false);
      setIsLoading(false);
    });
  }, [])

  useEffect(() => {
    let intervalId;
    if (isAuthenticated) {
      intervalId = setInterval(() => {
        refreshToken();
      }, 180000);
      return () => {
        clearInterval(intervalId);
      };
    }
    clearInterval(intervalId);
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated){
      refreshToken();
    }
  },[isAuthenticated])

  if(isLoading){
    return(
      <div style={darkModeStyles}>
      <BeatLoader color={'#123abc'} loading={isLoading} css={override} size={15} />
    </div>
    )
  }

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} preferredMode={preferredMode} theme={theme}/>}/>
          <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} preferredMode={preferredMode} setIsAuthenticated={setIsAuthenticated} setOpen={setOpen} open={open} theme={theme}><Dashboard /></PrivateRoute>}/>
          <Route path="/discovery" element={<PrivateRoute isAuthenticated={isAuthenticated} preferredMode={preferredMode} setIsAuthenticated={setIsAuthenticated} setOpen={setOpen} open={open} theme={theme}><Discovery globalTheme={theme} preferredMode={preferredMode} open={open}/></PrivateRoute>}/>
          <Route path="/dr-policy" element={<PrivateRoute isAuthenticated={isAuthenticated} preferredMode={preferredMode} setIsAuthenticated={setIsAuthenticated} setOpen={setOpen} open={open} theme={theme}><DrPolicy preferredMode={preferredMode} globalTheme={theme} open={open}/></PrivateRoute>}/>
          <Route path="/reports" element={<PrivateRoute isAuthenticated={isAuthenticated} preferredMode={preferredMode} setIsAuthenticated={setIsAuthenticated} setOpen={setOpen} open={open} theme={theme}><Reports preferredMode={preferredMode} globalTheme={theme} open={open}/></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
     </ThemeProvider>
  );
};

export default App;
