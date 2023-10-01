import { Box, Button, InputLabel, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import {useState, useEffect, useMemo} from "react";
import { useTheme } from "@emotion/react";
import {tokens} from "../../Themes/themes.js"


const Form = () => {

  const [clusterName, setClusterName] = useState("")
  const [isValidClusterName, setIsValidClusterName] = useState(false)
  const [fqdnIp, setFqdnIp] = useState("")
  const [isValidFdqnIp, setIsValidFdqnIp] = useState(false)
  const [port, setPort] = useState("")
  const [isValidPort, setIsValidPort] = useState(false)
  const [token, setToken] = useState("")

  const isNonMobile = useMediaQuery("(min-width:600px)");


  const nameRegex = useMemo(() => /^[a-zA-Z0-9]+$/, []); 
  const fqdnRegex = useMemo(() => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, []);
  const ipRegex = useMemo(() => /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])){3}$/, [])
  const portRegex = useMemo(() => /^([1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, [])
  
  
  useEffect(() => {
    setIsValidClusterName(nameRegex.test(clusterName));
}, [clusterName, nameRegex])

useEffect(() => {
  setIsValidFdqnIp(fqdnRegex.test(fqdnIp));
}, [fqdnIp, fqdnRegex])

useEffect(() => {
  setIsValidFdqnIp(ipRegex.test(fqdnIp));
}, [fqdnIp, ipRegex])

useEffect(() => {
  setIsValidPort(portRegex.test(port));
}, [port, portRegex])

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px" p="0 38%">
      <Header title="Add Cluster" />
          <form onSubmit={handleFormSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap="5px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              >
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"44%"}}>
                    Cluster Name:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onChange={(e) => setClusterName(e.target.value)}
                    value={clusterName}
                    name="token"
                    size="small"
                    color="secondary"
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"30%" }}>
                    FQDN/IP:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onChange={(e) => setFqdnIp(e.target.value)}
                    value={fqdnIp}
                    name="token"
                    size="small"
                    color="secondary"
                    sx={{flex: 1}}
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"30%"}}>
                    Port:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="6443"
                    onChange={(e) => setPort(e.target.value)}
                    value={port}
                    name="token"
                    size="small"
                    color="secondary"
                    sx={{flex: 1}}
                    />
                </Box>

                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"30%"}}>
                    Token:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                    name="token"
                    size="small"
                    color="secondary"
                    sx={{flex: 1}}
                    />
                </Box>
            </Box>
            <Box display="flex" mt="20px" justifyContent="space-between">
              <Button type="submit" color="secondary" variant="contained" disabled={!clusterName || !fqdnIp || !token}>
                Save
              </Button>
              <Button type="submit" color="secondary" variant="contained" disabled={!clusterName || !fqdnIp || !token}>
                Test
              </Button>
            </Box>
          </form>
    </Box>
  );
};
export default Form;