import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import profileImage from '../../assets/images/profile_exam.svg'; 
import { ReactComponent as GreenBadgeImage } from '../../assets/images/green.svg';
import { ReactComponent as GrayBadgeImage } from '../../assets/images/gray.svg'; 
import { ReactComponent as RedBadgeImage } from '../../assets/images/red.svg'; 
import { ReactComponent as PurpleBadgeImage } from '../../assets/images/purple.svg'; 
import { ReactComponent as BlueBadgeImage } from '../../assets/images/blue.svg'; 
import axios from 'axios';
import { baseURL } from '../../baseURL';
import Modal from './Modal'; // 모달 컴포넌트 가져오기

const Profile = () => {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    userName: '',
    email: '',
    profileImage: '',
    badges: '',
    upgradeCnt: 0,
    upgradeBadges: '',
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false); // 모달 상태 추가

  const handleLogout = () => {
    setShowLogoutModal(true); // 로그아웃 모달 표시
  };

  const handleConfirmLogout = () => {
    try {
      localStorage.removeItem('memberId');
      navigate('/login');
    } catch (error) {
      console.error('로그아웃에 실패했습니다:', error);
    }
  };

  const handleProfileUpdate = () => {
    navigate('/profileUpdate', { state: { profileData } }); // 프로필 데이터를 상태로 전송
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          console.error('memberId가 저장되어 있지 않습니다.');
          return;
        }

        const response = await axios.get(`${baseURL}api/mypage/get/${memberId}`);
        const result = response.data.result;
        console.log(result);
        setProfileData(result);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const getColor = (color) => {
    switch (color) {
        case 'green':
            return "초록";
        case 'red':
            return "빨강";
        case 'purple':
            return "보라";
        case 'blue':
            return "파랑";
        default:
            return "회색";
    }
  };

  const getBadge = (color) => {
    switch (color) {
      case 'green':
        return <GreenBadgeImage className={styles.badgeImage} />;
      case 'red':
        return <RedBadgeImage className={styles.badgeImage} />;
      case 'purple':
        return <PurpleBadgeImage className={styles.badgeImage} />;
      case 'blue':
        return <BlueBadgeImage className={styles.badgeImage} />;
      default:
        return <GrayBadgeImage className={styles.badgeImage} />;
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>프로필 조회</div>
      <div className={styles.innerContainer}>
        <div className={styles.profileContainer}>
          <img src={profileData.profileImage || profileImage} alt="Profile" className={styles.profileImage} />
          <div className={styles.profileName}>{profileData.memberName}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>내 프로필</div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이름</label>
            <input type="text" className={styles.input} value={profileData.memberName} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이메일</label>
            <input type="email" className={styles.input} value={profileData.email} readOnly />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>획득한 챌린지 배지</div>
          <div className={styles.badgeContainer}>
            {getBadge(profileData.badges)}
          </div>
          <div className={styles.badgeText}>
            챌린지를 {profileData.upgradeCnt}번 더 하면 {getColor(profileData.upgradeBadges)}색 배지를 얻을 수 있어요!
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.linkBlue} onClick={handleProfileUpdate} style={{ cursor: 'pointer' }}>프로필 수정</div>
          <div>
            <span className={styles.linkBlack}>오공챌이란? </span>
            <a href="/description" className={styles.linkBlue}>설명 보러가기</a>
          </div>
          <div className={styles.linkBlue} onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</div>
        </div>
      </div>

      {showLogoutModal && (
        <Modal
          message="로그아웃을 하시겠습니까?"
          onConfirm={handleConfirmLogout}
          onClose={() => setShowLogoutModal(false)} // 모달 닫기
        />
      )}
    </div>
  );
};

export default Profile;
