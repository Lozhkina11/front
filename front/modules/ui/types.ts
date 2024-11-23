// export type ModalParams = {
//   content?: React.ReactNode;
// };

// export enum ModalType {
//   addPhoto = "addPhoto",
//   editPhoto = "editPhoto",
// }

// export type ModalSettings = {
//   type: ModalType;
//   params: ModalParams;
//   data?: ModalType;
// };

export enum ModalType {
  addPhoto = "addPhoto",
  editPhoto = "editPhoto",
}

export type ModalParams = {
  content?: React.ReactNode;
  id?: number;
  url?: string;
  addPhotoByUrl?: (url: string) => void;
  // [key: string]: any; // Дополнительные параметры
};

export type ModalSettings = {
  type: ModalType;
  params?: ModalParams; // Делаем необязательным, если params может отсутствовать
  // data?: any; // Если data используется, уточните его тип
};
