import { usePhotoContext } from "./context/Photos";

const PhotoGrid = () => {
  const { photos } = usePhotoContext();
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-gray-200 aspect-square flex justify-center items-center"
        >
          <img src={photo.url} alt={photo.title} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
