import { DataGrid } from "@mui/x-data-grid";
import {useTheme, CardContent, Container, Grid } from "@mui/material";
import {tokens} from "../../../Themes/themes.js"
import Form from "./AddClusterForm";
import { Box } from "@mui/system";
import { useState } from "react";

const rows = [
  {
    id: 1,
    name: "Test",
    fdqnIp: 20,
    port: "3000"
  }
];

const Discovery = ({isCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSelect, setIsSelect] = useState(false)
  const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <div>
      <Box display="flex" margin="0 0.5rem" >
      <Form/>
    </Box>
    <Container component="main" sx={{margin: "0", padding: "0"}}>
        <CardContent sx={{padding: "0"}}>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{ width: isCollapsed? "96rem":"84rem",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: preferredMode? "#333333": "#adb5bd",
              borderBottom: "none",
              height: "50px"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: preferredMode? "colors.primary[400]": "colors.primary[400]",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: preferredMode? "#333333": "#adb5bd",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}>
              <DataGrid
              columnHeaderHeight={45}
              checkboxSelection={isSelect}
              hideFooter
              autoHeight
              columns={[
                {
                  headerAlign: "center",
                  align: "center",
                  field: "id",
                  headerName: "ID",
                  flex: 0.5,
                },
                {
                  field: "name",
                  headerName:"Name",
                  flex: 1,
                },
                {
                  field: "fdqnIp",
                  headerName: "FDQN/IP",
                  flex: 1,
                },
                {
                  field: "port",
                  headerName: "Port",
                  flex: 1,
                },
              ]}
              rows={rows}
            />
            </Grid>
          </Grid>
        </CardContent>
    </Container>
    </div>
  );
}

export default Discovery
