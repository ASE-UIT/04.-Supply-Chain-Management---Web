import React, { useState } from "react";
import "./AddProductDialog.scss";
import { useDispatch } from "react-redux";
import { createProduct } from "@/redux/reducers/productReducers";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("NORMAL");
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const handleCreate = () => {
    dispatch(createProduct({
      data: {
        name,
        type,
        size,
        weight,
        quantity,
        unit,
        status: "NORMAL",
      }
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2>Add New Product</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="dialog-form">
          <div className="input-group">
            <label>
              Name <span className="required">*</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Unit <span className="required">*</span>
              <input
                type="text"
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
                  type="number"
                  value={size.toString()}
                  onChange={(e) => setSize(parseFloat(e.target.value))}
                />
              </label>
              <label>
                Weight (g)
                <input
                  type="number"
                  value={weight.toString()}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  step="0.01"
                />
              </label>
            </div>
          </div>

          <div className="dialog-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="button" onClick={handleCreate}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDialog;
