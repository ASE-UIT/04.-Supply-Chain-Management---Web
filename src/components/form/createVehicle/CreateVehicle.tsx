import { useState } from "react";
import "./CreateVehicle.scss";
import { useDispatch } from "react-redux";
import { createVehicle } from "@/redux/reducers/vehicleReducers";

export const CreateVehicle = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [transportProviderID, setTransportProviderID] = useState<number>(0);
  const [driverID, setDriverID] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [activeType, setActiveType] = useState<string | null>("NORMAL");//normal truck or cold truck
  const [fuelType, setFuelType] = useState<string | null>("DIESEL")
  const [status, setStatus] = useState<string | null>("AVAILABLE")
  //const [availability, setAvailability] = useState<boolean>(true);

  const handleClickType = (type: string) => {
    setActiveType(type);
  };

  const handleClickFuelType = (type: string) => {
    setFuelType(type);
  };

  const handleCreateVehicle = () => {
    dispatch(createVehicle({
      data: {
        licensePlate,
        transportProviderID,
        driverID,
        capacity,
        type: activeType,
        fuelType: fuelType,
        //availability: status,
      }
    }));
    onclose();
  };

  return (
    <div className="modal-overlay">
        <div className="modal-content">
        <h3 className="title-add">Add New Vehicle</h3>
        <div className="add-info-box">
            <div className="add-vehicle-lp">
                <p className="title-add-lp">License Plate</p>
                <input
                className="input-vehicle-lp"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                />
            </div>
            <div className="add-transport-provider">
                <div>
                    <p className="title-add-transport-provider">Transport Provider ID</p>
                    <input
                    className="input-transport-provider"
                    value={transportProviderID}
                    onChange={(e) => setTransportProviderID(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <p className="title-add-transport-provider">Driver ID</p>
                    <input
                    className="input-transport-provider"
                    value={driverID}
                    onChange={(e) => setDriverID(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="add-transport-provider">
                <p className="title-add-transport-provider">Capacity</p>
                <input
                className="input-transport-provider"
                value={capacity.toString()}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                />
            </div>
        </div>
        <div className="type-vehicle-box">
            <div>
                <p className="type-title">Type</p>
                <div className="select-box">
                    <div
                    className={`type-option ${activeType === "NORMAL" ? "active" : ""
                        }`}
                    onClick={() => handleClickType("NORMAL")}
                    >
                    Normal
                    </div>
                    <div
                    className={`type-option ${activeType === "COLD" ? "active" : ""
                        }`}
                    onClick={() => handleClickType("COLD")}
                    >
                    Cold
                    </div>
                </div>
            </div>
        </div>
        <div className="type-vehicle-box">
            <div>
                <p className="type-title">Fuel Type</p>
                <div className="select-box">
                    <div
                    className={`type-option ${fuelType === "DIESEL" ? "active" : ""
                        }`}
                    onClick={() => handleClickFuelType("DIESEL")}
                    >
                    Diesel
                    </div>
                    <div
                    className={`type-option ${fuelType === "GAS" ? "active" : ""
                        }`}
                    onClick={() => handleClickFuelType("GAS")}
                    >
                    Gasoline
                    </div>
                </div>
            </div>
        </div>

        <div className="option">
            <div></div>
            <div className="option-main">
                <button className="button-cancel" onClick={onclose}>
                    Cancel
                </button>
                <button className="button-create" onClick={handleCreateVehicle}>
                    Create
                </button>
            </div>
        </div>
        </div>
    </div>
  );
};
