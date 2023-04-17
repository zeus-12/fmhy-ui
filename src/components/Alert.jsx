import { Alert } from "@mantine/core";
import { AiFillAlert } from "react-icons/ai";
import { RiAlarmWarningFill } from "react-icons/ri";

export const NoteAlert = ({ message }) => {
  return (
    <AlertComponent
      title="Note"
      color="cyan"
      message={message}
      icon={<AiFillAlert size="1rem" />}
    />
  );
};

export const AlertComponent = ({ title, color, message, icon }) => {
  return (
    <Alert
      classNames={{
        label: "text-xl",
        title: "m-0",
        wrapper: "flex items-center",
      }}
      className="my-2"
      icon={icon}
      radius="md"
      title={title}
      color={color}
    >
      {message}
    </Alert>
  );
};

export const WarningAlert = ({ message }) => {
  return (
    <AlertComponent
      title="Warning"
      color="red"
      message={message}
      icon={<RiAlarmWarningFill size="1rem" />}
    />
  );
};
