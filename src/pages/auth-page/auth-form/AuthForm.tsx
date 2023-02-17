import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Controller, SubmitHandler, useForm, useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./auth-form.css";
import { loginValidation, passwordValidation } from "./validation";

interface ISignInForm {
    login: string;
    password: string;
  }

const AuthForm: React.FC = () => {
  let navigate = useNavigate();
  const onRegistration = () => {
    navigate("/register");
  };

  const { handleSubmit, control} = useForm<ISignInForm>({
    mode: "onChange"
  });
  const { errors, isValid } = useFormState({
    control, 
  });

  const onFormSubmit: SubmitHandler<ISignInForm> = async (data) => {
    try {
      console.log(data);
      let res = await axios.post('http://localhost:3020/api/login', data);
      navigate("/personal");
    }
    catch (err: any){
      console.log(err);
      if(err.response.status == 404) {
        alert('Пароль или логин введены неверно')
      }
    }
     
  };

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

      <form className="auth-form_form"
      onSubmit={handleSubmit(onFormSubmit)}>
      <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Login"
              size="small"
              margin="normal"
              className="auth-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              size="small"
              margin="normal"
              className="auth-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          disabled={!isValid}
          sx={{
            marginTop: 2,
          }}
        >
          Login
        </Button>
      </form>

<div className="auth-form_registration">
    <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form_subtitle2"
      >
        Do not have an account?
      </Typography>

      <Button variant="text" type="button" onClick={onRegistration}>
        Registration
      </Button>
</div>
      
    </div>
  );
};

export default AuthForm;
