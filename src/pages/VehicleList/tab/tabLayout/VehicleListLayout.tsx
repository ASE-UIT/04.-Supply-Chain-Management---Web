"use client";
//import TabButton from "../tabButton/TabButton";
import TabContent from "../tabContent/content/TabContent";
import "./VehicleListLayout.scss";

const VehicleListLayout = () => {

  return (
    <div className="vehicle-list-layout">
      <p className="title-text">Vehicle List</p>
      <div className="tab-layout-div">
        <TabContent />
      </div>
    </div>
  );
};

export default VehicleListLayout;
