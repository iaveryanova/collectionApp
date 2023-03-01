import React, { useEffect, useState } from "react";
import "./create-collection-page.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import http from "../../http";

interface ICreateCollectionForm {
  id: number;
  author_id: string;
  name: string;
  desc: string;
  theme: string;

  image: FileList;

  field_string_1: string;
  field_string_2: string;
  field_string_3: string;

  field_integer_1: string;
  field_integer_2: string;
  field_integer_3: string;

  field_text_1: string;
  field_text_2: string;
  field_text_3: string;

  field_date_1: string;
  field_date_2: string;
  field_date_3: string;

  field_bool_1: string;
  field_bool_2: string;
  field_bool_3: string;
}

const CreateCollectionPage: React.FC = () => {
  const { handleSubmit, control, reset, setValue } =
    useForm<ICreateCollectionForm>({
      mode: "onChange",
    });
  const { errors, isValid } = useFormState({
    control,
  });

  const { id, userId } = useParams();

  const getCollectionById = async (id: string) => {
    try {
      let collection = await http.get("/collection/" + id);
      if (collection.data.collection) {
        const obj_collection = collection.data.collection;
        for (let key in obj_collection) {
          // @ts-ignore
          setValue(key, obj_collection[key]);
        }

        // @ts-ignore
        obj_collection.CustomFieldsCollections.forEach((field) =>
          setValue(field.custom_field, field.name)
        );

        setValue("theme", obj_collection.ThemeCollection.id);
        setImg(collection.data.collection.image);
      }
    } catch (err: any) {
      console.log(err);
      navigate('/personal');
    }
  };

  useEffect(() => {
    getThemes();
    if (id) {
      getCollectionById(id);
    }

    if (userId) {
      setValue("author_id", userId);
    }
  }, []);

  const [img, setImg] = useState<any>(null);

  const onFormSubmit: SubmitHandler<ICreateCollectionForm> = async (data) => {
    try {
      console.log(data);
      let res = await http.post("/collection/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      onCollectionList();
    } catch (err: any) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const onCollectionList = () => {
    navigate("/personal");
    if (userId) {
      navigate("/user/" + userId);
    } else {
      navigate("/personal");
    }
  };

  const handleCapture = (files: FileList) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = function (e) {
        setImg(this.result);
      };
    }
  };

  const resetForm = () => {
    setImg(null);
    reset();
  };

  const getThemes = async () => {
    try {
      const themes = await http.get("/themes");
      setThemes(themes.data.themes);
      // console.log(themes.data.themes);
    } catch (e) {
      console.log(e);
    }
  };

  const [themes, setThemes] = useState<any>([]);

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

        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <input hidden readOnly value={field.value || ""} />
          )}
        />

        <Controller
          control={control}
          name="author_id"
          render={({ field }) => (
            <input hidden readOnly value={field.value || ""} />
          )}
        />

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
              width: "160px",
              display: "flex",
              alignItems: "center",
              background: img ? "url(" + img + ") no-repeat center" : "none",
              backgroundSize: "cover",
            }}
          >
            {img ? "" : "Collection image"}
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" component="label" size="large">
              Upload image
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) {
                        handleCapture(event.target.files);
                      }
                      return field.onChange(event.target.files);
                    }}
                  />
                )}
              />
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
              select
              label="Theme"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.theme?.message}
              helperText={"Please select your theme" || errors.theme?.message}
            >
              {themes.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
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
          name="field_integer_1"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Integer field 1"
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
          name="field_integer_2"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Integer field 2"
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
          name="field_integer_3"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Integer field 3"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

        <br />

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

        <br />

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

        <br />

        <Controller
          control={control}
          name="field_date_1"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Date field 1"
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
          name="field_date_2"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Date field 2"
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
          name="field_date_3"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Date field 3"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

        <br />

        <Controller
          control={control}
          name="field_bool_1"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Boolean field 1"
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
          name="field_bool_2"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Boolean field 2"
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
          name="field_bool_3"
          render={({ field }) => (
            <TextField
              variant="filled"
              label="Boolean field 3"
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
