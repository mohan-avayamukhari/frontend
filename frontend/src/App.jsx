import { ColorModeContext, useMode } from "../Themes/themes.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Sidebar from "./Pages/global/sidebar.jsx";
import Topbar from "./Pages/global/topbar.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const isSignInPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSignInPage && <Sidebar />}
          <main className="content">
            {!isSignInPage && <Topbar />}
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>}/>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
