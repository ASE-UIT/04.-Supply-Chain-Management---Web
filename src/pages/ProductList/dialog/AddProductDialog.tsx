import React, { useState } from "react";
import "./AddProductDialog.scss";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [type, setType] = useState("Normal");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");

  const handleCreate = () => {
    // Handle product creation logic here
    console.log({ name, price, supplier, type, size, weight });
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
              Price <span className="required">*</span>
              <input
                type="text"
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
                value={supplier}
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
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </label>
              <label>
                Weight (kg)
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
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
