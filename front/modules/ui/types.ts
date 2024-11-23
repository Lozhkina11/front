export type ModalParams = {
  content?: React.ReactNode;
  addPhotoByUrl?: (url: string) => void; // Добавляем функцию в параметры
};

export enum ModalType {
  addEditPhoto = "addEditPhoto",
}

export type ModalSettings = {
  type: ModalType;
  params: ModalParams;
};
