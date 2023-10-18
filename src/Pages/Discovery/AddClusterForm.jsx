import { Box, InputLabel, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, ThemeProvider, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { Formik } from "formik";
import * as yup from "yup"
import { addCluster, updateCluster, getAllClusters } from "../../Services/discovery";

const Form = ({setRows, editId, clusterName, fqdnIp, port, setMessage, setSeverity, setIsToastVisible, isFormVisible, setIsFormVisible, action, preferredMode, theme }) => {
  const initialValues = {
    clusterName: clusterName,
    fqdnIp: fqdnIp,
    port: port,
    token: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const nameRegex = useMemo(() => /^[a-zA-Z0-9]+$/, []); 
  const fqdnIpRegex = useMemo(() => /\b(?:https?|ftp):\/\/[-\w]+(?:\.\w+)*(?::\d+)?(?:\/[^\/]*)*\b|\b(?:\d{1,3}\.){3}\d{1,3}\b/, []);
  const portRegex = useMemo(() => /^([1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, [])

  const checkoutSchema = yup.object().shape({
    clusterName: yup.string().matches(nameRegex, "Not a valid cluster name").required("required"),
    fqdnIp: yup.string().matches(fqdnIpRegex, "Not a valid FQDN or an IP address").required("required"),
    port: yup.string().matches(portRegex, "Not a valid Port"),
    token: action === "Add"? yup.string().required("required"): yup.string(),
  });

const handleFormSubmit = (values) => {
  values.port = values.port === ""? "6443": values.port 
  setIsFormVisible(false)
  addCluster(values).then(statusCode => {
    if(statusCode === 201){
      setMessage(`Added ${values.clusterName} cluster successfully`)
      setSeverity("success")
      setIsToastVisible(true)
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
      getAllClusters().then(data => {
        const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1 }));
        setRows(rowsWithId);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  })
}



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div>
      <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
        "& .MuiDialogContent-root": {width: "28rem"},
        bottom: '33%'
      }}>
        <DialogTitle component="div">
          <Typography variant="h5" fontSize="1.4rem" textAlign="center" padding="5px"sx={{color: preferredMode? "#18ffff":"#03a9f4"}}>
            {action === "Add"? "Add Cluster":"Edit Cluster"}
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
                    autoComplete="off"
                    color={preferredMode? "secondary":"primary"}
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
                    color={preferredMode? "secondary":"primary"}
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
                    color={preferredMode? "secondary":"primary"}
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
                    color={preferredMode? "secondary":"primary"}
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.token}
                    placeholder={action === "Save"? "Leave empty if not change":""}
                    name="token"
                    error={!!touched.token && !!errors.token}
                    helperText={touched.token && errors.token}
                    sx={{flex: 1}}
                    />
                </Box>
            </Box>
            <Box display="flex" mt="20px" justifyContent="space-between">
            <Button type="button" color={preferredMode? "secondary":"primary"} onClick={() => setIsFormVisible(false)} variant="contained" sx={{color: preferredMode? "black":"white"}}>
                Cancel
            </Button>
            <Button type="submit" color={preferredMode? "secondary":"primary"} variant="contained" sx={{backgroundColor: preferredMode? "#18ffff":"#03a9f4", color: preferredMode? "black":"white"}}>
              {action}
            </Button>
            </Box>
          </form>
        )}
        </Formik>
        </DialogContent>
      </Dialog>
    </div>
    </ThemeProvider>
  );
};

export default Form;
