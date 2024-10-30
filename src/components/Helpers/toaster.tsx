import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiWarningFill } from "react-icons/pi";

export const CustomIcon = () => (
  <div>
    <PiWarningFill size={24} color="black" />
  </div>
);
function Toaster() {
  return (
    <div>
      <ToastContainer style={{ color: "black" }} />
    </div>
  );
}
export const notify = (heading:string,detail:string) =>
  toast.warn(
    <div style={{ paddingLeft: "10px" }}>
      <p style={{ color: "black" }}>
        <b>{heading}</b>
      </p>
      <p>{detail}</p>
    </div>,
    {
      style: {
        border: "2px solid blue",
        boxShadow: "0px 0px 10px rgba(0,0,255,0.5)",
      },
      icon: <CustomIcon />,
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
export default Toaster;
