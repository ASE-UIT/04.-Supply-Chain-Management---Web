import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { DataProduct } from "../tabContent/table/DataTable";
import "./TabEditProduct.scss";

interface TabEditProducProps {
  isOpen: boolean;
  onClose: () => void;
  dataProduct: DataProduct | null;
}

const TabEditProduct: React.FC<TabEditProducProps> = ({
  isOpen,
  onClose,
  dataProduct,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  // const [isOpen, setIsOpen] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [type, setType] = useState("Normal");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className={`container ${isOpen ? "open" : ""}`}>
      <div className="container-edit-product">
        <div className="dialog-header">
          <h2>Information</h2>

          <div className="group-action">
            {!isEdit && (
              <button className="button-edit" onClick={handleClickEdit}>
                Edit
                <Icon
                  icon="solar:pen-linear"
                  width={20}
                  height={20}
                  style={{ color: "white" }}
                  className="icon-custom-icon"
                />
              </button>
            )}

            {!isEdit && (
              <div>
                <button className="delete-button">
                  <Icon
                    icon="tabler:trash"
                    width={20}
                    height={20}
                    style={{ color: "red" }}
                    className="trash-icon"
                  />
                </button>
              </div>
            )}
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
        </div>

        <form className="dialog-form">
          <div className="input-group">
            <label>
              Name <span className="required">*</span>
              <input
                type="text"
                readOnly={!isEdit}
                value={dataProduct?.name ?? ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Price <span className="required">*</span>
              <input
                type="text"
                readOnly={!isEdit}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Supplier
              <input
                type="text"
                readOnly={!isEdit}
                value={dataProduct?.nameSupplier ?? ""}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </label>
            <label>
              Type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Normal">Normal</option>
                <option value="Special">Special</option>
              </select>
            </label>
            <div className="dimensions">
              <label>
                Size (cm)
                <input
                  type="text"
                  readOnly={!isEdit}
                  value={dataProduct?.size ?? ""}
                  onChange={(e) => setSize(e.target.value)}
                />
              </label>
              <label>
                Weight (kg)
                <input
                  type="number"
                  readOnly={!isEdit}
                  value={dataProduct?.weight ?? ""}
                  onChange={(e) => setWeight(e.target.value)}
                  step="0.01"
                />
              </label>
            </div>
          </div>

          {isEdit && (
            <div className="dialog-actions">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="button-save">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TabEditProduct;
