import React from "react";
import ActionButton from "../actionButton/ActionButton";
import DataTable from "../table/DataTable";
import "./TabContent.scss";

const TabContent = () => {
  return (
    <div className="tab-content-div">
      <ActionButton />
      <DataTable />
    </div>
  );
};

export default TabContent;
