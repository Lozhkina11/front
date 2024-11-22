export type ModalParams = {
  content?: React.ReactNode;
};

export enum ModalType {
  addEditPhoto = "addEditPhoto",
}

export type ModalSettings = {
  type: ModalType;
  params: ModalParams;
};


