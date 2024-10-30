"use client";
import React, { useState } from "react";
import TabButton from "../tabButton/TabButton";
import TabContent from "../tabContent/content/TabContent";
import "./PartnerListLayout.scss";

const PartnerListLayout = () => {
  const [isClick, setClick] = useState("all");

  return (
    <div className="partner-list-layout">
      <p className="title-text">Partner List</p>
      <div className="tab-layout-div">
        <TabButton isClick={isClick} setClick={setClick} />
        {isClick === "all" && <TabContent />}
      </div>
    </div>
  );
};

export default PartnerListLayout;
