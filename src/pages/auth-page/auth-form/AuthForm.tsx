import { Typography } from "@mui/material";
import React from "react";
import "./auth-form.css";

const AuthForm: React.FC = () => {
  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        Authorization
      </Typography>

      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form_subtitle"
      >
        To get access
      </Typography>
    </div>
  );
};

export default AuthForm;
