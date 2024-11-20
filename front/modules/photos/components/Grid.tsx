// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { usePhotoContext } from "./context/Photos";
// import { Button } from "antd";

// const PhotoGrid = () => {
//   const { photos, removePhoto, addDescription } = usePhotoContext();

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {photos.map((photo) => (
//         <div
//           key={photo.id}
//           className="bg-gray-200 aspect-square flex flex-col justify-center items-center relative"
//         >
//           <img
//             src={photo.url}
//             alt={photo.title}
//             className="max-h-full max-w-full object-contain"
//           />
  
//             <Button
//               type="text"
//               danger
//               icon={ <EditOutlined /> }
//               className="absolute top-2 right-10"
//               onClick={() => addDescription(photo.id, photo.description)}
//             />


//           <Button
//             type="text"
//             danger
//             icon={<DeleteOutlined />}
//             className="absolute top-2 right-2"
//             onClick={() => removePhoto(photo.id)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PhotoGrid;
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePhotoContext } from "./context/Photos";
import { Button, Input } from "antd";
import { useState } from "react";

const PhotoGrid = () => {
  const { photos, removePhoto, addDescription } = usePhotoContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");

  const handleEdit = (id: number, currentDescription: string) => {
    setEditingId(id);
    setNewDescription(currentDescription || ""); // Начальное значение
  };

  const handleSaveDescription = (id: number) => {
    addDescription(id, newDescription);
    setEditingId(null);
    setNewDescription("");
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-gray-200 aspect-square flex flex-col justify-center items-center relative"
        >
          {/* Фото */}
          <img
            src={photo.url}
            alt={photo.title || "Фото"}
            className="max-h-full max-w-full object-contain rounded"
          />

          {/* Редактирование описания */}
          {editingId === photo.id ? (
            <div className="absolute bottom-4 w-full px-4">
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Введите описание"
                className="mb-2"
              />
              <Button
                type="primary"
                size="small"
                className="w-full"
                onClick={() => handleSaveDescription(photo.id)}
              >
                Сохранить
              </Button>
            </div>
          ) : (
            <div className="text-sm text-gray-600 mt-2 text-center">
              {photo.description || "Нет описания"}
            </div>
          )}

          {/* Кнопки управления */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(photo.id, photo.description)}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removePhoto(photo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
