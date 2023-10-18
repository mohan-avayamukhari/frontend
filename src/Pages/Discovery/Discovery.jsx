/* eslint-disable react/jsx-key */
import { DataGrid} from "@mui/x-data-grid";
import { CardContent, Container, Grid, IconButton, Button, Dialog, DialogTitle, DialogActions, useMediaQuery, createTheme, ThemeProvider, CssBaseline, Typography } from "@mui/material";
import Form from "./AddClusterForm";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { deleteCluster, getAllClusters } from "../../Services/discovery";
import {DeleteOutlined, EditOutlined, AddOutlined} from '@mui/icons-material';
import TestButton from "../../components/TestButton";
import Toast from "../../components/Toast";

const Discovery = ({theme, preferredMode, open}) => {
  const [rows, setRows] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState({})
  const [editId, setEditId] = useState("")
  const [values, setValues] = useState({})
  const [isTostVisible, setIsTostVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("success")

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
        width: 180,
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
          return <TestButton setMessage={setMessage} setSeverity={setSeverity} setIsTostVisible={setIsTostVisible} id={params.id} severity={params.row.severity} theme={theme} preferredMode={preferredMode}/>;
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{margin:open? "4rem 0 0 15rem": "4rem 0 0 4rem",
      paddingTop: "1rem",
      transition: "margin 0.3s ease-in-out", width: open? "89.5rem":"100rem"
      }}>
      <Box paddingBottom="0.5rem">
      <IconButton onClick={()=> setIsFormVisible(!isFormVisible)} variant="contained" sx={{color:preferredMode? "#18FFFF":"#03a9f4",marginLeft:"1.5rem", borderRadius:"0"}}>
        <AddOutlined fontSize="medium"/>
        <Typography>Add</Typography>
      </IconButton >
      <Form setRows={setRows} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} clusterName="" fqdnIp="" port="" action={"Add"} setMessage={setMessage} setSeverity={setSeverity} setIsToastVisible={setIsTostVisible} preferredMode={preferredMode} theme={theme}/>
      </Box>
      <Box sx={{width: open? "89.5rem":"100rem", transition: "width 0.3s ease-in-out",}}>
      <Container sx={{ margin: "0", "@media (min-width: 1200px)": { maxWidth: "100%" } }}>
        <CardContent sx={{padding:"1rem 0 0 1rem"}}>
          <Grid container direction="column" spacing={2}>
            <Grid sx={{ width:"100%", transition: "width 0.3s ease-in-out",
             "& .MuiDataGrid-root": {
              padding: "0",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: preferredMode? "#272727":"#03a9f4",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: preferredMode? "#424242":"#f5f5f5",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
            "& .MuiCheckbox-root": {
              color: 'red !important',
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: 'red !important',
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
    </Box>
    </Box>
    {isEditing && (<Form setRows={setRows} isFormVisible={isEditing} setIsFormVisible={setIsEditing} clusterName={values.clusterName} fqdnIp={values.fqdnIp} port={values.port} action={"Save"} setMessage={setMessage} setSeverity={setSeverity} setIsToastVisible={setIsTostVisible} preferredMode={preferredMode} theme={theme} editId={editId}/>)}
    <ConfirmDelete setRows={setRows} deleteDetails={deleteDetails} setIsConfirmDelete={setIsConfirmDelete} isConfirmDelete={isConfirmDelete}/>
    <Toast message={message} severity={severity} isToastVisible={isTostVisible} setIsToastVisible={setIsTostVisible}/>
    </ThemeProvider>
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
