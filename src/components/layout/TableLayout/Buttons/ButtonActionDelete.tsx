import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import React from "react";

interface DeleteButtonProps {
  onClickDelete?: () => void;
}

const ButtonActionDelete = ({
  onClickDelete
}: DeleteButtonProps) => {

  const deleteButtonStyle: React.CSSProperties = {
    display: "flex",
    width: "auto",
    height: "auto",
    zIndex: 10,
    cursor: "pointer"
  };

  return (
    <div style={deleteButtonStyle} onClick={onClickDelete}>
      <Button
        variant="primary"
        size="medium"
        rounded="none"
        backgroundColor="transparent"
        padding="0"
        type="button"
        disabled={false}
      // onClick={handleDelete}
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
