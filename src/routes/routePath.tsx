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
import Report from "@/pages/Report/Report";

// Định nghĩa các route trong ứng dụng
export const routePath = [
  {
    index: true,
    path: "",
    icon: "fas fa-gauge",
    title: "Dashboard",
    component: <Report />
  },
  {
    index: false,
    path: "legal-person",
    icon: "fas fa-users",
    title: "Legal Person",
    component: <LegalPersonListLayout />,
  },
  {
    index: false,
    path: "partner",
    icon: "far fa-handshake",
    title: "Partner",
    component: <PartnerListLayout />
  },
  {
    index: false,
    path: "customer",
    icon: "fas fa-user-secret",
    title: "Customer",
    component: <CustomerLayout />,
  },
  {
    index: false,
    path: "products",
    icon: "fas fa-cube",
    title: "Products",
    component: <ProductListLayout />
  },
  {
    index: false,
    path: "warehouse",
    icon: "fas fa-warehouse",
    title: "Warehouse",
    component: <WarehouseListLayout />
  },
  {
    index: false,
    path: "my-warehouse",
    icon: "fas fa-warehouse",
    title: "My Warehouse",
    children: [
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
    icon: "fas fa-download",
    title: "Import Management",
    component: <ImportManagementLayout />
  },
  {
    index: false,
    path: "export-management",
    icon: "fas fa-arrow-up-from-bracket",
    title: "Export Management",
    component: <ExportManagementLayout />
  },
  {
    index: false,
    path: "transportation",
    icon: "fas fa-truck-fast",
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
    icon: "fas fa-gears",
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
    path: "salary",
    icon: "fas fa-receipt",
    title: "Salary",
    component: <Salary />
  },
  {
    index: false,
    path: "account",
    icon: "fas fa-person",
    title: "Account",
    component: <Account />
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
