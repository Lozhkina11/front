/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ModalParams, ModalType } from "../../types";
import { usePhotoContext } from "@/modules/photos/components/context/Photos";
import { message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Photo } from "@/modules/photos/types";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface CommonModalProps {
  open: boolean;
  type?: ModalType;
  params?: ModalParams;
  onCancel: () => void;
}

type addPhotoProps = {
  onClose: () => void;
  params: {
    photo?: Photo;
  };
};

interface ModalComponentProps {
  onClose: () => void;
  params?: ModalParams;
}

type ModalInfo = {
  component: React.FC<ModalComponentProps>;
  title: string;
};

const AddPhoto: React.FC<addPhotoProps> = ({
  params: { photo } = {},
  onClose = () => {},
}) => {
  const { addPhoto, updatePhoto } = usePhotoContext();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async () => {
    if (photo) {
      try {
        updatePhoto(photo.id, title, description);
        message.success("Фотография успешно обновлена");
        onClose();
      } catch (error) {
        console.error(error);
        message.error("Не удалось обновить фотографию");
      }
    } else {
      const file = await getBase64(fileList[0].originFileObj as FileType);
      const photoData = { file, title, description };

      try {
        const response = await fetch("http://localhost:3001/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photoData),
        });

        if (!response.ok) {
          throw new Error("Ошибка при сохранении фотографии");
        }

        const savedPhoto = await response.json();
        message.success("Фотография успешно сохранена");
        addPhoto(savedPhoto); // Добавляем фото в контекст
      } catch (error) {
        console.error(error);
        message.error("Не удалось сохранить фотографию");
      }

      onClose();
      setTitle("");
      setDescription("");
      setFileList([]);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  console.log(fileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  console.log(photo, "photo");

  useEffect(() => {
    if (photo) {
      setTitle(photo.title);
      setDescription(photo.description);
      setFileList([
        {
          uid: photo.id.toString(),
          name: photo.title,
          status: "done",
          url: photo.file,
        },
      ]);
      // setPreviewImage(photo.file);
    }
  }, [photo]);

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item label="Название">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>

      <Upload
        customRequest={(options) => {
          const { file, onSuccess, onError } = options;

          onSuccess({}, file);
        }}
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: !photo }}
      >
        {fileList.length > 1 || photo ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Form.Item label="Описание">
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {photo ? "Сохранить" : "Добавить"}
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
    component: AddPhoto,
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
