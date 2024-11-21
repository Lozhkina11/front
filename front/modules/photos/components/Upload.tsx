import { Button, Input, Space } from "antd";
import { usePhotoContext } from "./context/Photos";
import { useState } from "react";

const UploadPhoto = () => {
  const { addPhotoByUrl } = usePhotoContext();

  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    addPhotoByUrl(value);
    setValue("");
  };

  return (
    <div
      style={{
        padding: "22px", // Отступы вокруг карточек
        display: "flex",
        justifyContent: "center", // Центрирование карточек
      }}
    >
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Доабавить url фото"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
};

export default UploadPhoto;
