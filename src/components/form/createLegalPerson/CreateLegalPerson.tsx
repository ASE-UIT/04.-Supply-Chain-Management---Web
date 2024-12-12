import { useState } from "react";
import "./CreateLegalPerson.scss";
import { useDispatch } from "react-redux";
import { createLegalPerson } from "@/redux/reducers/legalpersonReducers";

export const CreateLegalPerson = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [identity, setIdentity] = useState<string>("");


  const handleCreateLegalPerson = () => {
    dispatch(createLegalPerson({ data: { name, email, phoneNumber: phone, adress, identityNumber: identity } }));
    onclose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="title-add">Add Legal Person</h3>
        <div className="add-info-box" style={{ height: 438 }}>
          <div className="add-name">
            <p className="title-add-name">Name</p>
            <input
              className="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="add-location">
            <p className="title-add-location">Adress</p>
            <input
              className="input-location"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>
          <div className="add-location">
            <p className="title-add-location">Identity Number</p>
            <input
              className="input-location"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
          </div>
        </div>


        <div className="option">
          <div></div>
          <div className="option-main">
            <button className="button-cancel" onClick={onclose}>
              Cancel
            </button>
            <button className="button-create" onClick={handleCreateLegalPerson}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
