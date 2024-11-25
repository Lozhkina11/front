import { PlusOutlined } from "@ant-design/icons";
// import { usePhotoContext } from "./context/Photos";
// import { useState } from "react";
import { Typography } from "antd";
import { useUIContext } from "@/modules/ui/components/context/Ui";
import { ModalType } from "@/modules/ui/types";

const { Text } = Typography;
const UploadPhoto = () => {
  // const { addPhoto } = usePhotoContext();
  const { showModal } = useUIContext();

  return (
    <div
      style={{
        padding: "22px",
        display: "flex",
        alignItems: "center", // Центрирование кнопки
        justifyContent: "flex-start",
      }}
    >
      {/* Кнопка с концентрическими кругами */}
      <div
        onClick={() => showModal({ type: ModalType.addPhoto, params: {} })}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {/* Внешний круг */}
        <div
          style={{
            width: "80px",
            height: "80px",
            border: "1px solid lightgray",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Внутренний круг */}
          <div
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#F5F5F5",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <PlusOutlined style={{ fontSize: "34px", color: "#C7C7C7" }} />
          </div>
        </div>
        <Text strong>Добавить</Text>
      </div>
    </div>
  );
};

export default UploadPhoto;
