import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ViewItemPage: React.FC = () => {
  const createData = (property: string, value: string) => {
    return { property, value };
  };

  const [name, setName] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [collection, setCollection] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [customFieldsProperty, setCustomFieldsProperty] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [customFieldsValue, setCustomFieldsValue] = useState<any>([]);

  const rows = [
    createData("Name Item:", name),
    createData("Date of creation", date),
    createData("Collection", collection),
    createData("Who created", user),
  ];

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDataByItemID(id);
    }
  }, []);

  const getDataByItemID = async (id: string) => {
    try {
      let item = await http.get("/item/" + id);
      if (item.data) {
        console.log(item.data.item);
        const obj_item = item.data.item;

        setName(obj_item.name);
        setDate(obj_item.createdAt);
        setCollection(obj_item.Collection.name);
        setUser(obj_item.Collection.User.firstName);
        setCustomFieldsProperty(obj_item.Collection.CustomFieldsCollections);
        setComments(obj_item.Comments);
        setValue("id", id);

        let customFields = [];
        if (obj_item.field_bool_1 != null) {
          customFields.push(obj_item.field_bool_1);
        }
        if (obj_item.field_bool_2 != null) {
          customFields.push(obj_item.field_bool_2);
        }
        if (obj_item.field_bool_3 != null) {
          customFields.push(obj_item.field_bool_3);
        }
        if (obj_item.field_date_1 != null) {
          customFields.push(obj_item.field_date_1);
        }
        if (obj_item.field_date_2 != null) {
          customFields.push(obj_item.field_date_2);
        }
        if (obj_item.field_date_3 != null) {
          customFields.push(obj_item.field_date_3);
        }
        if (obj_item.field_integer_1 != null) {
          customFields.push(obj_item.field_integer_1);
        }
        if (obj_item.field_integer_2 != null) {
          customFields.push(obj_item.field_integer_2);
        }
        if (obj_item.field_integer_3 != null) {
          customFields.push(obj_item.field_integer_3);
        }
        if (obj_item.field_string_1 != null) {
          customFields.push(obj_item.field_string_1);
        }
        if (obj_item.field_string_2 != null) {
          customFields.push(obj_item.field_string_2);
        }
        if (obj_item.field_string_3 != null) {
          customFields.push(obj_item.field_string_3);
        }
        if (obj_item.field_text_1 != null) {
          customFields.push(obj_item.field_text_1);
        }
        if (obj_item.field_text_2 != null) {
          customFields.push(obj_item.field_text_2);
        }
        if (obj_item.field_text_3 != null) {
          customFields.push(obj_item.field_text_3);
        }

        setCustomFieldsValue(customFields);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  interface ISendCommentForm {
    comment: string;
    id: string;
  }

  const { handleSubmit, control, setValue } = useForm<ISendCommentForm>({
    mode: "onChange",
  });
  const { errors, isValid } = useFormState({
    control,
  });

  const onFormSubmit: SubmitHandler<ISendCommentForm> = async (data) => {
    try {
      console.log(data);
      let comment = await http.post("comment", data);
    } catch (err: any) {
      if (err.response.status == 404) {
        alert("Ошибка");
      }
    }
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: 500 }}>
        <Table sx={{ width: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.property}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.property}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px" }}>Custom Fields</div>
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "250px" }}
        >
          {" "}
          Property
          {customFieldsProperty.map((option: any) => (
            <TextField
              key={option.id}
              id="outlined-basic"
              variant="outlined"
              defaultValue={option.name}
              sx={{ width: "100%" }}
            />
          ))}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "250px" }}
        >
          {" "}
          Value
          {customFieldsValue.map((option: any) => (
            <TextField
              key={option}
              id="outlined-basic"
              variant="outlined"
              defaultValue={option}
              sx={{ width: "100%" }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          marginTop: "20px",
        }}
      >
        <div>Comments:</div>
        {comments.map((option: any) => (
          <TextField
            key={option.id}
            id="outlined-basic"
            variant="outlined"
            defaultValue={option.text}
            sx={{ width: "100%" }}
          />
        ))}
      </div>

      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        style={{ color: "rgb(180, 184, 193)", marginTop: "10px" }}
      >
        Add comments
      </Typography>

      <form
        style={{ maxWidth: "500px", display: "flex" }}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Controller
          control={control}
          name="comment"
          // rules={loginValidation}
          render={({ field }) => (
            <TextField
              multiline
              label="Text"
              size="small"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <input hidden readOnly value={field.value || ""} />
          )}
        />

        <Button
          endIcon={<SendIcon />}
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          disabled={!isValid}
          sx={{
            width: 100,
          }}
        >
          Send
        </Button>
      </form>

      <Button
        endIcon={<ThumbUpIcon />}
        type="submit"
        variant="contained"
        fullWidth={true}
        disableElevation={true}
        sx={{
          width: 100,
          marginTop: "20px",
        }}
      >
        Like
      </Button>
    </div>
  );
};

export default ViewItemPage;
