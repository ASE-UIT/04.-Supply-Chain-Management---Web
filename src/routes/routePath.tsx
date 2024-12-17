import LegalPersonListLayout from "@/pages/LegalPersonList/tabLayout/LegalPersonListLayout";
import DriverListLayout from "@/pages/DriverList/DriverListLayout";
import PartnerListLayout from "@/pages/PartnerList/tabLayout/PartnerListLayout";
import ProductListLayout from "@/pages/ProductList/tabLayout/ProductListLayout";
import VehicleListLayout from "@/pages/VehicleList/tab/tabLayout/VehicleListLayout";
import WareHouseListLayout from "@/pages/WarehouseList/tab/tabLayout/WarehouseListLayout";
// import ProductListLayout from "@/pages/product-list/tabLayout/ProductListLayout";
import ImportManagementLayout from "@/pages/ImportManagement/ImportListLayout";
import ExportManagementLayout from "@/pages/ExportManagement/ExportListLayout";
import OrderLayout from "@/pages/Orders/OrdersLayout"
import CustomerLayout from "@/pages/Customers/CustomerLayout"

import { Link } from "react-router-dom";

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
    component: <WareHouseListLayout />
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
        component: <VehicleListLayout />
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
    path: "*",
    component: <NoMatch />
  }
];

function MyWarehouse() {
  return (
    <div>
      <h2>My Warehouse</h2>
      <p>Chi tiết kho hàng của bạn</p>
    </div>
  );
}

function DailyReport() {
  return (
    <div>
      <h2>Daily Report</h2>
      <p>Báo cáo hàng ngày</p>
    </div>
  );
}

function ImportManagement() {
  return (
    <div>
      <h2>Import Management</h2>
      <p>Quản lý thông tin nhập kho</p>
    </div>
  );
}

function ExportManagement() {
  return (
    <div>
      <h2>Export Management</h2>
      <p>Quản lý thông tin xuất kho</p>
    </div>
  );
}

function Driver() {
  return (
    <div>
      <h2>Driver</h2>
      <p>Quản lý tài xế và các thông tin liên quan</p>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2>Orders</h2>
      <p>Quản lý đơn hàng trong hệ thống</p>
    </div>
  );
}

function Shipment() {
  return (
    <div>
      <h2>Shipment</h2>
      <p>Quản lý lô hàng và theo dõi trạng thái</p>
    </div>
  );
}

function Report() {
  return (
    <div>
      <h2>Report</h2>
      <p>Thống kê và báo cáo hoạt động</p>
    </div>
  );
}

function Salary() {
  return (
    <div>
      <h2>Salary</h2>
      <p>Quản lý lương và các chế độ nhân viên</p>
    </div>
  );
}

function Account() {
  return (
    <div>
      <h2>Account</h2>
      <p>Thông tin tài khoản cá nhân</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Không tìm thấy trang!</h2>
      <p>
        <Link to="/">Quay lại trang chủ</Link>
      </p>
    </div>
  );
}
