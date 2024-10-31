import Button from "@/components/ui/Button";
import { removePartner } from "@/redux/reducers/partnerReducers";
import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch } from "react-redux";

interface DeleteButtonProps {
  idItemDelete: number;
}

const ButtonActionDelete = ({
  idItemDelete
}: DeleteButtonProps) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removePartner({ id: idItemDelete }));
  };

  const deleteButtonStyle: React.CSSProperties = {
    display: "flex",
    width: "auto",
    height: "auto",
    zIndex: 10,
    cursor: "pointer"
  };

  return (
    <div style={deleteButtonStyle} onClick={handleDelete}>
      <Button
        variant="primary"
        size="medium"
        rounded="none"
        backgroundColor="transparent"
        padding="0"
        type="button"
        disabled={false}
        // onClick={handleDelete}
      >
        <Icon
          icon="lucide:trash-2"
          width={24}
          height={24}
          style={{ color: "#1c1c1c" }}
        />
      </Button>
    </div>
  );
};

export default ButtonActionDelete;
