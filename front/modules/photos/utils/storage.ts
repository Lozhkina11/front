import { Photo } from "../types";

export const storePhotos = (photos: Photo[]) => {
  localStorage.setItem("photos", JSON.stringify(photos));
};

export const getPhotos = (): Photo[] => {
  const photos = localStorage.getItem("photos");
  return photos ? JSON.parse(photos) : [];
};
