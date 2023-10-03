import { Box, InputLabel, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useMemo } from "react";

const Form = () => {

  const [clusterName, setClusterName] = useState("")
  const [isValidClusterName, setIsValidClusterName] = useState(false)
  const [fqdnIp, setFqdnIp] = useState("")
  const [isValidFdqnIp, setIsValidFdqnIp] = useState(false)
  const [port, setPort] = useState("")
  const [isValidPort, setIsValidPort] = useState(false)
  const [token, setToken] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    <div>
      <Button onClick={()=> setIsFormVisible(!isFormVisible)} color="primary" variant="contained">
        {isFormVisible ? "Add" : "Add"}
      </Button>

      <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
        "& .MuiDialogContent-root": {width: "24rem"},
      }}>
        <DialogTitle component="div">
          <Typography color="secondary" variant="h5" fontSize="1.4rem" textAlign="center" padding="5px">
            Add Cluster
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"37%"}}>
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
                    autoComplete="off"
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"26%" }}>
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
                    autoComplete="off"
                    sx={{flex: 1}}
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"26%"}}>
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
                    autoComplete="off"
                    sx={{flex: 1}}
                    />
                </Box>

                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"26%"}}>
                    Token:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                    name="token"
                    size="small"
                    color="secondary"
                    autoComplete="off"
                    sx={{flex: 1}}
                    />
                </Box>
            </Box>
            <Box display="flex" mt="20px" justifyContent="space-between">
              <Button type="submit" color="secondary" variant="contained" disabled={!isValidClusterName || !isValidFdqnIp || !isValidPort || !clusterName || !fqdnIp || !token}>
                Save
              </Button>
              <Button type="submit" color="secondary" variant="contained" disabled={!isValidClusterName || !isValidFdqnIp || !isValidPort || !clusterName || !fqdnIp || !token}>
                Test
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Form;
