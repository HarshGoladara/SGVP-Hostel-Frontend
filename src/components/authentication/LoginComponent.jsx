import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "../../validation/authentication/loginFormData";
// import { loginRegistrationForm } from "../../helper/authentication/login";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginFormValidation),
    mode: "all",
  });

  const handleOnSubmit = async (data) => {
    console.log("Login Form Submit");
    console.log(data);
    //----send request for login
    // const result = await loginRegistrationForm("/api/login", data);
    // if (typeof result === "boolean" && result) {
    //   navigate("/");
    //   // setTimeout(() => {}, 6000);
    // } else if (typeof result !== "boolean") {
    //   for (const key in result) {
    //     switch (key) {
    //       case "email":
    //         setError("email", {
    //           message: result.email,
    //         });
    //         break;
    //       case "password":
    //         setError("password", {
    //           message: result.password,
    //         });
    //         break;
    //     }
    //   }
    // }
  };
  console.log("=======Login Form Error===========");
  console.log(errors);
  const formError = (errors) || {};

  return (
    <>
      <Box
        component="form"
        sx={{
          margin: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "50%",
          minHeight: "400px",
          // backgroundColor: "gray",
        }}
        onSubmit={handleSubmit(handleOnSubmit)}
        noValidate
        autoComplete="off"
      >
        <Typography
          sx={{ fontSize: "30px", textAlign: "center", fontWeight: "400" }}
        >
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          {...register("email")}
          error={formError && formError["email"] ? true : false}
          // {formError && formError["email"] ? error: ""}
          helperText={`${formError && formError["email"] ? formError["email"].message?.toString() : ""}`}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          {...register("password")}
          error={formError && formError["password"] ? true : false}
          helperText={`${formError && formError["password"] ? formError["password"].message?.toString() : ""}`}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password Visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box component="button" sx={{ display: "flex", gap: "10px" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button type="reset" variant="contained" onClick={() => reset()}>
            Reset
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Typography>Do not have an account</Typography>
            <Link href="/register" underline="none">
              Register
            </Link>
          </Box>
          <Box>
            <Link href="/forgotpassword" underline="none">
              Forgotpassword
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginComponent;
