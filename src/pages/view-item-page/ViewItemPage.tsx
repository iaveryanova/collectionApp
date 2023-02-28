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
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {FavoriteBorder} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ViewItemPage: React.FC = () => {
  // const createData = (property: string, value: string) => {
  //   return { property, value };
  // };

  // const [name, setName] = useState<any>([]);
  // const [date, setDate] = useState<any>([]);
  // const [collection, setCollection] = useState<any>([]);
  // const [user, setUser] = useState<any>([]);
  // const [customFieldsProperty, setCustomFieldsProperty] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // const [customFieldsValue, setCustomFieldsValue] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);

  const [item, setItem] = useState<any>([]);

  // const rows = [
  //   createData("Name Item:", name),
  //   createData("Date of creation", date),
  //   createData("Collection", collection),
  //   createData("Who created", user),
  // ];



  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDataByItemID(id);

      const interval = setInterval(() => {
        getIncomingComments(id);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const getIncomingComments = async (id: string) => {
    try {
      const res = await http.get("item/" + id + "/comments");
      setComments(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  };
  const doLike = async () => {
    try{
      const res = await http.post("item/like", {id: id});
      if(res){
        setIsLiked(res.data.isLiked);
        setLikes(res.data.likes)
        return true;
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  const getDataByItemID = async (id: string) => {
    try {
      let result = await http.get("/item/" + id);
      if (result.data) {
        console.log(result.data.item);
        const item = result.data.item;

        setItem(item);
        // setName(obj_item.name);
        // setDate(obj_item.createdAt);
        // setCollection(obj_item.Collection.name);
        // setUser(obj_item.Collection.User.firstName);
        // setCustomFieldsProperty(obj_item.Collection.CustomFieldsCollections);
        setComments(item.Comments);
        setLikes(item.Likes);
        setIsLiked(result.data.isLiked);

        let fields_info = [
          {property: "Name", value: item.name, field: 'name'},
          {property: "Description", value: item.desc, field: 'desc'},
          {property: "Collection", value: item.Collection.name, field: 'collection'},
          {property: "Author", value: item.Collection.User.firstName + ' ' + item.Collection.User.lastName + ' (' + item.Collection.User.login + ')', field: 'user'},
          {property: "Date of creation", value: new Date(item.createdAt).toLocaleString(), field: 'createdAt'},
        ];

        item.Collection.CustomFieldsCollections.map((field:any) => {
          fields_info.push({property: field.name, value: item[field.custom_field], field: field.custom_field});
        });

        setFields(fields_info);
        setValue("id", id);

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
      let res = await http.post("comment", data);

      setValue('comment', '');
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        View item - {item.id} : {item.name}
      </Typography>
      <TableContainer component={Paper} sx={{ width: 900 }}>
        <Table sx={{ width: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row:any) => (
              <TableRow
                key={row.property}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.property}
                </TableCell>
                <TableCell align="left">
                  {
                    row.field.includes('field_date') ? new Date(row.value).toLocaleString() :
                    row.field.includes('field_bool') ? <Checkbox disabled checked = {row.value} /> : row.value
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        endIcon={ isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
        type="submit"
        variant="contained"
        fullWidth={true}
        disableElevation={true}
        onClick={doLike}
        sx={{
          width: 100,
          marginTop: "20px",
        }}
      >
        {likes.length}
      </Button>

      <Typography variant="h5" gutterBottom sx={{
        marginTop: "20px",
      }}>
        Comments: {comments.length ?? 0}
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          marginTop: "20px",
        }}
      >
        {comments &&
          comments.map((comment: any) => (
          // <TextField
          //   key={option.id}
          //   id="outlined-basic"
          //   variant="outlined"
          //   defaultValue={option.text}
          //   sx={{ width: "100%" }}
          // />
            <div key={comment.id}>
              <div>{ new Date(comment.createdAt).toLocaleString() + " - " + item.Collection.User.firstName + ' ' + item.Collection.User.lastName + ' (' + item.Collection.User.login + ')'}</div>
              <div><p>{comment.text}</p></div>
            </div>
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

    </div>
  );
};

export default ViewItemPage;