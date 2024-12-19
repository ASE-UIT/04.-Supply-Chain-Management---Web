"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { createProduct, listProduct } from "@/redux/reducers/productReducers";
import { RootState } from "@/redux/store";
import { Button, Form, Input, InputNumber, Select, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface DataProduct {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: string;
  type: string;
  size: number;
  weight: number;
}

const ProductListLayout = () => {
  const dispatch = useDispatch();
  const productAPI = useSelector((state: RootState) => state.product.data);
  const [partners, setPartners] = useState<any>([]);
  const [data, setData] = useState<DataProduct[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(listProduct())

    if (partners.length === 0) {
      MainApiRequest.get("/partners/list?type=PARTNER_SUPPLIER").then((res) => {
        setPartners(res.data);
      });
    }
  }, []);

  useEffect(() => {
    setData(productAPI);
  }, [productAPI]);

  const onClickEdit = (item: DataProduct) => {
    // dispatch({ type: "SET_PRODUCT", payload: item });
  };

  const handleDelete = async (id: number) => {
    await MainApiRequest.delete(`/products/${id}`);
    dispatch(listProduct())
  };

  const handleCreate = () => {
    dispatch(createProduct({
      data: {
        status: "NORMAL",
        ...form.getFieldsValue(),
      }
    }));
    setIsShowModal(false);
  };

  const renderCreateForm = () => {
    return (
      <Modal
        open={isShowModal}
        onCancel={() => setIsShowModal(false)}
        onOk={handleCreate}
        title="Add New Product"
        className="modal-overlay"
      >
        <Form
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please enter the type' }]}
          >
            <Select>
              <Select.Option value="NORMAL">Normal</Select.Option>
              <Select.Option value="COLD">Cold</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Owner"
            name="ownerId"
            rules={[{ required: true, message: 'Please select the partner' }]}
          >
            <Select>
              {partners.map((partner: any) => (
                <Select.Option key={partner.id} value={partner.id}>
                  {partner.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please enter the size' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: 'Please enter the weight' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Unit Price"
            name="unitPrice"
            rules={[{ required: true, message: 'Please enter the unit price' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Unit"
            name="unit"
            rules={[{ required: true, message: 'Please enter the unit' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <>
      <div className="m-4">
        <h3>Products</h3>
        <Button
          className="my-2"
          onClick={() => setIsShowModal(true)}
        >
          New Product
        </Button>
        {renderCreateForm()}
        <Table
          dataSource={data}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Unit",
              dataIndex: "unit",
              key: "unit",
            },
            {
              title: "Size",
              dataIndex: "size",
              key: "size",
            },
            {
              title: "Weight",
              dataIndex: "weight",
              key: "weight",
            },
            {
              title: "Manufacturer",
              dataIndex: "partner",
              key: "partner",
              render: (partner: any) => partner.name,
            },
            {
              title: "Unit Price",
              dataIndex: "unitPrice",
              key: "unitPrice",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Action",
              key: "action",
              render: (text: any, item: any) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button
                    onClick={() => {
                      onClickEdit(item);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
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
export default ProductListLayout;
