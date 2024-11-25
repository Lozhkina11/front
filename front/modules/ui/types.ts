export enum ModalType {
  addPhoto = "addPhoto",
  editPhoto = "editPhoto",
}


export type ModalParams = {
  content?: React.ReactNode;
  id?: number;
  url?: string;
  addPhoto?: (url: string) => void;
};

export type ModalSettings = {
  type: ModalType;
  params?: ModalParams; // Делаем необязательным, если params может отсутствовать
  // data?: any; // Если data используется, уточните его тип
};
