import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red, orange, grey } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import {PlayArrowOutlined, Check, VpnKeyOffOutlined, CloudOffOutlined, ClearOutlined} from "@mui/icons-material"
import { Version } from '../../../Services/k8s';
import { updateSeverity } from '../../../Services/discovery';
import { colors } from '@mui/material';

const TestButton = ({theme, preferredMode, id, setIsTostVisible, setMessage, setSeverity, severity}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [warning, setWarning] = useState(false);
  const [controller, setController] = useState(new AbortController()); 

  useEffect(() => {
    
    setSuccess(false);
    setFailure(false);
    setWarning(false);
    
    switch (severity) {
      case 'success':
        setSuccess(true);
        break;
      case 'failure':
        setFailure(true);
        break;
      case 'warning':
        setWarning(true);
        break;
      default:
        break;
    }
  }, [severity]);


  const handleButtonClick = async () => {
    try {
      if (loading) {
        // If loading, it means a request is ongoing, so abort it
        controller.abort();
        setController(new AbortController()); // Create a new controller for potential future requests
        setLoading(false);
        return;
      }
      setLoading(true);
      setSuccess(false);
      setFailure(false);
      setWarning(false);

      const { signal } = controller;
      const response = await Version(id, signal);
      if (response && response.status === 200) {
        setMessage(`Connected successfully, cluster version: ${response.data}`);
        setSeverity("success");
        setIsTostVisible(true);
        setSuccess(true);
        updateSeverity(id, "success")
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        updateSeverity(id, "")
      } else {
        handleRequestError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (error) => {
    if (error.response && error.response.status === 504) {
      setMessage(`Connection timeout occurred, please check firewall rules`);
      setSeverity("warning");
      setIsTostVisible(true);
      setWarning(true);
      updateSeverity(id, "warning")
    } else if (error.response && error.response.status === 401) {
      setMessage(`Authorization failed`);
      setSeverity("error");
      setIsTostVisible(true);
      setFailure(true);
      updateSeverity(id, "failure")
    } else {
      console.error("Error:", error);
    }
  };

  return (
      <Box sx={{ m: 1, position:'relative' }}>
        <Fab aria-label="save" sx={{
          ...(success && {
            bgcolor: green[500],
            '&:hover': {
              bgcolor: green[700],
            },
          }),
          ...(warning && {
            bgcolor: orange[500],
            '&:hover': {
              bgcolor: orange[700],
            },
          }),
          ...(failure && {
            bgcolor: red[500],
            '&:hover': {
              bgcolor: red[700],
            },
          }),
          ...(loading &&{
            bgcolor: "black",
            '&:hover': {
              bgcolor: "black",
            },
          }),
          ...(!loading && !success && !warning && !failure &&{
          bgcolor: grey[900],
          '&:hover': {
            bgcolor: grey[800],
          },
        }),
        width:"35px",
        height:"35px"
        }}
         onClick={handleButtonClick} >
          {failure ? (<VpnKeyOffOutlined sx={{ fontSize: "1.5rem"}} />) : (<>
          {success ? (<Check sx={{ fontSize: "1.5rem"}} />) : (<>
          {warning ? (<CloudOffOutlined sx={{ fontSize: "1.5rem"}} />) : (<>
          {loading ? (<ClearOutlined sx={{ fontSize: "1.5rem", color:"white"}} />) : (
          <PlayArrowOutlined sx={{ fontSize: "1.5rem", color:'white' }} />)}</>)}</>)}</>)}
        </Fab>

        {loading && (
          <CircularProgress
            size={45}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -4.5,
              left: -5,
              zIndex: 1,
            }}
          />
        )}
      </Box>
  );
}

export default TestButton