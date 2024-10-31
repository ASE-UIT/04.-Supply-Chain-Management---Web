import React from "react";
import ActionButton from "../actionButton/ActionButton";
import DataTable from "../table/DataTable";
import "./TabContent.scss";

const TabContent = ({ type }: { type: string }) => {
  return (
    <div className="tab-content-div">
      <ActionButton />
      <DataTable type={type} />
    </div>
  );
};

export default TabContent;
