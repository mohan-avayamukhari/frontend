import { useState } from "react";
import { ColorModeContext, useMode } from "../Themes/themes.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Sidebar from "./Pages/global/sidebar.jsx";
import Topbar from "./Pages/global/Topbar.jsx";
import Discovery from "./Pages/Discovery/Discovery.jsx"
function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isSignInPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSignInPage && <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>}
          <main className="content">
            {!isSignInPage && <Topbar />}
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>}/>
              <Route path="/discovery" element={<PrivateRouter><Discovery isCollapsed={isCollapsed}/></PrivateRouter>}/>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
