import { ToastContainer } from "react-toastify";
import ImageComponent from "../../components/authentication/ImageComponent";
import  SetNewPasswordComponent from "../../components/authentication/SetNewPasswordComponenet";

function SetNewPasswordPage() {
  return (
    <>
      <ToastContainer />
      <div className="flex gap-4 min-h-[100dvh]">
        <ImageComponent imagePath="/images/setnew-password.jpg" />
        <div className="w-[50%] max-h-[500px] overflow-auto m-auto p-2">
          <SetNewPasswordComponent />
        </div>
      </div>
    </>
  );
}

export default SetNewPasswordPage;
