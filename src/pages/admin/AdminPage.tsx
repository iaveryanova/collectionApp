import { Typography } from '@mui/material';
import * as React from 'react';
import {useEffect} from "react";
import http from "../../http";

const AdminPage: React.FC = () => {

  useEffect(() => {
    getCollections();
  }, []);

  // const rows = collections;

  const getCollections = async () => {
    try {
      const users = await http.get("/users");
      console.log(users);
      // setCollections(collections.data.collections);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>
      <Typography variant="h5" gutterBottom>
        Admin page
      </Typography>
    </>
  );
};

export default AdminPage;