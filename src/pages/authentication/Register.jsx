import { ToastContainer } from "react-toastify";
import ImageComponent from "../../components/authentication/ImageComponent";
import RegisterComponent from "../../components/authentication/RegisterComponent";

function RegisterPage() {
  return (
    <>
      <ToastContainer />
      <div className="flex gap-4 min-h-[100dvh]">
        <ImageComponent imagePath="/images/register.jpg" />
        <div className="w-[50%] max-h-[500px] overflow-auto m-auto p-2">
          <RegisterComponent />
        </div>
      </div>
    </>
  );
}

export default RegisterPage ;
