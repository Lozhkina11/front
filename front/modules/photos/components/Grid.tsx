import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePhotoContext } from "./context/Photos";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

const PhotoGrid = () => {
  const { photos, removePhoto } = usePhotoContext();

  return (
    <div
      style={{
        padding: "16px", // Отступы вокруг карточек
        display: "flex",
        justifyContent: "center", // Центрирование карточек
      }}
    >
      <Row
        gutter={[16, 16]} // Пространство между карточками
        style={{
          width: "100%",
          maxWidth: "1200px", // Максимальная ширина сетки
        }}
        justify="start" // Выравнивание карточек в начале строки
      >
        {photos.map((photo) => (
          <Col key={photo.id} xs={24} sm={12} md={8} lg={8}>
            <Card
              style={{
                width: "100%", // Карточки занимают всю ширину колонки
              }}
              cover={
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="max-h-full max-w-full object-contain"
                />
              }
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => removePhoto(photo.id)}
                />,
              ]}
            >
              <Meta description="This is the description" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PhotoGrid;
