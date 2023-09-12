import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { writeUserData } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";
import { CardContext } from "../context/CardContext";
import { toastNewBlog } from "../utils/customToastify";

const NewBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const { addCard } = useContext(CardContext);
  const { setAddCard } = useContext(CardContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    setAddCard({ ...addCard, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = new Date().getTime();
    const email = currentUser?.email;

    const date = new Date();
    const dates = [
      date.getDate(),
      " ",
      date.toLocaleString("default", { month: "long" }),
      " ",
      date.getFullYear(),
    ];
    const writeCard = { ...addCard, id: id, email: email, date: dates };
    console.log(email, id);
    // setAddCard({ ...addCard, id: id, email: email, date: dates });
    writeUserData(id, writeCard);
    toastNewBlog("New Blog successfully added.");
    navigate("/");
    setAddCard({});
  };

  return (
    <Box
      className="banner"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth="600px"
        minWidth="300px"
        sx={{
          p: 2,
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          boxShadow: "10px 10px 5px 0px #000000a9",
          borderRadius: "30px",
        }}
      >
        <Box
          width="200px"
          height="200px"
          sx={{
            borderRadius: "50%",
            bgcolor: "#056582",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            width="200px"
            component="img"
            src={"https://blogcw.netlify.app/static/media/blok.7e6674a5.png"}
          ></Box>
        </Box>

        <Typography
          variant="h5"
          component="h1"
          sx={{ mt: 1, color: "#056582", fontWeight: "bold" }}
        >
          ── New Blog ──
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title "
            variant="outlined"
            size="small"
            required
            fullWidth
            sx={{
              m: 1,
            }}
            name="title"
            onChange={handleChange}
            value={addCard.title}
          />
          <TextField
            id="outlined-basic"
            label="Image URL "
            variant="outlined"
            required
            fullWidth
            size="small"
            sx={{
              m: 1,
            }}
            name="image"
            onChange={handleChange}
            value={addCard.image}
          />
          <TextField
            id="outlined-multiline-static"
            label="Content "
            required
            multiline
            fullWidth
            rows={4}
            size="small"
            sx={{
              m: 1,
            }}
            name="text"
            onChange={handleChange}
            value={addCard.text}
          />
          <Button
            type="submit"
            variant="contained"
            required
            fullWidth
            sx={{
              bgcolor: "#056582",
              fontWeight: "bold",
            }}
          >
            Add New Blog
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default NewBlog;
