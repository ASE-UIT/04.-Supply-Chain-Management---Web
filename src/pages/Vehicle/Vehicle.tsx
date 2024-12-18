"use client";
import { CreatePartner } from "@/components/form/createPartner/CreatePartner";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { removePartner } from "@/redux/reducers/partnerReducers";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
export interface DataVehicle {
  id: number;
  licensePlate: string;
  type: string;
  status: string;
  capacity: number;
  availability: true;
}

const Vehicle = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataVehicle[]>([]);
  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removePartner({ id }));
  };


  const [cType, setCType] = useState("COLD");
  const [partner, setPartner] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plate, setPlate] = useState("");
  const [partners, setPartners] = useState<any>([]);

  const fetchPartners = async () => {
    const par = await MainApiRequest.get("/partners/list");
    setPartners(par.data);
  }

  useEffect(() => {
    if (!partners.length) {
      fetchPartners();
    }

    if (!data.length) {
      MainApiRequest.get("/vehicles/list").then((res) => {
        setData(res.data);
      });
    }
  }, []);

  const handleCreateVehicle = () => {
    let pn = partner;
    if (!partner) {
      pn = partners[0].id;
    }

    const data = {
      licensePlate: plate,
      type: cType,
      capacity: parseInt(capacity),
      partnerId: parseInt(pn),
      status: "ACTIVE",
      availability: true,
    };

    MainApiRequest.post("/vehicles", data).then((res) => {
      if (res.status === 200) {
        MainApiRequest.get("/vehicles/list").then((res) => {
          setData(res.data);
        });
        setClickNew(false);
      }
    });
  };

  return (
    <TableLayout title="Vehicle List" onClickNew={handleClickNewButton}>
      <>
        <Modal onBackdropClick={() => setClickNew(false)} show={clickNew} title="Create Vehicle" onClose={() => setClickNew(false)}>
          <Modal.Header>
            <h3 className="title-add">Add New Vehicle</h3>

          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Partner:</label>
              <select
                className="form-control"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
              >
                {partners.map((partner: any, index: number) => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select
                className="form-control"
                value={cType}
                onChange={(e) => setCType(e.target.value)}
              >
                <option value="COLD">COLD</option>
                <option value="NORMAL">NORMAL</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input
                type="number"
                className="form-control"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Plate Number:</label>
              <input
                type="text"
                className="form-control"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleCreateVehicle}>Create</button>
          </Modal.Body>
        </Modal>
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
              <th>Plate Num</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          )}
          rowRender={(item: DataVehicle) => (
            <tr>
              <td>{item.licensePlate}</td>
              <td>{item.capacity}</td>
              <td>{item.type}</td>
              <td>
                <div className="d-flex flex-md-row flex-column action-button">
                  <ButtonActionEdit onClickEdit={() => { }} />
                  <ButtonActionDelete
                    onClickDelete={() => {
                      handleDelete(item.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          )}
        />
      </>
    </TableLayout>
  );
}

export default Vehicle;
