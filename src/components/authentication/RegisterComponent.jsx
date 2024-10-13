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
import { registerFormValidation } from "../../validation/authentication/registerFromData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

function RegisterComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(registerFormValidation),
    mode: "all",
  });

  const handleOnSubmit = async (data) => {
    console.log("Register Form Submit");
    console.log(data);
    //----send request for login
    // const result =
    //   await loginRegistrationForm("/api/register", data);
    // if (typeof result === "boolean" && result) {
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 6000);
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
    //       case "confirm_password":
    //         setError("confirm_password", {
    //           message: result.confirm_password,
    //         });
    //         break;
    //     }
    //   }
    // }
  };

  console.log("=======Register Form Error===========");
  console.log(errors);
  const formError = errors || {};

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
          minHeight: "400px",
          width: "50%",
          // backgroundColor: "gray",
        }}
        onSubmit={handleSubmit(handleOnSubmit)}
        noValidate
        autoComplete="off"
      >
        <Typography
          sx={{ fontSize: "30px", textAlign: "center", fontWeight: "400" }}
        >
          Register
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
        <TextField
          type={showConfirmPassword ? "text" : "password"}
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          {...register("confirm_password")}
          error={formError && formError["confirm_password"] ? true : false}
          helperText={`${formError && formError["confirm_password"] ? formError["confirm_password"].message?.toString() : ""}`}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password Visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOff />}
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
            <Typography>Already have an account</Typography>
            <Link href="/login" underline="none">
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RegisterComponent;
