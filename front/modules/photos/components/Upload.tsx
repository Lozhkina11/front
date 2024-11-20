// import { Button, Input } from "antd";
// import { usePhotoContext } from "./context/Photos";
// import { useState } from "react";

// const UploadPhoto = () => {
//   const { addPhotoByUrl } = usePhotoContext();

//   const [value, setValue] = useState<string>("");

//   const handleSubmit = () => {
//     addPhotoByUrl(value);
//     setValue("");
//   };
//   return(

//     <Input.Group compact>
//       <Input
//         style={{ width: "calc(100% - 100px)" }}
//         placeholder="Доабавить url фото"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />

//       <Button onClick={handleSubmit} type="primary">
//         Добавить
//       </Button>
//     </Input.Group>
//   );
// };

// export default UploadPhoto;

import { Button, Input, Form } from "antd";
import { useState } from "react";
import { usePhotoContext } from "./context/Photos";

const UploadPhoto = () => {
  const { addPhotoByUrl } = usePhotoContext();
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (url) {
      addPhotoByUrl(url, description);
      setUrl("");
      setDescription("");
    }
  };

  return (
    <Form layout="vertical" className="space-y-4">
      <Form.Item
        label="URL фото"
        rules={[
          { required: true, message: "Введите URL фотографии!" },
          { type: "url", message: "Введите корректный URL!" },
        ]}
      >
        <Input
          placeholder="Добавить URL фото"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Описание">
        <Input
          placeholder="Добавить описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit} className="w-full">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadPhoto;



