import MainApiRequest from "@/redux/apis/MainApiRequest";
import { createWarehouse } from "@/redux/reducers/warehouseReducers";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const CreateWarehouse = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [partners, setPartners] = useState<any>([]);

  const fetchPartners = async () => {
    const par = await MainApiRequest.get("/partners/list");
    setPartners(par.data);
  };

  useEffect(() => {
    if (!partners.length) {
      fetchPartners();
    }
  }, []);

  const handleCreateWarehouse = () => {
    form.validateFields().then((values) => {
      dispatch(
        createWarehouse({
          data: {
            name: values.name,
            ownerId: values.ownerId,
            address: values.address,
            type: values.activeType,
            status: "NORMAL",
            capacity: values.capacity,
            availability: values.availability,
          },
        })
      );
      onclose();
    });
  };

  return (
    <Modal
      visible={true}
      onCancel={onclose}
      onOk={handleCreateWarehouse}
      title="Add New Partner"
      className="modal-overlay"
    >
      <div className="modal-content">
        <Form form={form}>
          <Form.Item label="Owner" name="ownerId">
            <Select>
              {partners.map((partner: any) => (
                <Select.Option key={partner.id} value={partner.id}>
                  {partner.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Capacity" name="capacity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Availability" name="availability" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Type" name="activeType">
            <Select>
              <Select.Option value="NORMAL">Normal</Select.Option>
              <Select.Option value="COLD">Cold</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
