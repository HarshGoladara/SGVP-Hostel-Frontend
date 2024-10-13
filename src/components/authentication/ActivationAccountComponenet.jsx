import { useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ActivationAccountComponenet() {
  const [resendStatus, setResendStatus] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activationCode = searchParams.get("activationCode");

  useEffect(() => {
    console.log("=====use effect call=========");
    const activate = async (activationCode) => {
      if (activationCode) {
        // const result= await accountActivate(
        //   `/api/accountActivation?activationCode=${activationCode}`,
        // );
        // if (result) {
        //   // setResendStatus(false);
        // } else {
        //   setResendStatus(true);
        // }
      } else {
        //----resend activation link
        toast.error("Please try again", {
          position: "top-right",
        });
      }
    };
    activate(activationCode);
  }, []);

  const handleResendMail = async (activationCode) => {
    if (activationCode) {
      // const result: boolean | undefined = await accountActivate(
      //   `/api/sendNewLink?activationCode=${activationCode}$linkType="activateAccount"`,
      // );
      // if (result) {
      //   // setResendStatus(false);
      // } else {
      //   setResendStatus(true);
      // }
    } else {
      toast.error("Please try again", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {!resendStatus ? (
          <>
            <Typography>Thank For Activate Account</Typography>
            <Link href="/login" underline="none">
              Login
            </Link>
          </>
        ) : (
          <>
            <Typography>Resend Mail</Typography>
            <Typography>Your Link Is Expired....</Typography>
            <Button onClick={() => handleResendMail(activationCode)}>
              Resend Mail
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

export default ActivationAccountComponenet;
