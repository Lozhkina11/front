import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ModalParams, ModalType } from "../../types";

interface CommonModalProps {
  open: boolean;
  type?: ModalType;
  params?: ModalParams;
  onCancel: () => void;
}

type AddEditPhotoProps = {
  id?: number;
  onClose: () => void;
};

interface ModalComponentProps {
  onClose: () => void;
  params?: ModalParams; // Добавляем params
}

type ModalInfo = {
  component: React.FC<ModalComponentProps>;
  title: string;
};

const AddEditPhoto: React.FC<AddEditPhotoProps & { params?: ModalParams }> = ({
  id,
  onClose = () => {},
  params = {},
}) => {
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (id) alert("редактирование");
    else alert("добавление");
    if (params.addPhotoByUrl) {
      params.addPhotoByUrl(url); // вызываем метод контекста
    }
    // Очищаем состояние формы
    setUrl("");
    setDescription("");
    onClose();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
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

const settings: Record<string, ModalInfo> = {
  addEditPhoto: {
    component: AddEditPhoto,
    title: "Добавить фото",
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
