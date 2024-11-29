"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { NewPhoto, Photo } from "../../types";

type PhotoContextType = {
  photos: Photo[];
  addPhoto: (photo: NewPhoto) => void;
  removePhoto: (id: number) => void;
  updatePhoto: (id: number, url: string, description: string) => void;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

type PhotoProviderProps = {
  children: React.ReactNode;
};

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/photos`);
      if (!response.ok) throw new Error("Ошибка загрузки фотографий");
      const data: Photo[] = await response.json();
      setPhotos(data);
    
    } catch (error) {
      console.error("Ошибка при загрузке фотографий:", error);
    }
  };


  // Добавление новой фотографии на бэкенд
  const addPhoto = async ({ title, description, file }: NewPhoto) => {
    try {
      const response = await fetch(`http://localhost:3001/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, file }),
      });
      if (!response.ok) throw new Error("Ошибка при добавлении фотографии");
      const newPhoto: Photo = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } catch (error) {
      console.error("Ошибка при добавлении фотографии:", error);
    }
  };

  // Удаление фотографии
  const removePhoto = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/photos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Ошибка при удалении фотографии");
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении фотографии:", error);
    }
  };

  // Обновление фотографии
  const updatePhoto = async (
    id: number,
    title: string,
    description: string
  ) => {
    try {
      const response = await fetch(`http://localhost:3001/photos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Ошибка при обновлении фотографии");
      const updatedPhotoRes: { item: Photo } = await response.json();
      const updatedPhoto = updatedPhotoRes.item;
      setPhotos((prevPhotos) => {
        return prevPhotos.map((photo) =>
          photo.id === id ? { ...photo, ...updatedPhoto } : photo
        );
      });
      console.log({ updatedPhoto, photos });
    } catch (error) {
      console.error("Ошибка при обновлении фотографии:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);


  return (
    <PhotoContext.Provider
      value={{ photos, addPhoto, removePhoto, updatePhoto }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotoContext must be used within a PhotoProvider");
  }
  return context;
};

export default PhotoContext;
