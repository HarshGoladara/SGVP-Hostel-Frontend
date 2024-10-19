import { ToastContainer } from "react-toastify";
import ImageComponent  from "../../components/authentication/ImageComponent";
import ActivationAccountComponenet from "../../components/authentication/ActivationAccountComponenet";

function ActivateAccountPage() {
  return (
    <>
      <ToastContainer />
      <div className="flex gap-4 min-h-[100dvh]">
        <ImageComponent imagePath="/images/activate-account.jpg" />
        <div className="max-h-[500px] overflow-auto m-auto p-2">
          <ActivationAccountComponenet />
        </div>
      </div>
    </>
  );
}

export default ActivateAccountPage;
