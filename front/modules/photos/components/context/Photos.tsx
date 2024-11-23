"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Photo } from "../../types";
import { getPhotos, storePhotos } from "../../utils/storage";

type PhotoContextType = {
  photos: Photo[];
  // addPhoto: (photo: Photo) => void;
  addPhotoByUrl: (url: string) => void;
  removePhoto: (id: number) => void;
  updatePhoto: (id: number, url: string, description: string) => void;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

type PhotoProviderProps = {
  children: React.ReactNode;
};

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  // const addPhoto = (photo: Photo) => {
  //   setPhotos((prevPhotos) => [...prevPhotos, photo]);
  // };

  const addPhotoByUrl = (url: string) => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { id: Date.now(), url, title: "", description: "" },
    ]);
  };

  const removePhoto = (id: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  const updatePhoto = (id: number, url: string, description: string) => {
    setPhotos(photos.map(photo => (photo.id === id ? { ...photo, url, description } : photo)));
  };

  useEffect(() => {
    setPhotos(getPhotos());
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    
    
    if (!dataLoaded) return;
    storePhotos(photos);
  }, [photos, dataLoaded]);

  return (
    <PhotoContext.Provider value={{ photos, addPhotoByUrl, removePhoto, updatePhoto}}>
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
