/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ModalParams, ModalType } from "../../types";
import { usePhotoContext } from "@/modules/photos/components/context/Photos";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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

const AddPhoto: React.FC<addPhotoProps & { params?: ModalParams }> = ({
  id,
  onClose = () => {},
  // params = {},
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addPhoto } = usePhotoContext();
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const props: UploadProps = {
    name: "file",
    action: "http://localhost:3001/upload",
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUrl(info.file.response.url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onSubmit = () => {
    if (id) alert("редактирование");
    else alert("добавление");
    addPhoto({ url, title, description });
    onClose();
    setUrl("");
    setDescription("");
  };
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item label="title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
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

const EditPhoto: React.FC<addPhotoProps> = ({ id, onClose = () => {} }) => {
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
    component: AddPhoto,
    title: "Добавить фото",
  },
  editPhoto: {
    component: EditPhoto,
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
