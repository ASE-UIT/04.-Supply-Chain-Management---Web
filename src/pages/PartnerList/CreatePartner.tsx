import { useState } from "react";
import { Modal, Input, Button, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import { createPartner } from "@/redux/reducers/partnerReducers";

export const CreatePartner = ({ onclose }: any) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState<string | null>("PARTNER_SUPPLIER");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleCreatePartner = () => {
    dispatch(createPartner({ data: { name, email, phoneNumber: phone, type: activeType } }));
    onclose();
  };

  return (
    <Modal
      visible={true}
      title="Add New Partner"
      onCancel={onclose}
      footer={[
        <Button key="cancel" onClick={onclose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreatePartner}>
          Create
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Phone">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>
        <Form.Item label="Type">
          <Select value={activeType} onChange={setActiveType}>
            <Select.Option value="PARTNER_SUPPLIER">Supplier</Select.Option>
            <Select.Option value="PARTNER_WAREHOUSE">Warehouse</Select.Option>
            <Select.Option value="PARTNER_DELIVER">Transport Provider</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
