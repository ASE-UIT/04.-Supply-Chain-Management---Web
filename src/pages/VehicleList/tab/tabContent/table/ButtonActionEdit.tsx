import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import React from "react";

interface EditButtonProps {
  setEditPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonActionEdit = ({ setEditPage }: EditButtonProps) => {
  const handleOpenEditPage = () => {
    setEditPage(true);
    console.log("Edit page is opened");
  };

  const editButtonStyle: React.CSSProperties = {
    display: "flex",
    width: "auto",
    height: "auto",
    zIndex: 10,
    cursor: "pointer"
  };
  return (
    <div style={editButtonStyle} onClick={handleOpenEditPage}>
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
          icon="fluent:edit-12-regular"
          width={24}
          height={24}
          style={{ color: "#1c1c1c" }}
        />
      </Button>
    </div>
  );
};

export default ButtonActionEdit;
