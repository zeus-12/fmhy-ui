import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { showNotification } from "@mantine/notifications";

export const errorNotificationProps = {
  icon: <AiOutlineCloseCircle size={18} />,
  color: "red",
};

export const notSignedInNotification = (message) => {
  showNotification({
    title: "Please Sign In",
    message,
    ...errorNotificationProps,
  });
};

export const errorNotification = (message) => {
  showNotification({
    title: "Error",
    message,
    ...errorNotificationProps,
  });
};

export const successNotification = (message) => {
  showNotification({
    title: "Success",
    message,
    color: "green",
    icon: <BsCheckCircleFill size={18} />,
  });
};
