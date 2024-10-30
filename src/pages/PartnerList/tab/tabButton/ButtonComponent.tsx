import Button from "@/components/ui/Button";
import React from "react";
import "./TabButton";

export interface ButtonComponentProps {
  label: string;
  value: string;
}

interface buttonComponent {
  buttonTab: ButtonComponentProps;
  setClick: React.Dispatch<React.SetStateAction<string>>;
  isClick: string;
}

const ButtonComponent: React.FC<buttonComponent> = ({
  buttonTab,
  setClick,
  isClick
}) => {
  const { label, value } = buttonTab;
  const handleClick = () => {
    setClick(value);
    console.log("Button clicked!");
  };
  return (
    <div
      className={`button-tab ${isClick === value ? "active" : "inactive"}`}
      onClick={handleClick}
    >
      <Button
        variant="primary"
        size="medium"
        rounded="none"
        backgroundColor="transparent" // Giữ background cho button
        textColor={isClick === value ? "#3461ff" : "#1c1c1c"}
        padding="10px 20px"
        type="button"
        disabled={false}
      >
        {label}
      </Button>
    </div>
  );
};
export default ButtonComponent;
