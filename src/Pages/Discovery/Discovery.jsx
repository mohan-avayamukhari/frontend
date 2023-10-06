import { DataGrid } from "@mui/x-data-grid";
import { CardContent, Container, Grid, useTheme } from "@mui/material";
import Form from "./AddClusterForm";
import { Box } from "@mui/system";
import {tokens} from "../../../Themes/themes.js"

const rows = [
  {
    id: 1,
    username: "@MUI",
    age: 20
  }
];

const Discovery = ({isCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(isCollapsed);

  return (
    <div>
      <Box padding="0 1rem">
      <Form/>
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
                    field: "ID",
                    flex: 0.5,
                  },
                  {
                    field: "Name",
                    flex: 1,
                  },
                  {
                    field: "FQDN/IP",
                    flex: 1,
                  },
                  {
                    field: "Port",
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
