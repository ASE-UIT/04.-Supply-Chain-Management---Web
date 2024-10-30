import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import React from "react";
import { DataWarehouse } from "./DataTable";

interface DeleteButtonProps {
  setData: React.Dispatch<React.SetStateAction<DataWarehouse[]>>;
  data: DataWarehouse[];
  idItemDelete: string;
}

const ButtonActionDelete = ({
  setData,
  data,
  idItemDelete
}: DeleteButtonProps) => {
  const handleDelete = () => {
    setData(data.filter((item) => item.id !== idItemDelete));
  };

  const deleteButtonStyle: React.CSSProperties = {
    display: "flex",
    width: "auto",
    height: "auto",
    zIndex: 10,
    cursor: "pointer"
  };

  return (
    <div style={deleteButtonStyle} onClick={handleDelete}>
      <Button
        variant="primary"
        size="medium"
        rounded="none"
        backgroundColor="transparent"
        padding="0"
        type="button"
        disabled={false}
        onClick={handleDelete}
      >
        <Icon
          icon="lucide:trash-2"
          width={24}
          height={24}
          style={{ color: "#1c1c1c" }}
        />
      </Button>
    </div>
  );
};

export default ButtonActionDelete;
