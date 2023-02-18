import React from "react";
import "./create-collection-page.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, TextareaAutosize, TextField, Typography } from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ICreateCollectionForm {
  name: string;
  desc: string;
  theme: string;
}

const CreateCollectionPage: React.FC = () => {
  const { handleSubmit, control } = useForm<ICreateCollectionForm>({
    mode: "onChange",
  });
  const { errors, isValid } = useFormState({
    control,
  });

  const onFormSubmit: SubmitHandler<ICreateCollectionForm> = async (data) => {
    try {
      console.log(data);
    } catch (err: any) {
      if (err.response.status == 404) {
        alert("Данные введены не верно");
      }
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Collection
      </Typography>

      <form
        className="create-collection-form"
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          width: "450px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="span"
            sx={{
              p: 2,
              border: "1px dashed grey",
              height: "150px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Collection image
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" component="label" size="large">
              Upload image
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>
        </div>

        <Controller
          control={control}
          name="name"
          // rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Collection name"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="theme"
          // rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Theme"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="desc"
          rules={{ required: true }}
          render={({ field }) => (
            <TextareaAutosize
              aria-label="Description"
              placeholder="Description"
              style={{
                width: 450,
                height: 100,
                padding: 10,
                marginTop: "10px",
              }}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              // onError={!!errors.desc?.message}
              // helperText={errors.desc?.message}
            />
          )}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disableElevation={true}
            disabled={!isValid}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button 
          variant="outlined" 
          startIcon={<RestartAltIcon />}
          disabled={!isValid}
          >
            Reset
          </Button>

          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back to collection list
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateCollectionPage;
