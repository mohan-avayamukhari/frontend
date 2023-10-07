import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../Themes/themes.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter.jsx";
import SignIn from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Discovery from "./Pages/Discovery/Discovery.jsx"

const App = () => {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error('Error parsing stored value:', error);
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);


  console.log(isAuthenticated);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/dashboard" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}><Dashboard/></PrivateRoute>}/>
          <Route path="/discovery" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}><Discovery isCollapsed={isCollapsed}/></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
     </ThemeProvider>
     </ColorModeContext.Provider>
  );
};

export default App;
