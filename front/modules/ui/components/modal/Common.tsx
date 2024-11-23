/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ModalParams, ModalType } from "../../types";

interface CommonModalProps {
  open: boolean;
  type?: ModalType;
  params?: ModalParams;
  onCancel: () => void;
}

type addPhotoProps = {
  id?: number;
  onClose: () => void;
};

interface ModalComponentProps {
  onClose: () => void;
  params?: ModalParams;
}

type ModalInfo = {
  component: React.FC<ModalComponentProps>;
  title: string;
};

const addPhoto: React.FC<addPhotoProps & { params?: ModalParams }> = ({
  id,
  onClose = () => {},
  params = {},
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const onSubmit = () => {
    if (id) alert("редактирование");
    else alert("добавление");
    if (params.addPhotoByUrl) {
      params.addPhotoByUrl(url);
    }

    onClose();
    setUrl("");
    setDescription("");
  };
  return (
    // <Form layout="vertical" onFinish={onSubmit}>
    //   <Form.Item
    //     label="Фото"
    //     name="photo"
    //     rules={[{ required: false, message: "Выберите файл!" }]}
    //   >
    //     {/* <Input type="file" /> */}
    //     <Input
    //       allowClear
    //       value={url}
    //       onChange={(e) => setUrl(e.target.value)}
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     label="Описание"
    //     name="description"
    //     rules={[{ required: false, message: "Введите описание!" }]}
    //   >
    //     <Input.TextArea
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //     />
    //   </Form.Item>
    //   <Form.Item>
    //     <Button type="primary" htmlType="submit">
    //       {/* {id ? "Сохранить" : "Добавить"} */} Добавить
    //     </Button>
    //   </Form.Item>
    // </Form>


<Form layout="vertical" onFinish={onSubmit}> 
<Form.Item label="URL" required> 
  <Input value={url} onChange={(e) => setUrl(e.target.value)} /> 
</Form.Item> 
<Form.Item label="Описание"> 
  <Input.TextArea 
    value={description} 
    onChange={(e) => setDescription(e.target.value)} 
  /> 
</Form.Item> 
<Form.Item> 
  <Button type="primary" htmlType="submit"> 
    Добавить 
  </Button> 
</Form.Item> 
</Form>

  );
};

const editPhoto: React.FC<addPhotoProps> = ({ id, onClose = () => {} }) => {
  const onSubmit = () => {
    if (id) alert(`Фото с ID ${id} обновлено`);
    onClose();
  };

  return (
    <Form name="edit-photo" layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Фото"
        name="photo"
        rules={[{ required: false, message: "Выберите файл!" }]}
      >
        <Input type="file" />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: false, message: "Введите описание!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

const settings: Record<string, ModalInfo> = {
  addPhoto: {
    component: addPhoto,
    title: "Добавить фото",
  },
  editPhoto: {
    component: editPhoto,
    title: "Редактировать фото",
  },

  defaultModal: {
    component: () => <div>Компонент отсутсвует</div>,
    title: "Компонент отсутсвует",
  },
};

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  type,
  onCancel,
  params,
}) => {
  const { component: Component, title } = settings[type || "defaultModal"];
  return (
    <Modal title={title} open={open} footer={null} onCancel={onCancel}>
      <Component params={params} onClose={onCancel} />
    </Modal>
  );
};

export default CommonModal;
