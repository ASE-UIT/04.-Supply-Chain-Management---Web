import { useState } from "react";
import "./CreateWarehouse.scss";
import { useDispatch } from "react-redux";
import { createWarehouse } from "@/redux/reducers/warehouseReducers";

export const CreateWarehouse = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [activeType, setActiveType] = useState<string | null>("NORMAL");
  const [capacity, setCapacity] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(true);

  const handleClick = (type: string) => {
    setActiveType(type);
  };

  const handleCreateWarehouse = () => {
    dispatch(createWarehouse({
      data: {
        name,
        ownerId: 1,
        address,
        type: activeType,
        status: 'NORMAL',
        capacity,
        availability,
      }
    }));
    onclose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="title-add">Add New Partner</h3>
        <div className="add-info-box">
          <div className="add-name">
            <p className="title-add-name">Name</p>
            <input
              className="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Address</p>
            <input
              className="input-location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Capacity</p>
            <input
              className="input-location"
              value={capacity.toString()}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Availability</p>
            <input
              className="input-location"
              type="checkbox"
              defaultChecked={availability}
              onChange={() => setAvailability((state) => !state)}
            />
          </div>

          <div className="type-partner-box">
            <div>
              <p className="type-title">Type</p>
              <div className="select-box">
                <div
                  className={`type-option ${activeType === "NORMAL" ? "active" : ""
                    }`}
                  onClick={() => handleClick("NORMAL")}
                >
                  Normal
                </div>
                <div
                  className={`type-option ${activeType === "COLD" ? "active" : ""
                    }`}
                  onClick={() => handleClick("COLD")}
                >
                  Cold
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
              <button className="button-create" onClick={handleCreateWarehouse}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
