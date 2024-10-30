import React, { useState } from "react";
import "./ActionButton.scss";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

interface ActionButtonProps {
  onNewClick: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onNewClick,
  onImportClick,
  onExportClick,
}) => {
  const [clickNew, setClickNew] = useState(false);
  const [clickImport, setClickImport] = useState(false);
  const [clickExport, setClickExport] = useState(false);

  return (
    <div className="my-action-button">
      <div
        className={`new-button-div ${clickNew ? "active" : "inactive"}`}
        onClick={onNewClick}
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

      <div className="imp-exp-button-div">
        <div
          className={`button-div ${clickImport ? "active" : "inactive"}`}
          onClick={onImportClick}
        >
          <Button
            variant="primary"
            size="medium"
            rounded="none"
            backgroundColor="transparent"
            textColor="#3461ff"
            padding="10px 16px"
            type="button"
            disabled={false}
          >
            <Icon
              icon="tabler:download"
              width={20}
              height={20}
              className="icon-custom-other"
            />
            Import
          </Button>
        </div>

        <div
          className={`button-div ${clickExport ? "active" : "inactive"}`}
          onClick={onExportClick}
        >
          <Button
            variant="primary"
            size="medium"
            rounded="none"
            backgroundColor="transparent"
            textColor="#3461ff"
            padding="10px 16px"
            type="button"
            disabled={false}
          >
            <Icon
              icon="humbleicons:share"
              width={20}
              height={20}
              className="icon-custom-other"
            />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionButton;
