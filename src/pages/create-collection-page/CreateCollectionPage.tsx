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
import { useNavigate } from "react-router-dom";

interface ICreateCollectionForm {
  name: string;
  desc: string;
  theme: string;
  field_text_1: string;
  field_text_2: string;
  field_text_3: string;
  field_string_1: string;
  field_string_2: string;
  field_string_3: string;

}

const CreateCollectionPage: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<ICreateCollectionForm>({
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

  const navigate = useNavigate();
  const onCollectionList = () => {
    navigate("/personal");
  };

  const resetForm = () => {
    reset();
  };

  return (
    <div className="wrapper-create-collection-page">
      <form
        className="create-collection-form"
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          width: "500px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Collection
        </Typography>
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
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
            required
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
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
            required
              label="Theme"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.theme?.message}
              helperText={errors.theme?.message}
            />
          )}
        />


<Controller
          control={control}
          name="desc"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
            required
            multiline
              label="Description"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.desc?.message}
              helperText={errors.desc?.message}
            />
          )}
        />

        

        <Typography variant="h6" gutterBottom>
          Additional characteristics
        </Typography>

        <Typography
          variant="subtitle1"
          component="div"
          gutterBottom={true}
          sx={{ color: "rgb(180, 184, 193)" }}
        >
          Enter the name of the required fields
        </Typography>

        <Controller
          control={control}
          name="field_text_1"
          render={({ field }) => (
            <TextField
            variant="filled"
              label="Text field 1"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

<Controller
          control={control}
          name="field_text_2"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Text field 2"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />


<Controller
          control={control}
          name="field_text_3"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Text field 3"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

<Controller
          control={control}
          name="field_string_1"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="String field 1"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

<Controller
          control={control}
          name="field_string_2"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="String field 2"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

<Controller
          control={control}
          name="field_string_3"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="String field 3"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
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
            onClick={resetForm}
            variant="outlined"
            startIcon={<RestartAltIcon />}
            disabled={!isValid}
          >
            Reset
          </Button>

          <Button
            onClick={onCollectionList}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back to collection list
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollectionPage;
