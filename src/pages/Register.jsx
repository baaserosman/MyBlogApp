import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import SignUpForm from "../components/register/SignUpForm";
import { SignUpValidationSchema } from "../components/register/SignUpValidataionSchema";
import "./login.css";

const Register = () => {
  return (
    <Box
      className="banner "
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        container: "fluid",
      }}
    >
      <Box
        maxWidth="400px"
        sx={{
          m: 2,
          p: 2,
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "fit-content",
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
          sx={{ mb: 2, color: "#056582", fontWeight: "bold" }}
        >
          Register
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={SignUpValidationSchema}
          onSubmit={(values, actions) => {
            alert(`
             email: ${values.email}
             password: ${values.password}
            `);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <SignUpForm {...props} />}
        ></Formik>
      </Box>
    </Box>
  );
};

export default Register;
