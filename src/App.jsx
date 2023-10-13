import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { ColorModeContext, useMode } from "../Themes/themes.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Discovery from "./Pages/Discovery/Discovery.jsx"
import {refreshToken, verifyLoginState } from "./Services/Login.js"

const App = () => {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyLoginState().then(() => {
      setIsAuthenticated(true)
    }).catch(function (error){
      setIsAuthenticated(false);
    });
  }, [])

  useEffect(() => {
    let intervalId;
    if (isAuthenticated.authenticated) {
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
    if(isAuthenticated.authenticated ){
      refreshToken();
    }
  },[isAuthenticated])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/dashboard" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isAuthenticated={isAuthenticated}><Dashboard/></PrivateRoute>}/>
          <Route path="/discovery" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isAuthenticated={isAuthenticated}><Discovery isCollapsed={isCollapsed}/></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
     </ThemeProvider>
     </ColorModeContext.Provider>
  );
};

export default App;
