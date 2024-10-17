import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import React from "react";

interface EditButtonProps {
  setEditPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonActionEdit: React.FC<EditButtonProps> = ({ setEditPage }) => {
  const handleOpenEditPage = () => {
    setEditPage(true);
    console.log("Edit page is opened");
  };

  return (
    <div
      style={{ display: "flex", zIndex: 10, cursor: "pointer" }}
      onClick={handleOpenEditPage}
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
