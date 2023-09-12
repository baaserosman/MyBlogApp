import { Grid, TextField, Button } from "@mui/material";
import { Form } from "formik";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, signUpWithGoogle } from "../../auth/firebase";
import { AuthContext } from "../../context/AuthContext";

const SignUpForm = (props) => {
  const { values, handleChange, handleBlur, errors, touched } = props;
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser ? navigate("/") : navigate("/register");
    console.log(currentUser);
  }, [currentUser]);

  const handleRegister = () => {
    createUser(values.email, values.password);
    // navigate("/");
    console.log(values.email, values.password);
  };

  const handleGoogleSingIn = () => {
    signUpWithGoogle();
    currentUser && navigate("/");
    // console.log(currentUser);
  };

  return (
    <Form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="email"
            name="email"
            variant="outlined"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="password"
            name="password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleRegister}
            fullWidth
            sx={{ bgcolor: "#056582", fontWeight: "bold", boxShadow: "" }}
          >
            REGISTER
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#056582", fontWeight: "bold" }}
            onClick={handleGoogleSingIn}
          >
            CONTINUE WITH GOOGLE
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SignUpForm;
