"use client";
//import TabButton from "../tabButton/TabButton";
import TabContent from "../tabContent/content/TabContent";
import "./WarehouseListLayout.scss";

const WarehouseListLayout = () => {

  return (
    <div className="warehouse-list-layout">
      <p className="title-text">Warehouse List</p>
      <div className="tab-layout-div">
        <TabContent />
      </div>
    </div>
  );
};

export default WarehouseListLayout;
