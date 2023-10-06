import { useState } from "react";
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/dashboard" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}><Dashboard/></PrivateRoute>}/>
          <Route path="/discovery" element={<PrivateRoute isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}><Discovery isCollapsed={isCollapsed}/></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
     </ThemeProvider>
     </ColorModeContext.Provider>
  );
};

export default App;
