import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getDataForUpdate, updateCard } from "../auth/firebase";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    getDataForUpdate(id, setUpdate);
  }, []);
  console.log(update);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleSubmit = () => {
    const { id, title, image, text, email, date } = update;
    console.log(id);
    updateCard(id, title, image, text, email, date);
    navigate("/");
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
        width="400px"
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
          ── Update Blog ──
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
            value={update.title}
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
            value={update.image}
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
            value={update.text}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#056582",
              fontWeight: "bold",
            }}
          >
            SUBMİT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Update;
