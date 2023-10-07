import { Box, InputLabel, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useMemo } from "react";
import {AddOutlined} from "@mui/icons-material"
import { Formik } from "formik";
import * as yup from "yup"

const Form = ({rows, setRows}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const initialValues = {
    id: Math.random(),
    clusterName: "",
    fqdnIp: "",
    port: "",
    token: "",
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
  console.log("form submitted");
  values.port = values.port === ""? "6443": values.port 
  setRows(rows.concat(values))
  setIsFormVisible(false)
}

  return (
    <div>
      <IconButton onClick={()=> setIsFormVisible(!isFormVisible)} color="secondary" variant="contained" >
        <AddOutlined fontSize="large"/>
      </IconButton>

      <Dialog open={isFormVisible} onClose={()=> setIsFormVisible(!isFormVisible)} sx={{
        "& .MuiDialogContent-root": {width: "24rem"},
      }}>
        <DialogTitle component="div">
          <Typography color="secondary" variant="h5" fontSize="1.4rem" textAlign="center" padding="5px">
            Add Cluster
          </Typography>
        </DialogTitle>
        <DialogContent>
        <Formik
        onSubmit={handleFormSubmit}
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
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"37%"}}>
                    Cluster Name:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.clusterName}
                    name="clusterName"
                    error={!!touched.clusterName && !!errors.clusterName}
                    helperText={touched.clusterName && errors.clusterName}
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
                  <InputLabel htmlFor="token" sx={{ marginRight: 1, width:"26%"}}>
                    Port:
                  </InputLabel>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
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
            <Box display="flex" mt="20px" justifyContent="right">
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
              {/*<Button type="button" color="secondary" variant="contained">
                Test
            </Button>*/}
            </Box>
          </form>
        )}
        </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Form;
