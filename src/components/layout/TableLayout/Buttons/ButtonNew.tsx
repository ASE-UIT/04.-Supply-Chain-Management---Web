import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import "./ButtonNew.scss";

const ActionButton = ({ onClickNew }: {
  onClickNew?: () => void;
}) => {
  return (
    <div className="my-action-button">
      <div
        className={`new-button-div active`}
        onClick={onClickNew}
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
