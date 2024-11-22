import { Button, Form, Input, Modal } from "antd";
import React from "react";
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
}

type ModalInfo = {
  component: React.FC<ModalComponentProps>;
  title: string;
};

const AddEditPhoto: React.FC<AddEditPhotoProps> = ({
  id,
  onClose = () => {},
}) => {
  const onSubmit = () => {
    if (id) alert("редактирование");
    else alert("добавление");
    onClose();
  };
  return (
    <Form name="add-photo" layout="vertical" onFinish={onSubmit}>
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
          {id ? "Сохранить" : "Добавить"}
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

const CommonModal: React.FC<CommonModalProps> = ({ open, type, onCancel }) => {
  const { component: Component, title } = settings[type || "defaultModal"];
  return (
    <Modal title={title} open={open} footer={null} onCancel={onCancel}>
      <Component onClose={onCancel} />
    </Modal>
  );
};

export default CommonModal;
