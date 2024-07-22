import React, { useState } from "react";
import styles from "./profileUpdate.module.css";
import profileImage from "../../assets/images/profile_exam.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";

const ProfileUpdate = () => {
  const location = useLocation();
  const { profileData } = location.state || {};
  const navigate = useNavigate(); // useNavigate 훅 가져오기

  const [name, setName] = useState(profileData?.userName || "서하은");
  const [email, setEmail] = useState(profileData?.email || "haeun@gmail.com");
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const handleSave = async () => {
    try {
      const memberId = localStorage.getItem("memberId");
      if (!memberId) {
        console.error("memberId가 저장되어 있지 않습니다.");
        return;
      }

      const data = {
        memberName: name,
        email: email,
      };

      await axios.patch(
        `https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/mypage/update/${memberId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("프로필이 성공적으로 업데이트되었습니다.");
      setShowModal(true); // 모달 표시
    } catch (error) {
      console.error(
        "프로필 업데이트에 실패했습니다:",
        error.response?.data || error.message
      );
    }
  };

  const handleConfirm = () => {
    navigate("/profile"); // 모달에서 확인 버튼 클릭 시 이동
  };

  const handleClose = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>프로필 수정</div>
      <div className={styles.innerContainer}>
        <div className={styles.profileContainer}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.profileName}>{profileData?.userName}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>내 프로필</div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이름</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이메일</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.links}>
          <button className={styles.button} onClick={handleSave}>
            프로필 수정
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          message="프로필이 성공적으로 업데이트되었습니다. 확인 버튼을 클릭하면 프로필 페이지로 이동합니다."
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ProfileUpdate;
