import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { DataProduct } from "../tabContent/table/DataTable";
import "./TabEditProduct.scss";
import { useDispatch } from "react-redux";
import { updateProduct } from "@/redux/reducers/productReducers";

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
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  // const [isOpen, setIsOpen] = useState(true);

  const [name, setName] = useState("");
  const [type, setType] = useState("NORMAL");
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (dataProduct) {
      setName(dataProduct.name);
      setType(dataProduct.type);
      setSize(dataProduct.size);
      setWeight(dataProduct.weight);
      setQuantity(dataProduct.quantity);
      setUnit(dataProduct.unit);
    }
  }, [dataProduct]);

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  const onSave = () => {
    dispatch(updateProduct({
      id: dataProduct?.id ?? 0,
      data: {
        name,
        type,
        size,
        weight,
        quantity,
        unit,
        status: "NORMAL",
      }
    }))
    setIsEdit(false);
  };

  return isOpen ? (
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
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Unit <span className="required">*</span>
              <input
                type="text"
                readOnly={!isEdit}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Quantity
              <input
                type="number"
                readOnly={!isEdit}
                value={quantity.toString()}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </label>
            <label>
              Type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="NORMAL">Normal</option>
                <option value="COLD">Cold</option>
              </select>
            </label>
            <div className="dimensions">
              <label>
                Size (cm3)
                <input
                  type="text"
                  readOnly={!isEdit}
                  value={size.toString()}
                  onChange={(e) => setSize(parseFloat(e.target.value))}
                />
              </label>
              <label>
                Weight (g)
                <input
                  type="number"
                  readOnly={!isEdit}
                  value={weight.toString()}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  step="0.01"
                />
              </label>
            </div>
          </div>

          {isEdit && (
            <div className="dialog-actions">
              <button type="button" onClick={() => {
                setIsEdit(false)
                // onClose()
              }}>
                Cancel
              </button>
              <button type="button" className="button-save" onClick={onSave}>
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  ) : <></>;
};

export default TabEditProduct;
