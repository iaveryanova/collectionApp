import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

type PropTypes = {
  id: string;
  date: string;
  name: string;
  author: string;
  countItem: number;
};

const CollectionCard: React.FC<PropTypes> = (props) => {
  const navigate = useNavigate();

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {new Date(props.date).toLocaleString()}
        </Typography>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.author}
        </Typography>
        <Typography variant="body2">Count item: {props.countItem}</Typography>
      </CardContent>
      <CardActions>
        <NavLink
          to={"/collection/" + props.id}
          style={{ textDecoration: "none" }}
        >
          <Button size="small"><FormattedMessage id="app.home-page.button1" /></Button>
        </NavLink>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275, maxWidth: 300 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default CollectionCard;
