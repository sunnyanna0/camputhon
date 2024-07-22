import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./list.module.css";
import OrangeButton from "../../components/button/orange_button";
import { ReactComponent as Run } from "../../components/images/run.svg";
import { ReactComponent as Pen } from "../../components/images/pencil.svg";
import { ReactComponent as Dice } from "../../components/images/dice.svg";

const Modal = ({ onClose, challengeId }) => {
  const handleConfirm = () => {
    const memberId = localStorage.getItem('memberId');
      if (!memberId) {
        console.error('memberId가 저장되어 있지 않습니다.');
        return;
      }
    const url = `https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/challenge/add/${challengeId}/${memberId}`;
    const requestData = {
      isSuccess: true,
      code: "COMMON200",
      message: "성공입니다.",
      result: {
        challengeId: challengeId,
        memberId: memberId,
        status: "IN_PROGRESS",
        startDate: new Date().toISOString().split("T")[0], // 현재 날짜
      },
    };

    axios
      .post(url, requestData)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
        onClose(); // POST 요청이 성공하면 모달 닫기
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        // 에러 처리
      });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>챌린지 도전 시작!</h2>
        <p>빨간 배지에 더 가까워지고 있어요!</p>
        <button className={styles.closeButton} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

function List() {
  const location = useLocation();
  const { data } = location.state || {}; // 전달된 데이터가 없을 경우를 대비하여 기본값을 설정합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const handleOpenModal = () => {
    if (selectedChallengeId) {
      setIsModalOpen(true);
    } else {
      alert("챌린지를 선택해 주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChallenge = (id) => {
    setSelectedChallengeId(id);
    console.log("Selected Challenge ID:", id);
  };
  const getIconComponent = (category) => {
    switch (category) {
      case "HEALTH":
        return <Run />;
      case "STUDY":
        return <Pen />;
      case "LEISURE":
        return <Dice />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (category) => {
    switch (category) {
      case "HEALTH":
        return "#ffc8c8"; // 예: HEALTH의 배경색
      case "STUDY":
        return "#FFFCBE"; // 예: STUDY의 배경색
      case "LEISURE":
        return "#BEDCFF"; // 예: LEISURE의 배경색
      default:
        return "#ffc8c8"; // 기본 배경색
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "HEALTH":
        return "운동";
      case "STUDY":
        return "공부";
      case "LEISURE":
        return "여가";
      default:
        return category;
    }
  };
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>당신을 위한 챌린지</div>
      <div className={styles.inner_container}>
        {data.result.map((item) => (
          <div
            key={item.challengeId}
            className={`${styles.callenge_listBox_wrapper} ${
              selectedChallengeId === item.challengeId ? styles.selected : ""
            }`}
            onClick={() => handleSelectChallenge(item.challengeId)}
          >
            <div className={styles.challenge_top_listBox}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  className={styles.challenge_top_listBox_icon}
                  style={{
                    backgroundColor: getBackgroundColor(item.challengeCategory),
                  }}
                >
                  {getIconComponent(item.challengeCategory)}
                </div>
                <div className={styles.challenge_top_listBox_text}>
                  <div className={styles.challenge_top_listBox_text_top}>
                    {item.challengeTitle}
                  </div>
                  <div className={styles.challenge_top_listBox_text_bottom}>
                    {getCategoryLabel(item.challengeCategory)}
                  </div>
                </div>
              </div>
              <div className={styles.challenge_top_listBox_time}>
                {item.challengeTime}
              </div>
            </div>
          </div>
        ))}
        <OrangeButton
          text="챌린지 도전하기!"
          width="80%"
          style={{ marginTop: "20px" }}
          onClick={handleOpenModal} // 모달 열기
        />
        {isModalOpen && (
          <Modal onClose={handleCloseModal} challengeId={selectedChallengeId} />
        )}
      </div>
    </div>
  );
}

export default List;
