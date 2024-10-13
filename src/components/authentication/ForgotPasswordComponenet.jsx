import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotpasswordFormValidation } from "../../validation/authentication/forgotPasswordFormData";
import { useNavigate } from "react-router-dom";

function ForgotPasswordComponenet() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotpasswordFormValidation),
    mode: "all",
  });

  const handleOnSubmit = async (data) => {
    console.log("=======Forgot password data=========");
    console.log(data);
    // const result =
    //   await loginRegistrationForm("/api/forgotpassword", data);

    // if (typeof result !== "boolean") {
    //   for (const key in result) {
    //     switch (key) {
    //       case "email":
    //         setError("email", {
    //           message: result.email,
    //         });
    //         break;
    //     }
    //   }
    // }
  };

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
          Forgot Password
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
            <Typography>Already an account</Typography>
            <Link href="/login" underline="none">
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ForgotPasswordComponenet;
