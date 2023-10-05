import { useState } from "react";
import { ColorModeContext, useMode } from "../Themes/themes.js";
import { useMediaQuery, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Sidebar from "./Pages/global/sidebar.jsx";
import Topbar from "./Pages/global/Topbar.jsx";
import Discovery from "./Pages/Discovery/Discovery.jsx";
import DrPolicy from "./Pages/DrPolicy.jsx";
import Reports from "./Pages/Reports.jsx";
import CreateUser from "./Pages/CreateUser.jsx";
import AllUsers from "./Pages/AllUsers.jsx";
import Faq from "./Pages/Faq.jsx"

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
              <Route path="/dr-policy" element={<PrivateRouter><DrPolicy /></PrivateRouter>}/>
              <Route path="/reports" element={<PrivateRouter><Reports /></PrivateRouter>}/>
              <Route path="/create-user" element={<PrivateRouter><CreateUser /></PrivateRouter>}/>
              <Route path="/all-users" element={<PrivateRouter><AllUsers /></PrivateRouter>}/>
              <Route path="/faqs" element={<PrivateRouter><Faq /></PrivateRouter>}/>
              <Route path="/discovery" element={<PrivateRouter><Discovery isCollapsed={isCollapsed} /></PrivateRouter>}/>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
