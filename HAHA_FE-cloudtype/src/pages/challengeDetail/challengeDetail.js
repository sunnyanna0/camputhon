import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './challengeDetail.module.css';
import { baseURL } from '../../baseURL';
import { ReactComponent as Dumbbel } from "../../assets/images/dumbbell.svg";
import { ReactComponent as Study } from "../../assets/images/study.svg";
import { ReactComponent as Dice_3D } from "../../assets/images/dice_3D.svg";
import { ReactComponent as Profile } from "../../assets/images/profile.svg";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const fetchChallengeDetail = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          console.error('memberId가 저장되어 있지 않습니다.');
          return;
        }
        const response = await axios.get(`${baseURL}api/challenge/get/detail/${challengeId}/${memberId}`);
        setChallenge(response.data.result);
      } catch (error) {
        console.error('챌린지 상세 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchChallengeDetail();
  }, [challengeId]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  const getIconByCategory = (category) => {
    switch (category) {
      case "HEALTH":
        return <Dumbbel className={styles.icon} />;
      case "STUDY":
        return <Study className={styles.icon} />;
      case "LEISURE":
        return <Dice_3D className={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <Profile />
          <div style={{ width: "30vw" }}>
            <div className={styles.profile_text}>Hello!</div>
            <div className={styles.profile_text}>서하은님</div>
          </div>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>진행 완료 챌린지</h1>
          {/* <div className={styles.challengeStatus}>완료</div> */}
        </div>
        <div className={styles.challengeDetail}>
          <div className={styles.challengeInfoBox}>
            <div className={styles.challengeTitle}>{challenge.challengeTitle}</div>
            <p>{challenge.description}</p>
          </div>
          <h2 className={styles.subtitle}>사진 돌아보기</h2>
          <div className={styles.imageContainer}>
            {challenge.image && <img src={challenge.image} alt="Challenge" className={styles.challengeImage} />}
          </div>
        </div>
        <center>
        <button className={styles.backButton} onClick={() => navigate(-1)}>다른 챌린지 확인하기</button>
        </center>
      </div>
    </div>
  );
};

export default ChallengeDetail;
