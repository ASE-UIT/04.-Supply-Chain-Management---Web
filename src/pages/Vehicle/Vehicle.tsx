import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

export interface DataVehicle {
  id: number;
  licensePlate: string;
  type: string;
  status: string;
  capacity: number;
  availability: true;
}

const Vehicle = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataVehicle[]>([]);
  const [clickNew, setClickNew] = useState(false);
  const [partners, setPartners] = useState<any>([]);

  const fetchPartners = async () => {
    const par = await MainApiRequest.get("/partners/list?type=PARTNER_DELIVER");
    setPartners(par.data);
  };

  const fetchVehicles = async () => {
    const res = await MainApiRequest.get("/vehicles/list");
    setData(res.data);
  };

  useEffect(() => {
    if (!partners.length) {
      fetchPartners();
    }

    if (!data.length) {
      fetchVehicles();
    }
  }, []);

  const handleDelete = async (id: number) => {
    // dispatch(removePartner({ id }));
    await MainApiRequest.delete(`/vehicles/${id}`);
    await fetchVehicles();
  };

  const handleCreateVehicle = async (values: any) => {
    const data = {
      licensePlate: values.plate,
      type: values.cType,
      capacity: parseInt(values.capacity),
      partnerId: parseInt(values.partner),
      status: "ACTIVE",
      availability: true,
    };

    const res = await MainApiRequest.post("/vehicles", data);
    if (res.status === 200) {
      const res2 = await MainApiRequest.get("/vehicles/list")
      setData(res2.data);
      setClickNew(false);
    }
  };

  return (
    <>
      <div className="m-4">
        <h3>Vehicle</h3>
        <Button
          className="my-2"
          onClick={() => setClickNew(true)}
        >
          New Vehicle
        </Button>
        <Modal
          open={clickNew}
          onCancel={() => setClickNew(false)}
          title="Create Vehicle"
          className="modal-overlay"
          onOk={() => handleCreateVehicle(form.getFieldsValue())}
        >
          <Form form={form}>
            <Form.Item label="Partner" name="partner">
              <Select>
                {partners.map((partner: any, index: number) => (
                  <Select.Option key={partner.id} value={partner.id}>
                    {partner.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Type" name="cType">
              <Select>
                <Select.Option value="COLD">COLD</Select.Option>
                <Select.Option value="NORMAL">NORMAL</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Capacity" name="capacity">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Plate Number" name="plate">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Table
          dataSource={data}
          columns={[
            {
              title: "Plate Number",
              dataIndex: "licensePlate",
              key: "licensePlate",
            },
            {
              title: "Owner",
              dataIndex: "partner",
              render: (partner) => (
                <span>{partner.name}</span>
              ),
            },
            {
              title: "Capacity",
              dataIndex: "capacity",
              key: "capacity",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Actions",
              key: "actions",
              render: (text: any, record: any) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(record.id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Vehicle;
