import React from "react";
import styles from "./calendarDetail.module.css";

const CalendarDetail = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>Calendar</div>
        <div className={styles.innerContainer}>
          <div className={styles.event}>
            <div className={styles.eventIcon}>🏃</div>
            <div className={styles.eventDetails}>
              <h2>대운동장 3바퀴 뛰기</h2>
              <p>운동</p>
            </div>
            <div className={styles.eventTime}>30m</div>
          </div>
          <div className={styles.date}>2024년 7월 21일 일요일</div>
          <div className={styles.imagePlaceholder}>챌린지를 완료했어요!</div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarDetail;
