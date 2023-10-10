import { Box, InputLabel, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Snackbar, Alert } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useMemo } from "react";
import { Formik } from "formik";
import * as yup from "yup"
import { addCluster, updateCluster, getAllClusters } from "../../Services/discovery";

const Form = ({setRows, editId, clusterName, fqdnIp, port, token, isFormVisible, setIsFormVisible, action, message}) => {
  const [isClusterAdded, setIsClusterAdded] = useState(false);
  const initialValues = {
    clusterName: clusterName,
    fqdnIp: fqdnIp,
    port: port,
    token: token,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const nameRegex = useMemo(() => /^[a-zA-Z0-9]+$/, []); 
  const fqdnIpRegex = useMemo(() => /^(?:(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)|(?:[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*|\b(?:\d{1,3}\.){3}\d{1,3}\b)$/, []);
  const portRegex = useMemo(() => /^([1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, [])

  const checkoutSchema = yup.object().shape({
    clusterName: yup.string().matches(nameRegex, "Not a valid cluster name").required("required"),
    fqdnIp: yup.string().matches(fqdnIpRegex, "Not a valid FQDN or an IP address").required("required"),
    port: yup.string().matches(portRegex, "Phone number is not valid"),
    token: yup.string().required("required"),
  });

const handleFormSubmit = (values) => {
  values.port = values.port === ""? "6443": values.port 
  setIsFormVisible(false)
  addCluster(values).then(statusCode => {
    if(statusCode === 201){
      setIsClusterAdded(true)
      getAllClusters().then(data => {
        const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1 }));
        setRows(rowsWithId);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  })
}

const handleEditSubmit = (values) => {
  values.port = values.port === ""? "6443": values.port 
  setIsFormVisible(false)
  updateCluster(editId, values).then(statusCode => {
    if(statusCode === 200){
      setIsClusterAdded(true)
      getAllClusters().then(data => {
        const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1 }));
        setRows(rowsWithId);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  })
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setIsClusterAdded(false);
};

  return (
    <div>
      <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
        "& .MuiDialogContent-root": {width: "24rem"},
        bottom: '33%'
      }}>
        <DialogTitle component="div">
          <Typography color="secondary" variant="h5" fontSize="1.4rem" textAlign="center" padding="5px">
            Add Cluster
          </Typography>
        </DialogTitle>
        <DialogContent>
        <Formik
        onSubmit={action === "Add"? handleFormSubmit : handleEditSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (<form onSubmit={handleSubmit}>
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
                  <InputLabel htmlFor="clusterName" sx={{ marginRight: 1, width:"37%"}}>
                    Cluster Name:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    color="secondary"
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.clusterName}
                    name="clusterName"
                    error={!!touched.clusterName && !!errors.clusterName}
                    helperText={touched.clusterName && errors.clusterName}
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="fqdnIp" sx={{ marginRight: 1, width:"26%" }}>
                    FQDN/IP:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    color="secondary"
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fqdnIp}
                    name="fqdnIp"
                    error={!!touched.fqdnIp && !!errors.fqdnIp}
                    helperText={touched.fqdnIp && errors.fqdnIp}
                    sx={{flex: 1}}
                    />
                </Box>
                <Box display="flex" alignItems="center">
                  <InputLabel htmlFor="port" sx={{ marginRight: 1, width:"26%"}}>
                    Port:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    type="text"
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.port}
                    name="port"
                    placeholder="6443"
                    error={!!touched.port && !!errors.port}
                    helperText={touched.port && errors.port}
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
                    color="secondary"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.token}
                    name="token"
                    error={!!touched.token && !!errors.token}
                    helperText={touched.token && errors.token}
                    sx={{flex: 1}}
                    />
                </Box>
            </Box>
            <Box display="flex" mt="20px" justifyContent="space-between">
            <Button type="button" onClick={() => setIsFormVisible(false)} color="secondary" variant="contained">
                Cancel
            </Button>
            <Button type="submit" color="secondary" variant="contained">
              {action}
            </Button>
            </Box>
          </form>
        )}
        </Formik>
        </DialogContent>
      </Dialog>
      <Snackbar open={isClusterAdded} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal:"right"}}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
