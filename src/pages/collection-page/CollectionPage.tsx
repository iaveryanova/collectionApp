import React, { useState } from 'react'
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from 'react';
import http from '../../http';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Item name', width: 300, renderCell: (params) => {
    return (
      <div>
        <NavLink
          to={"/item/" + params.row.id}
          style={{ textDecoration: "none" }}
        >
          {params.value}
        </NavLink>
      </div>
    );
  }, 
},
{ field: 'createdAt', headerName: 'Date of creation', width: 180, renderCell: (params) => (new Date(params.row.createdAt).toLocaleString()) },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <NavLink
            to={"/item/" + params.row.id + "/edit"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined">
              Edit
            </Button>
          </NavLink>

        </div>
      );
    },
  },
];


const CollectionPage:React.FC = () => {

  let navigate = useNavigate();
  const createItem = () => {
    navigate("/collection/" +  colId + "/createitem");
  };

  const onCollectionList = () => {
    navigate("/personal");
  };

  const [selectedRows, setSelectedRows] =
    React.useState<GridSelectionModel | null>([]);

  const {colId} = useParams();

  useEffect(() => {
    if (colId) {
      getItemsByCollectionID(colId);
    }
  },[])


  const [items, setItems] = useState<any>([]);
  const [name, setName] = useState<any>([]);

  const rows = items;

  const getItemsByCollectionID = async (id:string|null) => {
    try {
      if (id) {
        let collection = await http.get("/collection/" + id );
      if(collection.data.collection){
        const obj_collection = collection.data.collection;

        setItems(obj_collection.ItemCollections)
        setName(obj_collection.name)
      }
      }
    } catch (err: any) {
      console.log(err);
    }
  };


  const deleteAction = async () => {
    try {
      const result = await http.post("/items/delete", {id: selectedRows});
      if(result){
        getItemsByCollectionID(colId??null);
      }
    } catch (e) {
      console.log(e);
    }
  }


  return (
<>
    <Typography variant="h4" gutterBottom>
        Collection name: {name}
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
          onClick={deleteAction}
          disabled={!selectedRows || selectedRows.length == 0}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={createItem}
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
