"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { moneyFormatter } from "@/utils/string";
import { Button, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import DetailExport from "./DetailExport";
import CreateExport from "./CreateExport";

const ExportManagement = () => {
  const [data, setData] = useState<any[]>([]);
  const [clickNew, setClickNew] = useState(false);
  const [showDetailExport, setShowDetailExport] = useState(false);
  const [selectedExport, setSelectedExport] = useState<any | null>(null);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
  };

  const fetchExports = async () => {
    const res = await MainApiRequest.get("/warehouses-export/list");
    setData(res.data);
  }

  useEffect(() => {
    if (!data.length) {
      fetchExports();
    }
  }, []);

  const approveExport = async (id: number) => {
    const res = await MainApiRequest.post(`/warehouses-export/${id}/approve`);
    if (res.status === 200) {
      await fetchExports();
    }
  }

  const handleCreateExport = async (data: any) => {
    const res = await MainApiRequest.post("/warehouses-export", data);
    if (res.status === 200) {
      await fetchExports();
    }
    setClickNew(false);
  };

  return (
    <>
      <div className="m-4">
        <h3>Export</h3>
        <Button
          onClick={handleClickNewButton}
          className="my-2"
        >
          New Export
        </Button>
        <DetailExport data={selectedExport} visible={showDetailExport} setVisible={setShowDetailExport} />
        <CreateExport visible={clickNew} setVisible={setClickNew} onOk={handleCreateExport} />
        <Table
          dataSource={data}
          columns={[
            {
              title: "Export Date",
              dataIndex: "importDate",
              render: (importDate: Date) => moment(importDate).format("DD/MM/YYYY"),
            },
            {
              title: "Document Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Warehouse Name",
              dataIndex: "warehouse",
              render: (warehouse: any) => warehouse.name,
            },
            {
              title: "Status",
              dataIndex: "status",
              render: (status: string) => (<Tag color={status === "DOCUMENT_DRAFT" ? "red" : "green"}>{status}</Tag>),
            },
            {
              title: "Total Value",
              render: (text: any, record: any) => {
                const totalValue = record.items.reduce((acc: number, product: any) => {
                  return acc + product.unitPrice * product.quantityActual;
                }, 0);

                return moneyFormatter(totalValue);
              },
            },
            {
              title: "Detail",
              key: "detail",
              render: (text: any, record: any) => (
                <Button
                  onClick={() => {
                    setSelectedExport(record);
                    setShowDetailExport(true);
                  }}
                >
                  Detail
                </Button>
              ),
            },
            {
              title: "Action",
              key: "action",
              render: (text: any, record: any) => (
                <div className="d-flex flex-row gap-2">
                  <Button
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                  {
                    record.status === "DOCUMENT_DRAFT" && (
                      <Button
                        onClick={() => {
                          approveExport(record.id);
                        }}
                        variant="solid"
                        color="danger"
                        style={{ backgroundColor: "green" }}
                      >
                        Approve
                      </Button>
                    )
                  }
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ExportManagement;
