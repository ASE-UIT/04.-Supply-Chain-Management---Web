
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

export const CreateDriver = ({ onclose, onsubmit, visible }: any) => {
  const [form] = Form.useForm();
  const [vehicles, setVehicles] = useState<any>([]);

  const fetchVehicles = async () => {
    const vec = await MainApiRequest.get("/vehicles/list");
    setVehicles(vec.data);
  };

  useEffect(() => {
    if (!vehicles.length) {
      fetchVehicles();
    }
  }, []);

  const handleCreateDriver = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        name: values.name,
        licenseNumber: values.license,
        licenseType: values.licenseType,
        vehicleId: values.vehicle,
        phoneNumber: values.phone
      };
      const res = await MainApiRequest.post("/drivers", data);
      if (res.status === 200) {
        onsubmit();
      } else {
        alert("Failed to create driver");
      }
    } catch (error) {
      console.log("Validation error:", error);
    }
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onclose}
        title="Add New Driver"
        className="modal-overlay"
        onOk={handleCreateDriver}
      >
        <Form form={form}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="license" label="License Number">
            <Input />
          </Form.Item>
          <Form.Item name="licenseType" label="License Type">
            <Select>
              <Select.Option key={"B2"} value={"B2"}>
                B2
              </Select.Option>
              <Select.Option key={"C"} value={"C"}>
                C
              </Select.Option>
              <Select.Option key={"D"} value={"D"}>
                D
              </Select.Option>
              <Select.Option key={"E"} value={"E"}>
                E
              </Select.Option>
              <Select.Option key={"FC"} value={"FC"}>
                FC
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="vehicle" label="Vehicle">
            <Select>
              {vehicles.map((vec: any) => (
                <Select.Option key={vec.id} value={vec.id}>
                  {vec.licensePlate}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
