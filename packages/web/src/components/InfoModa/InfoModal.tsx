import React from 'react';
import styles from './InfoModal.module.css'
import {Modal} from "antd";
import Button from "../Button/Button";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  okText?: string;
  children?: React.ReactNode;
  message?: string;
}

const InfoModal = ({visible, onClose, onOk, okText = "OK", children, message}: ModalProps) => (
  <Modal
    open={visible}
    onCancel={onClose}
    footer={[
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
      <Button onClick={onOk}>
        {okText}
      </Button>,
    ]}
  >
    {children ? children : <p>{message}</p>}
  </Modal>
);

export default InfoModal;
