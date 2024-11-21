import { PlusOutlined } from "@ant-design/icons";
import { usePhotoContext } from "./context/Photos";
import { useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;
const UploadPhoto = () => {
  const { addPhotoByUrl } = usePhotoContext();
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    addPhotoByUrl(value);
    setValue("");
  };

  return (
    //     <div
    //       style={{
    //         padding: "22px", // Отступы вокруг карточек
    //         display: "flex",
    //         justifyContent: "center", // Центрирование карточек
    //       }}
    //     >
    //       <Space.Compact
    //         style={{
    //           width: "100%",
    //         }}
    //       >
    //         <Input
    //           style={{ width: "100%" }}
    //           placeholder="Доабавить url фото"
    //           value={value}
    //           onChange={(e) => setValue(e.target.value)}
    //         />
    //         <Button onClick={handleSubmit} type="primary">
    //           Submit
    //         </Button>
    //       </Space.Compact>

    //     </div>
    <div
      style={{
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Центрирование кнопки
      }}
    >
      {/* Кнопка с концентрическими кругами */}
      <div
        onClick={handleSubmit}
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
            border: "2px solid gray",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Внутренний круг */}
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#F5F5F5",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <PlusOutlined style={{ fontSize: "24px", color: "#C7C7C7" }} />
          </div>
        </div>
        {/* Текст под кнопкой */}
        <Text strong>Добавить</Text>
      </div>
    </div>
  );
};

export default UploadPhoto;
