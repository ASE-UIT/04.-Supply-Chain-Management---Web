import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import React from "react";
import { DataProduct } from "./DataTable";

interface DeleteButtonProps {
  setData: React.Dispatch<React.SetStateAction<DataProduct[]>>;
  data: DataProduct[];
  idItemDelete: string;
}

const ButtonActionDelete: React.FC<DeleteButtonProps> = ({
  setData,
  data,
  idItemDelete,
}) => {
  const handleDelete = () => {
    setData(data.filter((item) => item.id !== idItemDelete));
  };

  return (
    <div
      style={{ display: "flex", zIndex: 10, cursor: "pointer" }}
      onClick={handleDelete}
    >
      <Button
        variant="primary"
        size="medium"
        rounded="none"
        backgroundColor="transparent"
        padding="0"
        type="button"
        disabled={false}
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
