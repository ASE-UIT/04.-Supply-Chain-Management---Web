import { useEffect, useState } from "react";
import "./CreateDriver.scss";
import { useDispatch } from "react-redux";
import { createDriver } from "@/redux/reducers/driverReducers";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { LicenseType } from "@/pages/DriverList/DriverListLayout";


export const CreateDriver = ({ onclose, onsubmit }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [licenseType, setLicenseType] = useState<LicenseType>(LicenseType.B2);
  const [vehicle, setVehicle] = useState<number>(1);
  const [phone, setPhone] = useState<string>("");
  const [vehicles, setVehicles] = useState<any>([]);

  const fetchVehicles = async () => {
    const vec = await MainApiRequest.get("/vehicles/list");
    setVehicles(vec.data);
  }

  useEffect(() => {
    if (!vehicles.length) {
      fetchVehicles();
    }
  }, []);

  const handleCreateDriver = async () => {
    if (!name || !licenseType || !license || !vehicle) {
      alert("Missing required fields");
      return;
    }

    const data = {
      name,
      licenseNumber: license,
      licenseType,
      vehicleId: vehicle,
      phoneNumber: phone
    };

    const res = await MainApiRequest.post("/drivers", data);

    if (res.status === 200) {
      onsubmit();
    } else {
      alert("Failed to create driver");
    }

    // onclose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="title-add">Add New Driver</h3>
        <div className="add-info-box" style={{ height: 468 }}>
          <div className="add-name">
            <p className="title-add-name">Name</p>
            <input
              className="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="add-license-number">
            <p className="title-license-number">Phone</p>
            <input
              className="input-license-number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <p className="title-add-location">LicenseType</p>
            <select
              className="input-location"
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value as LicenseType)}
            >
              <option key={"B2"} value={"B2"}>
                B2
              </option>
              <option key={"C"} value={"C"}>
                C
              </option>
              <option key={"D"} value={"D"}>
                D
              </option>
              <option key={"E"} value={"E"}>
                E
              </option>
              <option key={"FC"} value={"FC"}>
                FC
              </option>
            </select>
          </div>
          <div className="add-location">
            <p className="title-add-location">Vehicle</p>
            <select
              className="input-location"
              value={vehicle}
              onChange={(e) => setVehicle(parseInt(e.target.value))}
            >
              {vehicles.map((vec: any) => (
                <option key={vec.id} value={vec.id}>
                  {vec.licensePlate}
                </option>
              ))}
            </select>
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
