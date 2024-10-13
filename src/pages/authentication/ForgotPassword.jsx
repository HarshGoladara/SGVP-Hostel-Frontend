import ImageComponent from "../../components/authentication/ImageComponent";
import { ToastContainer } from "react-toastify";
import ForgotPasswordComponenet  from "../../components/authentication/ForgotPasswordComponenet";

function ForgotPasswordPage() {
  return (
    <>
      <ToastContainer />
      <div className="flex gap-4 min-h-[100dvh]">
        <ImageComponent imagePath="/images/forgot-password.jpg" />
        <div className="w-[50%] max-h-[500px] overflow-auto m-auto p-2">
          <ForgotPasswordComponenet />
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
