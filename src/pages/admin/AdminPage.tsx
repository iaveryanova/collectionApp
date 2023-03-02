import {Button, Typography} from '@mui/material';
import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import http from "../../http";
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {NavLink, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {UserContext} from "../../App";

const AdminPage: React.FC = () => {

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150
    },
    {
      field: "login",
      headerName: "Login",
      width: 150
    },
    {
      field: "collections",
      headerName: "Collections",
      width: 150,
      renderCell: (params) =>{
        return (
          <div>
            {params.row.Collections.length > 0 ?
              <NavLink
                to={"/user/" + params.row.id}
                style={{ textDecoration: "none" }}
              >
                <div>
                  Collections ({params.row.Collections.length})
                </div>
              </NavLink>
              :
              <div>Empty collections</div>
            }
          </div>
        );
      }
    },
    {
      field: "is_admin",
      headerName: "Admin",
      width: 150,
      renderCell: (params) =>{
        return (
          <div>
            {params.row.is_admin ?
              <span>Admin</span>
              :
                <Button variant="outlined" onClick={async() => {
                  try {
                    const res = await http.get("/user/" + params.row.id + "/to-admin");
                    if (res) {
                      navigate(0);
                    }
                  }
                  catch (e) {
                    navigate('/');
                  }
                }}>
                  Up to Admin
                </Button>
            }
          </div>
        );
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => (
        <div>{params.row.status == 1 ? <div>Active</div>: <div>Block</div>}</div>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
              <Button variant="outlined" onClick={async() => {

                try {
                  const res = await http.get("/user/" + params.row.id + "/to-delete");
                  if (res) {
                    navigate(0);
                  }
                }
                catch (e) {
                  navigate('/');
                }
              }}>
                Delete
              </Button>

              <Button variant="outlined" onClick={async() => {

                try {
                  const res = await http.get("/user/" + params.row.id + "/to-block");
                  if (res) {
                    navigate(0);
                  }
                }
                catch (e) {
                  navigate('/');
                }
              }}>
                {params.row.status == 1 ? <div>Block</div> : <div>Unblock</div>}
              </Button>

          </div>
        );
      },
    },
  ];


  const [users, setUsers] = useState<any>([]);

  const [selectedRows, setSelectedRows] =
    React.useState<GridSelectionModel | null>([]);


  useEffect(() => {
    getUsers();
  }, []);

  const rows = users;

  const getUsers = async () => {
    try {
      const users = await http.get("/users");
      setUsers(users.data);
    } catch (e) {
      console.log(e);
      const token = Cookies.get('token');
      context?.setToken(token ? token : '');

      navigate('/');
    }
  };


  return (
    <>
      <Typography variant="h5" gutterBottom>
        Admin page
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

    </>
  );
};

export default AdminPage;