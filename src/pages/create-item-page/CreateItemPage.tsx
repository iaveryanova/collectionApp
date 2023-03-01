import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import SaveIcon from "@mui/icons-material/Save";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fieldIntegerValidation, fieldStringValidation } from "./validation";

interface ICreateItemForm {
  collectionId: string;
  id: string;
  name: string;
  desc: string;

  field_string_1: string;
  field_string_2: string;
  field_string_3: string;

  field_integer_1: number;
  field_integer_2: number;
  field_integer_3: number;

  field_text_1: string;
  field_text_2: string;
  field_text_3: string;

  field_date_1: string;
  field_date_2: string;
  field_date_3: string;

  field_bool_1: boolean;
  field_bool_2: boolean;
  field_bool_3: boolean;
}

const CreateItemPage: React.FC = () => {

  const { id , itemId} = useParams();
  const [customFields, setCustomFields] = useState<any>([]);
  const [collection, setCollection] = useState<any>([]);

  const getCustomFieldsByCollectionId = async (id: string) => {
    try {
      let collection = await http.get("/collection/" + id);

      const obj_collection = collection.data.collection;
      setCustomFields(obj_collection.CustomFieldsCollections);
      setCollection((obj_collection))
      setValue("collectionId", id)
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(id, itemId)
    if (id) {
      getCustomFieldsByCollectionId(id);
    } else if (itemId) {
      getDataByItemID(itemId);
    }

  }, []);

  const { handleSubmit, control, reset, setValue } = useForm<ICreateItemForm>({
    mode: "onChange",
  });
  const { errors, isValid } = useFormState({
    control,
  });

  const onFormSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log(data);
      let res = await http.post("/item/create", data);
    
      onCollectionPage();
    } catch (err: any) {
      console.log(err);
    }
  };

  const [date, setDate] = React.useState<Dayjs | null>(null);

  const navigate = useNavigate();
  const onCollectionPage = () => {
    navigate("/collection/" + collection.id);
  };

  const resetForm = () => {
    reset();
  };


  const getDataByItemID = async (id: string) => {
    try {
      let result = await http.get("/item/" + id);
      if (result.data) {
        if(result.data.canEdit){
          console.log(result.data.item);
          const item = result.data.item;
          setCustomFields(item.Collection.CustomFieldsCollections);
          setCollection(item.Collection);

          for (let key in item){
            // @ts-ignore
            setValue(key, item[key]);
          }
        }
        else{
          // alert('You cannot edit this item');
          navigate('/personal');
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  }; 


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Item
      </Typography>

      <Typography variant="h5" gutterBottom>
        Collection Name: {collection.name}
      </Typography>

      <form
        className="create-collection-form"
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          width: "500px",
        }}
      >

<Controller
          control={control}
          name="collectionId"
          render={({ field }) => (
            <input hidden readOnly value={field.value || ""} />
          )}
        />

<Controller
          control={control}
          name="id"
          render={({ field }) => (
            <input hidden readOnly value={field.value || ""} />
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              required
              label="Item name"
              size="small"
              margin="normal"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              error={!!errors.name?.message}
              helperText={errors.name?.message?.toString()}
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
              helperText={errors.desc?.message?.toString()}
            />
          )}
        />

        {customFields.map((option: any) => {
          return (
            <Controller
              control={control}
              name={option.custom_field}
              rules= { 
                option.custom_field.includes("field_integer") ? fieldIntegerValidation : option.custom_field.includes("field_string") ? fieldStringValidation :  {}
              }
              render={({ field }) => {
                console.log();

                return option.custom_field.includes("field_date") ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={option.name}
                      value={field.value || null}
                      onChange={(e) => field.onChange(e)}
                      renderInput={(field) => (
                        <TextField sx={{ width: 500 }} {...field} />
                      )}
                    />
                  </LocalizationProvider>
                ) : option.custom_field.includes("field_bool") ? (
                 <FormControlLabel
                 style={{width:"500px", marginLeft: "16px"}}
                    control={
                      <Controller
                        name={option.custom_field}
                        control={control}
                        render={({ field: props }) => (
                          <Checkbox
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                    }
                    label={option.name}
                  />
                 
                ) : (
                  <TextField
                    required
                    multiline
                    label={option.name}
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ""}
                    //@ts-ignore
                    error={!!errors[option.custom_field]?.message}
                    //@ts-ignore
              helperText={errors[option.custom_field]?.message}
                  />
                );
              }}
            />
          );
        })}

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
            onClick={onCollectionPage}
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

export default CreateItemPage;
