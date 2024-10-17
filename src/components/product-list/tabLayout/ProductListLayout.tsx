"use client";
import React, { useState } from "react";

import "./ProductListLayout.scss";

import DataTable, { DataProduct } from "../tabContent/table/DataTable";
import ActionButton from "../tabContent/actionButton/ActionButton";
import AddProductDialog from "../dialog/AddProductDialog";
import TabEditProduct from "../tabEdit/TabEditProduct";
const ProductListLayout = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isOpenTabEditProduct, setIsOpenTabEditProduct] = useState(false);
  const [selectDataProduct, setSelectDataProduct] =
    useState<DataProduct | null>(null);

  const handleCloseTabEditProduct = () => {
    setIsOpenTabEditProduct(false);
  };

  const handleEditItem = (item: DataProduct) => {
    setSelectDataProduct(item);
    setIsOpenTabEditProduct(true);
    setIsAddProductDialogOpen(false);
  };

  const handleSelectedItem = (item: DataProduct) => {
    setSelectDataProduct(item); // Update selected item in the parent
    setIsOpenTabEditProduct(true);
    setIsAddProductDialogOpen(false);
  };

  return (
    <div className="product-list-layout">
      <p className="title-text">Product List</p>
      <div className="tab-layout-div">
        <ActionButton
          onNewClick={() => setIsAddProductDialogOpen(true)}
          onExportClick={() => {}}
          onImportClick={() => {}}
        />
        <DataTable
          onRowClick={handleSelectedItem}
          onClickEdit={handleEditItem}
        />
        <AddProductDialog
          isOpen={isAddProductDialogOpen}
          onClose={() => setIsAddProductDialogOpen(false)}
        />

        <TabEditProduct
          dataProduct={selectDataProduct}
          isOpen={isOpenTabEditProduct}
          onClose={handleCloseTabEditProduct}
        />
      </div>
    </div>
  );
};
export default ProductListLayout;
