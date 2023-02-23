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

const ViewItemPage: React.FC = () => {
  const createData = (property: string, value: string) => {
    return { property, value };
  };

  const [name, setName] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [collection, setCollection] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [customFields, setCustomFields] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);

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
        setCustomFields(obj_item.Collection.CustomFieldsCollections);
        setComments(obj_item.Comments);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  interface ISendCommentForm {
    comment: string;
    id: string
  }

  const { handleSubmit, control } = useForm<ISendCommentForm>({
    mode: "onChange",
  });
  const { errors, isValid } = useFormState({
    control,
  });

  const onFormSubmit: SubmitHandler<ISendCommentForm> = async (data) => {
    try {
      console.log(data)
      // let comment = await http.post('comment', data);
      // navigate("/personal");
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

      <div>
        Custom Fields:
        {customFields.map((option: any) => (
          <div key={option.id}>{option.name}</div>
        ))}
      </div>

      <div>
        Comments:
        {comments.map((option: any) => (
          <div key={option.id}>{option.text}</div>
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
            <input
              hidden
              readOnly
              value= {id}
            />
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
    </div>
  );
};

export default ViewItemPage;
