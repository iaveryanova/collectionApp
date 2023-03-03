import React, {useContext, useState} from 'react'
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import {Button, Checkbox, Stack, Typography} from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from 'react';
import http from '../../http';
import {UserContext} from "../../App";
import {fieldIntegerValidation, fieldStringValidation} from "../create-item-page/validation";
import { FormattedMessage } from 'react-intl';

const CollectionPage:React.FC = () => {

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
      },}
  ];
  const lastColumns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Date of creation', width: 180, renderCell: (params) => (new Date(params.row.createdAt).toLocaleString()) },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {context?.token &&
                <NavLink
                    to={"/item/" + params.row.id + "/edit"}
                    style={{textDecoration: "none"}}
                >
                    <Button variant="outlined">
                        Edit
                    </Button>
                </NavLink>
            }
          </div>
        );
      }
    }
  ];


  const context = useContext(UserContext);
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
  const [collection, setCollection] = useState<any>([]);
  const [cols, setCols] = useState(columns);

  const rows = items;

  const getItemsByCollectionID = async (id:string|null) => {
    try {
      if (id) {
        let collection = await http.get("/collection/" + id );
        if(collection.data.collection){
          const obj_collection = collection.data.collection;

          setItems(obj_collection.ItemCollections)
          setCollection(obj_collection);

          let addColumns:GridColDef[] = [];
          if(obj_collection.CustomFieldsCollections.length > 0){
            addColumns = obj_collection.CustomFieldsCollections.map((field:any)=>{
              return {
                field: field.custom_field,
                headerName: field.name,
                renderCell: (params:any) => {

                  return (<div>{field.custom_field.includes('field_date') ? new Date(params.row[field.custom_field]).toLocaleString() :
                    field.custom_field.includes('field_bool') ? <Checkbox disabled checked = {params.row[field.custom_field]} /> : params.row[field.custom_field]}</div>)},
                width: 150
              }
            });
          }

          let bufArray = cols.concat(addColumns);
          setCols(bufArray.concat(lastColumns));


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
    <FormattedMessage id="app.collection-page.header" />: {collection.name}
      </Typography>

    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={cols}
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
          disabled={!context?.token || (!selectedRows || selectedRows.length == 0)}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={createItem}
          disabled={!context?.token}
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