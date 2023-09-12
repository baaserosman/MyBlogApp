import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AccountCircle } from "@mui/icons-material";
import "./card.css";
import { Box } from "@mui/system";

const CardItem = ({ card }) => {
  const { image, text, title, email, date } = card;
  // console.log(card);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const cardOnClick = () => {
    if (currentUser) {
      navigate("/details", { state: card });
    } else {
      alert("Please Sign In..");
      navigate("/login");
    }
  };

  return (
    <Card
      className="cardcont"
      sx={{
        width: 300,
        m: 3,
        boxShadow: "10px 10px 5px 0px #000000a9",
      }}
    >
      <Box
        onClick={() => {
          cardOnClick();
        }}
        // onClick={() => {
        //   currentUser && navigate("/details", { state: card });
        // }}
        className="cardbox"
      >
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardHeader
          sx={{ bgcolor: "#e7e6f5" }}
          title={title}
          subheader={date}
        />
        <CardContent
          sx={{ bgcolor: "#e7e6f5", overflow: "hidden", height: "3.6rem" }}
        >
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Box>

      <CardContent sx={{ textAlign: "left", m: 0, p: 0 }}>
        <Typography variant="body2" color="text.secondary">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              currentUser && navigate("/profile");
            }}
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
  );
};

export default CardItem;
