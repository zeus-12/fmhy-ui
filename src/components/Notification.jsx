import { Notification } from "@mantine/core";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export const SuccessNotification = ({ success }) => {
  return (
    <Notification
      className="fixed right-4 bottom-[2vh]"
      disallowClose
      icon={<IoCheckmarkDoneCircleSharp size={18} />}
      color="teal"
    >
      {success}
    </Notification>
  );
};

export const ErrorNotification = ({ error }) => {
  return (
    <Notification
      className="fixed right-4 bottom-[2vh]"
      disallowClose
      icon={<MdCancel size={18} />}
      color="red"
    >
      {error}
    </Notification>
  );
};

// me="flex justify-center fixed bottom-[2vh]">
// 				{response && (
// 					<div
// 						style={{
// 							position: "fixed",
// 							bottom: "2vh",
// 							display: "flex",
// 							flex: 1,
// 							minWidth: "10rem",
// 							width: "20vw",
// 							padding: "0.25rem 0.5rem ",
// 							borderRadius: "5px",
// 							justifyContent: "center",
// }}
