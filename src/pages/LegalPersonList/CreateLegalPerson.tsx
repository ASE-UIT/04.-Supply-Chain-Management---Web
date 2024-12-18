import { createLegalPerson } from "@/redux/reducers/legalpersonReducers";
import { Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";

export const CreateLegalPerson = ({ onclose, visible }: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCreateLegalPerson = () => {
    form.validateFields().then((values) => {
      dispatch(
        createLegalPerson({
          data: {
            name: values.name,
            email: values.email,
            phoneNumber: values.phone,
            address: values.address,
            identityNumber: values.identity,
          },
        })
      );
      onclose();
    });
  };

  return (
    <Modal
      open={visible}
      title="Add New Legal Person"
      className="modal-overlay"
      onCancel={onclose}
      onOk={handleCreateLegalPerson}
    >
      <Form form={form}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="identity" label="Identity Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
