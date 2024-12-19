"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { moneyFormatter } from "@/utils/string";
import { Button, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import DetailImport from "./DetailImport";
import CreateImport from "./CreateImport";

const ImportManagement = () => {
  const [data, setData] = useState<any[]>([]);
  const [clickNew, setClickNew] = useState(false);
  const [showDetailImport, setShowDetailImport] = useState(false);
  const [selectedImport, setSelectedImport] = useState<any | null>(null);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
  };

  const fetchImports = async () => {
    const res = await MainApiRequest.get("/warehouses-import/list");
    setData(res.data);
  }

  useEffect(() => {
    if (!data.length) {
      fetchImports();
    }
  }, []);

  const approveImport = async (id: number) => {
    const res = await MainApiRequest.post(`/warehouses-import/${id}/approve`);
    if (res.status === 200) {
      await fetchImports();
    }
  }

  const handleCreateImport = async (data: any) => {
    const res = await MainApiRequest.post("/warehouses-import", data);
    if (res.status === 200) {
      await fetchImports();
    }
    setClickNew(false);
  };

  return (
    <>
      <div className="m-4">
        <h3>Import</h3>
        <Button
          onClick={handleClickNewButton}
          className="my-2"
        >
          New Import
        </Button>
        <DetailImport data={selectedImport} visible={showDetailImport} setVisible={setShowDetailImport} />
        <CreateImport visible={clickNew} setVisible={setClickNew} onOk={handleCreateImport} />
        <Table
          dataSource={data}
          columns={[
            {
              title: "Import Date",
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
              render: (status: string) => (<Tag color={status === "DRAFT" ? "red" : "green"}>{status}</Tag>),
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
                    setSelectedImport(record);
                    setShowDetailImport(true);
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
                    record.status === "DRAFT" && (
                      <Button
                        onClick={() => {
                          approveImport(record.id);
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

export default ImportManagement;
