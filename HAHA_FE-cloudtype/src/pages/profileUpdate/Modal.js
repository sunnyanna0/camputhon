// src/components/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ message, onConfirm, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>확인</button>
          <button className={styles.closeButton} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
