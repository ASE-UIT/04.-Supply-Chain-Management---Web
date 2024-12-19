import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

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

const CreateImport = ({
    visible,
    setVisible,
    onOk
}: {
    visible: boolean,
    setVisible: (v: boolean) => void,
    onOk: (data: any) => void
}) => {
    const [form] = Form.useForm();
    const [items, setItems] = useState<any[]>([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [showSelectProduct, setShowSelectProduct] = useState(false);

    const handleOK = () => {
        const data = {
            warehouseId: form.getFieldValue("warehouse"),
            name: form.getFieldValue("name"),
            exportDate: new Date(),
            status: "DOCUMENT_DRAFT",
            items: items.map((item) => ({
                productId: item.product.id,
                unitPrice: item.unitPrice,
                quantityDocument: item.quantityDocument,
                quantityActual: item.quantityActual,
            })),
        };
        onOk(data);
    }

    const fetchWarehouses = async () => {
        const res = await MainApiRequest.get("/warehouses/list");
        setWarehouses(res.data);
    }

    const fetchProducts = async () => {
        const res = await MainApiRequest.get("/products/list");
        setProducts(res.data);
    }

    useEffect(() => {
        if (!warehouses.length) {
            fetchWarehouses();
        }

        if (!products.length) {
            fetchProducts();
        }
    }, []);

    const handleAddNewItem = () => {
        setShowSelectProduct(true);
    }

    return (
        <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            onOk={() => handleOK()}
            title="Detail Import"
            className="modal-overlay"
            width={800}
        >
            <Form form={form}>
                <Form.Item
                    label="Document Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Warehouse"
                    name="warehouse"
                >
                    <Select>
                        {warehouses.map((warehouse: any) => (
                            <Select.Option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
            <Divider />
            <Button
                onClick={handleAddNewItem}
            >
                Add Item
            </Button>
            <SelectProduct
                products={products}
                visible={showSelectProduct}
                onOk={(product) => {
                    const newItems = [...items];
                    newItems.push({
                        key: newItems.length,
                        product,
                        unitPrice: product.unitPrice,
                        quantityDocument: 0,
                        quantityActual: 0,
                    });
                    setItems(newItems);
                    setShowSelectProduct(false);
                }}
                onCancel={() => setShowSelectProduct(false)}
            />
            <Table
                dataSource={items}
                columns={[
                    {
                        title: "Product Name",
                        dataIndex: "product",
                        render: (product: any) => product.name,
                    },
                    {
                        title: "Unit Price",
                        render: (text: any, record: any) => {
                            return (
                                <Input
                                    type="number"
                                    value={record.unitPrice}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        const index = newItems.findIndex((item) => item.product.id === record.product.id);
                                        newItems[index].unitPrice = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            );
                        }
                    },
                    {
                        title: "Quantity (Document)",
                        render: (text: any, record: any) => {
                            return (
                                <Input
                                    type="number"
                                    value={record.quantityDocument}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        const index = newItems.findIndex((item) => item.product.id === record.product.id);
                                        newItems[index].quantityDocument = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            );
                        }
                    },
                    {
                        title: "Quantity Actual",
                        render: (text: any, record: any) => {
                            return (
                                <Input
                                    type="number"
                                    value={record.quantityActual}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        const index = newItems.findIndex((item) => item.product.id === record.product.id);
                                        newItems[index].quantityActual = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            );
                        }
                    },
                    {
                        title: "Total Value",
                        render: (text: any, record: any) => {
                            return record.unitPrice * record.quantityActual;
                        }
                    },
                    {
                        title: "Action",
                        render: (text: any, record: any) => (
                            <Button
                                onClick={() => {
                                    const newItems = [...items];
                                    const index = newItems.findIndex((item) => item.product.id === record.product.id);
                                    newItems.splice(index, 1);
                                    setItems(newItems);
                                }}
                            >
                                Remove
                            </Button>
                        )
                    }
                ]}
            />
        </Modal>
    );
}

export default CreateImport;