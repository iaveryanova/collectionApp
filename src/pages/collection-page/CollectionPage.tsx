import React from 'react'
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Item name', width: 300 },
  { field: 'createdAt', headerName: 'Date of creation', width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      const onClick = (_event: any) => {
        const currentRow = params.row;
        return alert(JSON.stringify(currentRow));
        
      };
      return (
        <div>
          <Button variant="outlined" onClick={onClick}>Edit</Button>
        </div>
      );
    },
  },
];


const rows = [
  { id: 1, name: 'Snow', createdAt: '11.11.1111'},
  { id: 2, name: 'Snow', createdAt: '11.11.1111'},
  { id: 3, name: 'Snow', createdAt: '11.11.1111'},
  { id: 4, name: 'Snow', createdAt: '11.11.1111'},
  { id: 5, name: 'Snow', createdAt: '11.11.1111'},

];


const CollectionPage:React.FC = () => {

  let navigate = useNavigate();
  const createCollection = () => {
    navigate("/createitem");
  };

  const onCollectionList = () => {
    navigate("/personal");
  };

  const [selectedRows, setSelectedRows] =
    React.useState<GridSelectionModel | null>([]);

  return (
<>
<Typography variant="h4" gutterBottom>
        Collection Name
      </Typography>

    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      getRowHeight={() => "auto"}
      onSelectionModelChange={(itm) => setSelectedRows(itm)}
      disableSelectionOnClick
    />
    </div>

    <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          // onClick={deleteAction}
          disabled={!selectedRows || selectedRows.length == 0}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={createCollection}
        >
          Add Item
        </Button>

        <Button
            onClick={onCollectionList}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back to collection list
          </Button>
      </Stack>
</>
    
  
  )
}

export default CollectionPage
