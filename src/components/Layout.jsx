import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import Navbar from "../Pages/global/Navbar";
import { useState, useEffect } from "react";
import { removeToken } from "../Services/Login";

const Layout = ({ children, setIsAuthenticated, preferredMode, sidebarOpen, setSidebarOpen, theme}) => {
  const timeout = parseInt(import.meta.env.VITE_REACT_APP_TIME_OUT, 10) * 60 * 1000;
  const promptBeforeIdle = 30000
  const [state, setState] = useState('Active');
  const [remaining, setRemaining] = useState(timeout);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onIdle = async() => {
    await removeToken()
    setIsAuthenticated(false)
    setState('Idle');
    setOpen(false);
  };

  useEffect(() => {
    if (state === 'Idle') {
      navigate("/login")
    }
  }, [navigate, state]);

  const onActive = () => {
    setState('Active');
    setOpen(false);
  };

  const onPrompt = () => {
    setState('Prompted');
    setOpen(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    events:[
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
    ],
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime]);

  const handleStillHere = () => {
    activate();
  };

  const seconds = promptBeforeIdle > 1 ? 'seconds' : 'second';
  return (
  <Box className="app">
    <Box display="flex" flexDirection="column">
      <Navbar open={sidebarOpen} setOpen={setSidebarOpen} preferredMode={preferredMode} setIsAuthenticated={setIsAuthenticated} theme={theme}></Navbar>
      {children}
      </Box>
      <Dialog open={open} sx={{margin: "0"}}>
        <DialogTitle component="div">
          <Typography color="secondary" variant="h5" fontSize="1.4rem" textAlign="center" padding="5px">
            Are you still here?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className='modal' style={{ display: open ? 'flex' : 'none'}}>
            <Typography color="white" variant="h5" fontSize="1.4rem" textAlign="center" padding="5px">
              Logging out in {remaining} {seconds} 
            </Typography>
            <Button onClick={handleStillHere} type="submit" color="secondary" variant="contained">
              cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Layout;
