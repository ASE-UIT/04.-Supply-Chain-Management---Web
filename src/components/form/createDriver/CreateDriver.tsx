import { useState } from "react";
import "./CreateDriver.scss";
import { useDispatch } from "react-redux";
import { createDriver } from "@/redux/reducers/driverReducers";

export const CreateDriver = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [license, setLicense] = useState<string>("");

  const handleCreateDriver = () => {
    if (!name || !phone || !license || !email) {
      alert("Missing required fields");
      return;
    }

    if (license.length !== 12) {
      alert("License Number must be 12 digits");
      return;
    }
    dispatch(
      createDriver({
        data: { name: name, phoneNumber: phone, licenseNumber: license }
      })
    );
    onclose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="title-add">Add New Driver</h3>
        <div className="add-info-box" style={{ height: 368 }}>
          <div className="add-name">
            <p className="title-add-name">Name</p>
            <input
              className="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="add-license-number">
            <p className="title-license-number">License Number</p>
            <input
              className="input-license-number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Email</p>
            <input
              className="input-location"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Phone</p>
            <input
              className="input-location"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {/* 
        <div className="type-partner-box">
          <div>
            <p className="type-title">Type</p>
            <div className="select-box">
              <div
                className={`type-option ${
                  activeType === "PARTNER_SUPPLIER" ? "active" : ""
                }`}
                onClick={() => handleClick("PARTNER_SUPPLIER")}
              >
                Supplier
              </div>
              <div
                className={`type-option ${
                  activeType === "PARTNER_WAREHOUSE" ? "active" : ""
                }`}
                onClick={() => handleClick("PARTNER_WAREHOUSE")}
              >
                Warehouse
              </div>
              <div
                className={`type-option ${
                  activeType === "PARTNER_DELIVER" ? "active" : ""
                }`}
                onClick={() => handleClick("PARTNER_DELIVER")}
              >
                Transport Provider
              </div>
            </div>
          </div>
        </div> */}

        <div className="option">
          <div></div>
          <div className="option-main">
            <button className="button-cancel" onClick={onclose}>
              Cancel
            </button>
            <button className="button-create" onClick={handleCreateDriver}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
