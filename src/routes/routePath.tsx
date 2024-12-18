import DriverListLayout from "@/pages/DriverList/DriverListLayout";
import ImportManagementLayout from "@/pages/ImportManagement/ImportListLayout";
import ExportManagementLayout from "@/pages/ExportManagement/ExportListLayout";
import OrderLayout from "@/pages/Orders/OrdersLayout"
import CustomerLayout from "@/pages/Customers/CustomerLayout"
import DetailWarehouse from "@/pages/DetailWarehouse/DetailWarehouse";

import { Link } from "react-router-dom";
import Vehicle from "@/pages/Vehicle/Vehicle";
import PartnerListLayout from "@/pages/PartnerList/PartnerListLayout";
import WarehouseListLayout from "@/pages/WarehouseList/WarehouseListLayout";
import ProductListLayout from "@/pages/ProductList/ProductListLayout";
import LegalPersonListLayout from "@/pages/LegalPersonList/LegalPersonListLayout";

// Định nghĩa các route trong ứng dụng
export const routePath = [
  {
    index: false,
    path: "partner",
    icon: "far fa-circle",
    title: "Partner",
    component: <PartnerListLayout />
  },
  {
    index: false,
    path: "warehouse",
    icon: "far fa-circle",
    title: "Warehouse",
    component: <WarehouseListLayout />
  },
  {
    index: false,
    path: "my-warehouse",
    icon: "far fa-circle",
    title: "My Warehouse",
    children: [
      {
        index: false,
        path: "product-management",
        title: "Product Management",
        component: <ProductListLayout />
      },
      {
        index: false,
        path: "my-warehouse",
        title: "My Warehouse",
        component: <MyWarehouse />
      },
      {
        index: false,
        path: "daily",
        title: "Daily Report",
        component: <DailyReport />
      }
    ]
  },
  {
    index: false,
    path: "import-management",
    icon: "far fa-circle",
    title: "Import Management",
    component: <ImportManagementLayout />
  },
  {
    index: false,
    path: "export-management",
    icon: "far fa-circle",
    title: "Export Management",
    component: <ExportManagementLayout />
  },
  {
    index: false,
    path: "transportation",
    icon: "far fa-circle",
    title: "Transportation",
    children: [
      {
        index: false,
        path: "vehicle",
        title: "Vehicle",
        component: <Vehicle />
      },
      {
        index: false,
        path: "driver",
        title: "Driver",
        component: <DriverListLayout />
      }
    ]
  },
  {
    index: false,
    path: "logistic",
    icon: "far fa-circle",
    title: "Logistic",
    children: [
      {
        index: false,
        path: "orders",
        title: "Orders",
        component: <OrderLayout />
      },
      {
        index: false,
        path: "shipment",
        title: "Shipment",
        component: <Shipment />
      }
    ]
  },
  {
    index: false,
    path: "report",
    icon: "far fa-circle",
    title: "Report",
    component: <Report />
  },
  {
    index: false,
    path: "salary",
    icon: "far fa-circle",
    title: "Salary",
    component: <Salary />
  },
  {
    index: false,
    path: "account",
    icon: "far fa-circle",
    title: "Account",
    component: <Account />
  },
  {
    index: false,
    path: "legal-person",
    icon: "far fa-circle",
    title: "Legal Person",
    component: <LegalPersonListLayout />,
  },
  {
    index: false,
    path: "customer",
    icon: "far fa-circle",
    title: "Customer",
    component: <CustomerLayout />,
  },
  {
    index: false,
    path: "warehouse/:id",
    component: <DetailWarehouse />
  },
  {
    index: false,
    path: "*",
    component: <NoMatch />
  }
];

function MyWarehouse() {
  return (
    <>
      <div className="m-4">
        <h3>My Warehouse</h3>
      </div>
    </>
  );
}

function DailyReport() {
  return (
    <>
      <div className="m-4">
        <h3>Daily Report</h3>
      </div>
    </>
  );
}

function Shipment() {
  return (
    <>
      <div className="m-4">
        <h3>Shipment</h3>
      </div>
    </>
  );
}

function Report() {
  return (
    <>
      <div className="m-4">
        <h3>Report</h3>
      </div>
    </ >
  );
}

function Salary() {
  return (
    <>
      <div className="m-4">
        <h3>Salary</h3>
      </div>
    </>
  );
}

function Account() {
  return (
    <>
      <div className="m-4">
        <h3>Account</h3>
      </div>
    </>
  );
}

function NoMatch() {
  return (
    <>
      <div className="m-4">
        <h3>404 Not Found</h3>
        <Link to="/">Go to Home</Link>
      </div>
    </>
  );
}
