import { usePhotoContext } from "./context/Photos";
import { Button } from "antd";

const PhotoGrid = () => {
  const { photos, removePhoto } = usePhotoContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-gray-200 aspect-square flex flex-col justify-center items-center relative"
        >
          <img src={photo.url} alt={photo.title} className="max-h-full max-w-full object-contain" />
          <Button
            type="text"
            danger
            className="absolute top-2 right-2"
            onClick={() => removePhoto(photo.id)}
          >
            Удалить
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
