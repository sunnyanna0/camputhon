import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { ReactComponent as Dumbbel } from "../../assets/images/dumbbell.svg";
import { ReactComponent as Study } from "../../assets/images/study.svg";
import { ReactComponent as Dice_3D } from "../../assets/images/dice_3D.svg";
import { ReactComponent as Profile } from "../../assets/images/profile.svg";
import { ReactComponent as Plus } from "../../assets/images/plus_orange.svg";
import ListBox from "../../components/listBox/listBox";
import RendomBox from "../../components/rendomBox/rendomBox";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { baseURL } from "../../baseURL";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [recommendedChallenges, setRecommendedChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const navigate = useNavigate();

  const handleListBoxClick = (challengeId, status) => {
    if (status === 'COMPLETED') {
      navigate(`/challengeDetail/${challengeId}`);
    } else {
      setSelectedChallengeId(challengeId);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setImageFile(null);
  };

  const handlePhotoZoneClick = () => {
    document.getElementById("imageUpload").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleCompleteButtonClick = async () => {
    if (!imageFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const memberId = localStorage.getItem('memberId');
      if (!memberId) {
        console.error('memberId가 저장되어 있지 않습니다.');
        return;
      }
      if (!selectedChallengeId) {
        console.error('선택된 챌린지 ID가 없습니다.');
        return;
      }
      const response = await axios.post(`${baseURL}api/challenge/complete/${selectedChallengeId}/${memberId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("이미지 업로드 성공:", response.data);
      alert("도전 완료되었습니다!");
      closeModal();
      
      fetchData();
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchData = async () => {
    try {
      const memberId = localStorage.getItem('memberId');
      if (!memberId) {
        console.error('memberId가 저장되어 있지 않습니다.');
        return;
      }
      const response = await axios.get(`${baseURL}api/challenge/get/${memberId}`);
      const data = response.data.result;

      setCurrentChallenges(data.currentChallenges);
      setRecommendedChallenges(data.recommendedChallenges);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getIconByCategory = (category) => {
    switch (category) {
      case "HEALTH":
        return Dumbbel;
      case "STUDY":
        return Study;
      case "LEISURE":
        return Dice_3D;
      default:
        return Plus;
    }
  };

  const getKoreanByCategory = (category) => {
    switch (category) {
      case "HEALTH":
        return "운동";
      case "STUDY":
        return "공부";
      case "LEISURE":
        return "여가";
      default:
        return "운동";
    }
  };

  const getState = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "도전 중";
      case "COMPLETED":
        return "완료";
      default:
        return "도전 중";
    }
  };

  return (
    <div className={styles.home_container}>
      <div className={styles.profile}>
        <Profile />
        <div style={{ width: "30vw" }}>
          <div className={styles.profile_text}>Hello!</div>
          <div className={styles.profile_text}>서하은님</div>
        </div>
      </div>

      <div className={styles.inner_container}>
        <div className={styles.home_title}>Today's challenge</div>
        <div className={styles.challenge_top}>
          <div className={styles.challenge_top_title}>진행중인 챌린지</div>
          <div className={styles.challenge_top_content}>
            {currentChallenges.map((challenge) => (
              <ListBox
                key={challenge.challengeId}
                content={challenge.challengeTitle}
                category={getKoreanByCategory(challenge.challengeCategory)}
                state={getState(challenge.status)}
                onClick={() => handleListBoxClick(challenge.challengeId, challenge.status)}
              />
            ))}
          </div>
        </div>

        <div className={styles.challenge_bottom}>
          <div className={styles.challenge_top_title}>추천 챌린지</div>
          <div className={styles.horizontal_scroll_container}>
            {recommendedChallenges.map((challenge) => (
              <RendomBox
                key={challenge.challengeId}
                content={challenge.challengeTitle}
                Icon={getIconByCategory(challenge.challengeCategory)}
                time={challenge.challengeTime}
                category={getKoreanByCategory(challenge.challengeCategory)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>사진 기록 남기기</h2>
        <div
          className={styles.photozone}
          onClick={handlePhotoZoneClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            height: "150px",
            border: "1px dashed #ccc",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px", 
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // 정사각형 비율 유지
                borderRadius: "10px", // 이미지도 둥글게
              }}
            />
          ) : (
            <Plus />
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.completeButton} onClick={handleCompleteButtonClick}>
          도전 완료하기
        </div>
      </Modal>
    </div>
  );
}

export default Home;
