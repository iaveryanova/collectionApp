import React from "react";
import { useNavigate } from "react-router-dom";
import "./register-form.css";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
import {
  loginValidation,
  passwordValidation,
  emailValidation,
} from "./validation";
import http from "../../../http";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = (props) => {
  let navigate = useNavigate();

  const { handleSubmit, control, setError } = useForm<IRegisterForm>({
    mode: "onChange",
  });

  const { errors, isValid } = useFormState({
    control,
  });
  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "password",
        message: "Passwords does not match",
      });
      return;
    } else {
      try{
        let res = await http.post('/register', data);
        alert("Congratulations, you are registered!!!");
        navigate("/auth");
      }
      catch (e){
        console.log(e)
         //@ts-ignore
        alert(e.response.data.error.original.sqlMessage);
      }
    }
  };

  return (
    <div className="register-form">
      <Typography variant="h4" component="div">
        Registration
      </Typography>

      <form className="register-form_form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "Required to fill" }}
          render={({ field }) => (
            <TextField
              label="First Name"
              size="small"
              margin="normal"
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.firstName?.message}
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Required to fill" }}
          render={({ field }) => (
            <TextField
              label="Last Name"
              size="small"
              margin="normal"
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Login"
              size="small"
              margin="normal"
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              label="Email"
              size="small"
              margin="normal"
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
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
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: "Required to fill" }}
          render={({ field }) => (
            <TextField
              label="Confirm password"
              type="password"
              size="small"
              margin="normal"
              className="register-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
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
          Sign-up
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
