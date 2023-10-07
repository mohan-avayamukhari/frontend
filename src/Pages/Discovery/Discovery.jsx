import { DataGrid } from "@mui/x-data-grid";
import { CardContent, Container, Grid, useTheme } from "@mui/material";
import Form from "./AddClusterForm";
import { Box } from "@mui/system";
import {tokens} from "../../../Themes/themes.js"
import { useState, useEffect } from "react";
import { getAllClusters } from "../../Services/discovery";


const Discovery = ({isCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([])

  useEffect(() => {
    getAllClusters().then(data => {
        setRows(data);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }, []);

  return (
    <div>
      <Box padding="0 1rem">
      <Form rows={rows} setRows={setRows}/>
      </Box>
      <Container sx={{margin: "0", padding: "0 !important"}}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{width: isCollapsed ? "99rem" : "87rem" , transition: "width: 0.5s",
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
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}>
              <DataGrid
                autoHeight
                hideFooter
                columnHeaderHeight={38}
                columns={[
                  {
                    headerName: "ID",
                    field: "id",
                    flex: 0.5,
                  },
                  {
                    headerName:"Cluster Name",
                    field: "clusterName",
                    flex: 1,
                  },
                  {
                    headerName: "FQDN/IP",
                    field: "fqdnIp",
                    flex: 1,
                  },
                  {
                    headerName: "Port",
                    field: "port",
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
