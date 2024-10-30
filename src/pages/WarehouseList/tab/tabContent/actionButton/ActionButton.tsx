import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "./ActionButton.scss";

const ActionButton = () => {
  const [clickNew, setClickNew] = useState(false);
  const handleClickNewButton = () => {
    setClickNew(!clickNew);
    console.log("New button is clicked");
  };


  return (
    <div className="my-action-button">
      <div
        className={`new-button-div ${clickNew ? "active" : "inactive"}`}
        onClick={handleClickNewButton}
      >
        <Button
          variant="primary"
          size="medium"
          rounded="none"
          backgroundColor="transparent"
          textColor="white"
          padding="10px 16px"
          type="button"
          disabled={false}
        >
          <Icon
            icon="ic:round-plus"
            width={20}
            height={20}
            style={{ color: "white" }}
            className="icon-custom"
          />
          New
        </Button>
      </div>
    </div>
  );
};

export default ActionButton;
