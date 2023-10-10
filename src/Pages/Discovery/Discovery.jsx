/* eslint-disable react/jsx-key */
import { DataGrid} from "@mui/x-data-grid";
import { CardContent, Container, Grid, useTheme, IconButton, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import Form from "./AddClusterForm";
import { Box } from "@mui/system";
import {tokens} from "../../../Themes/themes.js"
import { useState, useEffect } from "react";
import { deleteCluster, getAllClusters } from "../../Services/discovery";
import {DeleteOutlined, EditOutlined, PlayArrowOutlined, AddOutlined} from '@mui/icons-material';




const Discovery = ({isCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState({})
  const [editId, setEditId] = useState("")
  const [values, setValues] = useState({})

  useEffect(() => {
    getAllClusters().then(data => {
      const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1 }));
        setRows(rowsWithId);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }, []);

    let columns = [
      {
        headerName: "ID",
        field: "no",
        width: 80,
        flex: 0.5
      },
      {
        headerName:"Cluster Name",
        field: "clusterName",
        width: 180,
        flex: 1,
      },
      {
        headerName: "FQDN/IP",
        field: "fqdnIp",
        width: 240,
        flex: 1,
      },
      {
        headerName: "Port",
        field: "port",
        flex: 0.5,
        width: 120,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
          return (
            <div>
              <IconButton onClick={() => handleEdit(params)}><EditOutlined sx={{color:"orange"}}/></IconButton>
              <IconButton onClick={() => handleDelete(params)}><DeleteOutlined sx={{color:"red"}}/></IconButton>
            </div>
          );
        },
      }, 
      {
        field: "test",
        headerName: "Test",
        sortable: false,
        renderCell: (params) => {
          return <IconButton onClick={() => handleTest(params)}><PlayArrowOutlined sx={{color:"lightgreen"}}/></IconButton>;
        },
      },     
    ];
    
    const handleEdit = (params) => {
      const newValues = {
        clusterName: params.row.clusterName,
        fqdnIp: params.row.fqdnIp,
        port: params.row.port,
        token: params.row.token,
      }
      setValues(newValues);
      setEditId(params.id)
      setIsEditing(true)
    }

    const handleDelete = (params) => {
      const details = {
        id: params.id,
        name: params.row.clusterName
      }
      setDeleteDetails(details)
      setIsConfirmDelete(true)
    }

    const handleTest = (params) => {
      console.log(params);
    }

  return (
    <div>
      <Box padding="0 1rem">
      <IconButton onClick={()=> setIsFormVisible(!isFormVisible)} color="secondary" variant="contained" >
        <AddOutlined fontSize="large"/>
      </IconButton>
      <Form rows={rows} setRows={setRows} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} clusterName="" fqdnIp="" port="" token="" action={"Add"} message={"New cluster added"}/>
      <ConfirmDelete setRows={setRows} deleteDetails={deleteDetails} setIsConfirmDelete={setIsConfirmDelete} isConfirmDelete={isConfirmDelete}/>
      {isEditing && (<Form rows={rows} setRows={setRows} isFormVisible={isEditing} setIsFormVisible={setIsEditing} editId={editId} clusterName={values.clusterName} fqdnIp={values.fqdnIp} port={values.port} token={values.token} action={"Save"} message={"Updated the cluster details"}/>)}
      </Box>
      <Container sx={{margin: "0", padding: "0 !important"}}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{width: isCollapsed ? "98.5rem" : "86.5rem" , transition: "width: 0.5s",
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
                columns= {columns}
                rows={rows}
              />
            </Grid>
          </Grid>
        </CardContent>
    </Container>
    </div>
  );
}

const ConfirmDelete = ({setRows, deleteDetails, setIsConfirmDelete, isConfirmDelete}) => {

  const closeDeletePopup = () => {
    setIsConfirmDelete(false)
  }

  const handleConfirm = () => {
    deleteCluster(deleteDetails.id).then(statusCode => {
      if(statusCode === 200){
        getAllClusters().then(data => {
          const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1 }));
          setRows(rowsWithId);
        }).catch(error => {
          console.error('Error fetching user profile:', error);
        });
      }
    })
    setIsConfirmDelete(false)
  }
  return(
    <div>
      <Dialog
        open={isConfirmDelete}
        onClose={closeDeletePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{bottom: "40%"}}
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete `}
          <span style={{ color: 'red' }}><strong>{deleteDetails.name}</strong></span>{` cluster?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDeletePopup} sx={{
            color: "#00ffff",
            '&:hover':{
              backgroundColor: "#00ffff",
              color: "black"
            }
         }}>
          Cancel</Button>
          <Button onClick={handleConfirm} autoFocus sx={{
            color: "red",
            '&:hover':{
              backgroundColor: "red",
              color: "black"
            }
         }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Discovery
