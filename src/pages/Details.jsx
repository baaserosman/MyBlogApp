import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { AccountCircle } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "../pages/login.css";
import { AuthContext } from "../context/AuthContext";
import { deleteCard } from "../auth/firebase";

const Details = () => {
  const navigate = useNavigate();
  const card = useLocation();
  const { currentUser } = useContext(AuthContext);
  const { text, title, image, email, date, id } = card.state;
  console.log(currentUser);

  return (
    <Box
      className="banner"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "120vh",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          borderRadius: "20px",
          m: 3,
          boxShadow: "10px 10px 5px 0px #000000a9",
          textAlign: "center",
        }}
      >
        <CardMedia component="img" image={image} alt={title} />
        <CardHeader
          sx={{ bgcolor: "#e7e6f5" }}
          title={title}
          subheader={date}
        />
        <CardContent sx={{ bgcolor: "#e7e6f5" }}>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardContent sx={{ textAlign: "left", m: 0, p: 0 }}>
          <Typography variant="body2" color="text.secondary">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {email}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>

      {currentUser?.email === email && (
        <Box>
          <Button
            variant="contained"
            sx={{ marginRight: "6rem", bgcolor: "#3D3D3D", fontWeight: "bold" }}
            onClick={() => {
              navigate(`/update/${id}`);
            }}
          >
            UPDATE
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "red",
              color: "#fff",
              fontWeight: "bold",
            }}
            className="delete"
            onClick={() => {
              deleteCard(id);
              navigate("/");
            }}
          >
            DELETE
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Details;
