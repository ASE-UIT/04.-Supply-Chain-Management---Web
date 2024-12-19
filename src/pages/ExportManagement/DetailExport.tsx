import { Modal, Table } from "antd";
import moment from "moment";

const DetailExport = ({
    data,
    visible,
    setVisible
}: {
    data: any,
    visible: boolean,
    setVisible: (v: boolean) => void
}) => {
    return (
        <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            okButtonProps={{ hidden: true }}
            title="Detail Export"
            className="modal-overlay"
            width={800}
        >
            {data && <div className="modal-content">
                <strong>Export Date: {moment(data.exportDate).format("DD-MM-YYYY HH:mm:ss")}</strong>
                <strong>Document Name: {data.name}</strong>
                <strong>Warehouse Name: {data.warehouse.name}</strong>
                <strong>Status: {data.status}</strong>
                <strong>Total Value: {data.items.reduce((acc: number, product: any) => {
                    return acc + product.unitPrice * product.quantityActual;
                }, 0)}</strong>
                <strong>Detail:</strong>
                <Table
                    dataSource={data.items}
                    columns={[
                        {
                            title: "Product Name",
                            dataIndex: "product",
                            render: (product: any) => product.name,
                        },
                        {
                            title: "Unit Price",
                            dataIndex: "unitPrice",
                            key: "unitPrice",
                        },
                        {
                            title: "Quantity (Document)",
                            dataIndex: "quantityDocument",
                            key: "quantityDocument",
                        },
                        {
                            title: "Quantity Actual",
                            dataIndex: "quantityActual",
                            key: "quantityActual",
                        },
                        {
                            title: "Total Value",
                            render: (text: any, record: any) => {
                                return record.unitPrice * record.quantityActual;
                            }
                        },
                    ]}
                />
            </div>
            }
        </Modal>
    );
}

export default DetailExport;