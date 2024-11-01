import React from "react";
import "./TabButton.scss";
import ButtonComponent, { ButtonComponentProps } from "./ButtonComponent";

const tab: ButtonComponentProps[] = [
  { label: "All", value: "all" },
  { label: "Supplier", value: "PARTNER_SUPPLIER" },
  { label: "Warehouse", value: "PARTNER_WAREHOUSE" },
  { label: "Transport Provider", value: "PARTNER_DELIVER" }
];

interface tabButtonProps {
  setClick: React.Dispatch<React.SetStateAction<string>>;
  isClick: string;
}

const TabButton = ({ isClick, setClick }: tabButtonProps) => {
  return (
    <div className="tab-div">
      <div className="tab-div-frame">
        {tab.map((item) => {
          const buttonTab = {
            label: item.label,
            value: item.value
          };
          return (
            <ButtonComponent
              key={item.value}
              buttonTab={buttonTab}
              setClick={setClick}
              isClick={isClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TabButton;
