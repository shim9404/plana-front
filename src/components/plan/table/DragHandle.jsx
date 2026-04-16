import { Button } from "antd";
import { createContext, useContext } from "react";

export const DragHandleContext = createContext({});

export const DragHandle = ({ icon }) => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(DragHandleContext);
  return (
    <Button
      type="text"
      size="small"
      icon={icon}
      style={{ cursor: "move", width:"16px", padding:"0px", margin:"0px", backgroundColor:"none" }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};
