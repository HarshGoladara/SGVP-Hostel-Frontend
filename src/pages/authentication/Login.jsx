import ImageComponent from "../../components/authentication/ImageComponent";
import LoginComponent  from "../../components/authentication/LoginComponent";
import { ToastContainer } from "react-toastify";

function LoginPage() {
  return (
    <>
      <ToastContainer />
      <div className="flex gap-4">
        <ImageComponent imagePath="/images/login.jpg" />
        <div className="w-[50%] max-h-[500px] overflow-auto m-auto p-2">
          <LoginComponent />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
