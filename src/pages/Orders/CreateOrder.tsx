import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useState, useEffect } from "react";

const SelectProduct = ({ products, visible, onOk, onCancel }: { products: any[], visible: boolean, onOk: (product: any) => void, onCancel: () => void }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            // onOk={() => onOk(selectedProduct)}
            okButtonProps={{ hidden: true }}
            title="Select Product"
            className="modal-overlay"
            width={800}
        >
            <Table
                dataSource={products}
                columns={[
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Manufacturer",
                        dataIndex: "partner",
                        render: (partner: any) => partner.name,
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                    },
                    {
                        title: "Unit",
                        dataIndex: "unit",
                        key: "unit",
                    },
                    {
                        title: "Unit Price",
                        dataIndex: "unitPrice",
                        key: "unitPrice",
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
                        title: "Action",
                        key: "action",
                        render: (text: any, record: any) => (
                            <Button
                                onClick={() => onOk(record)}
                            >
                                Select
                            </Button>
                        ),
                    },
                ]}
            />
        </Modal>
    );
}

const SelectProductInWarehouse = ({ products, visible, onOk, onCancel }: { products: any[], visible: boolean, onOk: (warehouseProductId: any) => void, onCancel: () => void }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            // onOk={() => onOk(selectedProduct)}
            okButtonProps={{ hidden: true }}
            title="Select Product"
            className="modal-overlay"
        >
            <Table
                dataSource={products}
                columns={[
                    {
                        title: "Warehouse Name",
                        dataIndex: "warehouse",
                        render: (warehouse: any) => warehouse.name,
                    },
                    {
                        title: "Remaining Amount",
                        dataIndex: "amount",
                        key: "amount",
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (text: any, record: any) => (
                            <Button
                                onClick={() => onOk(record)}
                            >
                                Select
                            </Button>
                        ),
                    },
                ]}
            />
        </Modal>
    );
}

const CreateOrder = ({ visible, onHide, onOk }: { visible: boolean, onHide: () => void, onOk: (data: any) => void }) => {
    const [customers, setCustomers] = useState([]);
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState<{
        name: string,
        warehouse: string,
        unitPrice: number,
        total: number,
        maximumAmount: number,
        warehouseProductId: number,
        quantity: number,
    }[]>([]);
    const [isShowSelectProduct, setIsShowSelectProduct] = useState(false);
    const [isShowSelectProductInWarehouse, setIsShowSelectProductInWarehouse] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>();

    const fetchCustomers = async () => {
        const res = await MainApiRequest.get("/customers/list");
        setCustomers(res.data);
    };

    const fetchProducts = async () => {
        const res = await MainApiRequest.get("/products/list");
        setProducts(res.data);
    };

    useEffect(() => {
        if (customers.length === 0) {
            fetchCustomers();
        }

        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const addProductToOrder = () => {
        setSelectedProduct(undefined);
        setIsShowSelectProduct(true);
    };

    const removeProductFromOrder = (id: number) => {
        setOrderProducts(orderProducts.filter((product: any) => product.warehouseProductId !== id));
    };

    const handleCreate = async () => {
        const values = await form.validateFields();
        onOk({
            name: values.name,
            customerId: values.customerId,
            remark: values.remark,
            status: "PENDING",
            items: orderProducts.map((product: any) => ({
                warehouseProductId: product.warehouseProductId,
                quantity: product.quantity,
            })),
        });
    }

    return (
        <Modal
            open={visible}
            onCancel={onHide}
            onOk={handleCreate}
            title="Create Order"
            className="modal-overlay"
            width={800}
        >
            <SelectProduct
                products={products}
                visible={isShowSelectProduct}
                onOk={(product) => {
                    setIsShowSelectProduct(false);
                    setSelectedProduct(product);
                    setIsShowSelectProductInWarehouse(true);
                }}
                onCancel={() => {
                    setIsShowSelectProduct(false)
                    setSelectedProduct(undefined);
                }}
            />
            <SelectProductInWarehouse
                products={selectedProduct?.warehouseProducts || []}
                visible={isShowSelectProductInWarehouse}
                onOk={(warehouseProduct) => {
                    setIsShowSelectProductInWarehouse(false);

                    if (!warehouseProduct) {
                        return;
                    }

                    setOrderProducts([
                        ...orderProducts,
                        {
                            name: selectedProduct.name,
                            maximumAmount: warehouseProduct.amount,
                            warehouse: warehouseProduct.warehouse.name,
                            unitPrice: selectedProduct.unitPrice,
                            total: selectedProduct.unitPrice,
                            warehouseProductId: warehouseProduct.id,
                            quantity: 1,
                        }
                    ]);
                }}
                onCancel={() => {
                    setIsShowSelectProductInWarehouse(false)
                    setIsShowSelectProduct(true);
                }}
            />
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
                    label="Customer"
                    name="customerId"
                    rules={[{ required: true, message: 'Please select the customer' }]}
                >
                    <Select>
                        {customers.map((customer: any) => (
                            <Select.Option key={customer.id} value={customer.id}>
                                {customer.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Remark"
                    name="remark"
                    rules={[{ required: true, message: 'Please enter the remark' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
            <Divider />
            <strong>Product list</strong>
            <Button
                onClick={addProductToOrder}
            >
                Add Product
            </Button>
            <Table
                dataSource={orderProducts}
                columns={[
                    {
                        title: "Product Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Warehouse",
                        dataIndex: "warehouse",
                        key: "warehouse",
                    },
                    {
                        title: "Remaining Amount",
                        dataIndex: "maximumAmount",
                        key: "maximumAmount",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                        render: (quantity: number, record: any) => (
                            <InputNumber
                                min={1}
                                max={record.maximumAmount}
                                value={quantity}
                                onChange={(value) => {
                                    const newTotal = value * record.unitPrice;

                                    setOrderProducts(orderProducts.map((product: any) => {
                                        if (product.warehouseProductId === record.warehouseProductId) {
                                            return {
                                                ...product,
                                                quantity: value,
                                                total: newTotal,
                                            };
                                        }

                                        return product;
                                    }));
                                }}
                            />
                        ),
                    },
                    {
                        title: "Unit Price",
                        dataIndex: "unitPrice",
                        key: "unitPrice",
                    },
                    {
                        title: "Total",
                        dataIndex: "total",
                        key: "total",
                    },
                    {
                        title: "Action",
                        key: "action",
                        render: (text: any, record: any) => (
                            <Button
                                onClick={() => removeProductFromOrder(record.warehouseProductId)}
                            >
                                Remove
                            </Button>
                        ),
                    },
                ]}
            />
        </Modal>
    );
};

export default CreateOrder;