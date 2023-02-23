import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridSelectionModel } from "@mui/x-data-grid";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import http from "../../http";
import Cookies from "js-cookie";

interface ICollection {
  id: number;
  name: string;
  desc: string;
  image: FileList;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Collection name",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          <NavLink
            to={"/collection/" + params.row.id}
            style={{ textDecoration: "none" }}
          >
            {params.value}
          </NavLink>
        </div>
      );
    },
  },
  { field: "desc", headerName: "Short description", width: 300 },
  {
    field: "ThemeCollection",
    headerName: "Theme",
    width: 90,
    renderCell: (params) => {
      return <div>{params.value.name}</div>;
    },
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <img
            src={params.value || "./assets/place_img.jpg"}
            alt=""
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <NavLink
            to={"/collection/" + params.row.id + "/edit"}
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

const PersonalPage: React.FC = () => {
  let navigate = useNavigate();
  const createCollection = () => {
    navigate("/createcollection");
  };

  const [selectedRows, setSelectedRows] =
    React.useState<GridSelectionModel | null>([]);

  const [collections, setCollections] = useState<any>([]);

  useEffect(() => {
    getCollections();
  }, []);

  const rows = collections;

  const getCollections = async () => {
    try {
      const collections = await http.get("/collections");
      console.log(collections);
      setCollections(collections.data.collections);
    } catch (e) {
      console.log(e);
    }
  };
  
  const deleteAction = async () => {
    try {
      const result = await http.post("/collections/delete", {id: selectedRows});
      if(result){
        getCollections();
        
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My collections
      </Typography>

      <div
        style={{ height: 400, width: "100%", marginTop: 10, marginBottom: 10 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
          onClick={createCollection}
        >
          Add Collections
        </Button>
      </Stack>
    </>
  );
};

export default PersonalPage;
