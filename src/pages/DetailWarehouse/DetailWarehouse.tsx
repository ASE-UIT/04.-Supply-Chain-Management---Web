import MainApiRequest from "@/redux/apis/MainApiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";

const DetailWarehouse = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>([]);

    const fetchData = async () => {
        const res = await MainApiRequest.get(`/warehouses/${id}`);
        setData(
            res.data.products.map(
                (product: any) => ({
                    ...product.product,
                    quantity: product.amount
                })
            )
        );
    }

    const columns = [
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="m-4">
                <h1>Detail Warehouse</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default DetailWarehouse;