import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Container, Grid } from "@mui/material";
import Form from "./AddClusterForm";
import { Box } from "@mui/system";

const rows = [
  {
    id: 1,
    username: "@MUI",
    age: 20
  }
];

const Discovery = ({isCollapsed}) => {

  return (
    <div>
      <Box>
      <Form/>
    </Box>
    <Container component="main" sx={{margin: "0"}}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{ width: isCollapsed? "96rem":"84rem" }}>
              <DataGrid
                autoHeight
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
