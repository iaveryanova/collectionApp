import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridSelectionModel } from "@mui/x-data-grid";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "collection_name", headerName: "Collection name", width: 130, renderCell: (params) => {
    const onClick = (_event: any) => {
      const currentRow = params.row;
      return alert(JSON.stringify(currentRow));
      
    }
    return (
      <div>
        <NavLink to={"/collectionpage"} onClick={onClick} style={{textDecoration: "none"}}>{params.value}</NavLink>
      </div>
    );
  }},
  { field: "short_description", headerName: "Short description", width: 300 },
  { field: "subject", headerName: "Subject", width: 90 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <img
            src={params.value}
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
  {
    id: 1,
    collection_name: "Love novels",
    short_description: "Books that will make your heart beat faster",
    subject: "Books",
    image:
      "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
  },
  {
    id: 2,
    collection_name: "Love novels",
    short_description: "Books that will make your heart beat faster",
    subject: "Books",
    image:
      "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
  },
  {
    id: 3,
    collection_name: "Love novels",
    short_description: "Books that will make your heart beat faster",
    subject: "Books",
    image:
      "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
  },
  {
    id: 4,
    collection_name: "Love novels",
    short_description: "Books that will make your heart beat faster",
    subject: "Books",
    image:
      "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
  },
  {
    id: 5,
    collection_name: "Love novels",
    short_description: "Books that will make your heart beat faster",
    subject: "Books",
    image:
      "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
  },
];

const PersonalPage: React.FC = () => {
  let navigate = useNavigate();
  const createCollection = () => {
    navigate("/createcollection");
  };

  const [selectedRows, setSelectedRows] =
    React.useState<GridSelectionModel | null>([]);

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
          Add Collections
        </Button>
      </Stack>
    </>
  );
};

export default PersonalPage;
