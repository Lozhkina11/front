"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ModalSettings } from "../../types";
import CommonModal from "../modal/Common";

type UIContextType = {
  isModalVisible: boolean;
  showModal: (settings: ModalSettings) => void;
  hideModal: () => void;
  modal: ModalSettings | null;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [modal, setModal] = useState<ModalSettings | null>(null);

  const showModal = (settings: ModalSettings) => {
    setModalVisible(true);
    setModal(settings);
  };
  const hideModal = () => setModalVisible(false);

  return (
    <UIContext.Provider value={{ isModalVisible, showModal, hideModal, modal }}>
      {children}
      <CommonModal
        open={isModalVisible}
        type={modal?.type}
        params={modal?.params}
        onCancel={hideModal}
      />
    </UIContext.Provider>
  );
};
