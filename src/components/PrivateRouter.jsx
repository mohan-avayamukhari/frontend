import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = ({ children, preferredMode, isAuthenticated, setIsAuthenticated, setOpen, open, theme}) => {
  return isAuthenticated ? (
    <Layout setIsAuthenticated={setIsAuthenticated} preferredMode={preferredMode} setSidebarOpen={setOpen} sidebarOpen={open} theme={theme}>
      {children}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;