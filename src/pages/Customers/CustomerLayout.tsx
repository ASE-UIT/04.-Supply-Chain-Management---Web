"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { useEffect, useState } from "react";

export interface DataCustomer {
  id: number;
  name: string;
  presenter: string;
  phoneNumber: string;
  email: string;
  address: string;
  presenterPhoneNumber: string;
  presenterEmail: string;
  presenterAddress: string;
  taxCode: string;
  type: string;
}

const Customer = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataCustomer[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = async (id: number) => {
    await MainApiRequest.delete(`/customers/${id}`);
    fetchData();
  };

  const fetchData = async () => {
    const res = await MainApiRequest.get("/customers/list");
    setData(res.data);
  }

  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, []);

  const onFinish = async () => {
    const values = form.getFieldsValue();
    await MainApiRequest.post("/customers", values);
    fetchData();
    setClickNew(false);
  };

  return (
    <>
      <div className="m-4">
        <h3>Customers</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Customer
        </Button>
        <Modal
          title="Create Customer"
          open={clickNew}
          onCancel={handleClickNewButton}
          onOk={onFinish}
        >
          <Form form={form}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Please enter the phone number' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter the email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter the address' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Presenter"
              name="presenter"
              rules={[{ required: true, message: 'Please enter the presenter' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Presenter Phone Number"
              name="presenterPhoneNumber"
              rules={[{ required: true, message: 'Please enter the presenter phone number' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Presenter Email"
              name="presenterEmail"
              rules={[{ required: true, message: 'Please enter the presenter email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Presenter Address"
              name="presenterAddress"
              rules={[{ required: true, message: 'Please enter the presenter address' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tax Code"
              name="taxCode"
              rules={[{ required: true, message: 'Please enter the tax code' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please enter the type' }]}
            >
              <Select>
                <Select.Option value="URN_FUTURE" key="URN_FUTURE">URN Future</Select.Option>
                <Select.Option value="CURRENT" key="CURRENT">Current</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          dataSource={data}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Phone Number',
              dataIndex: 'phoneNumber',
              key: 'phoneNumber',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Tax Code',
              dataIndex: 'taxCode',
              key: 'taxCode',
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: 'Presenter',
              key: 'presenterInfo',
              render: (text, record) => (
                <div>
                  <p><strong>Name: </strong>{record.presenter}</p>
                  <p><strong>Phone: </strong>{record.presenterPhoneNumber}</p>
                  <p><strong>Email: </strong>{record.presenterEmail}</p>
                  <p><strong>Address: </strong>{record.presenterAddress}</p>
                </div>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (text, record) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => handleDelete(record.id)}>
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

export default Customer;
