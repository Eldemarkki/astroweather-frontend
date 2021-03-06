import { ModalProps } from "@mantine/core";
import { useState } from "react";

type PartialProperty<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
type UseModalParameters = Omit<PartialProperty<ModalProps, "onClose">, "opened">
type UseModalResult = [ModalProps, () => void, () => void];

export const useMantineModal = (props?: UseModalParameters): UseModalResult => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalProps: ModalProps = {
    ...props,
    opened: isModalOpen,
    onClose: () => {
      setIsModalOpen(false);
      if (props && props.onClose) {
        props.onClose();
      }
    },
  };

  return [
    modalProps,
    () => setIsModalOpen(true),
    () => setIsModalOpen(false),
  ];
};
