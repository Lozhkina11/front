import { Button, Input } from "antd";
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
    <Input.Group compact>
      <Input
        style={{ width: "calc(100% - 100px)" }}
        placeholder="Доабавить url фото"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit} type="primary">
        Добавить
      </Button>
    </Input.Group>
  );
};

export default UploadPhoto;
