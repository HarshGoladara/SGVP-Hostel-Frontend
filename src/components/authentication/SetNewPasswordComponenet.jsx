import  {useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import { setNewPasswordFormValidation } from "../../validation/authentication/setNewPassword";

function SetNewPasswordComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activationCode = searchParams.get("activationCode");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(setNewPasswordFormValidation),
    mode: "all",
  });

  const handleOnSubmit = async (data) => {
    console.log("Set new password Form Submit");
    console.log(data);
    //----send request for login
    // const result=
    //   await setNewPasswordForm(
    //     `/api/setNewPassword?activationCode=${activationCode}`,
    //     data,
    //   );
    // if (typeof result === "boolean" && result) {
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 6000);
    // } else if (typeof result !== "boolean") {
    //   for (const key in result) {
    //     switch (key) {
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

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);

  console.log("=======Setnew Password Form Error===========");
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
          Set New Password
        </Typography>
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
      </Box>
    </>
  );
}

export default SetNewPasswordComponent;
