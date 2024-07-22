import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가된 부분
import styles from './signup.module.css';
import profileImagePlaceholder from '../../assets/images/profile.JPG'; // 프로필 이미지 경로를 적절히 수정하세요
import eyeIcon from '../../assets/images/eye.png'; // 눈 아이콘 경로를 적절히 수정하세요
import {ReactComponent as Profile } from '../../assets/images/profile_exam.svg';

const Signup = () => {
  const [profileImage, setProfileImage] = useState();
  const [formData, setFormData] = useState({
    memberName: '',
    memberEmail: '',
    memberPassword: '',
    memberPasswordConfirm: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 추가된 부분

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.memberPassword !== formData.memberPasswordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        'https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/member/signup',
        formData
      );
      console.log(response.data);
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      setError('이미 존재하는 아이디입니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>회원가입</div>
      <form className={styles.innerContainer} onSubmit={handleSubmit}>
        <div className={styles.profileContainer}>
          {profileImage ? <img src={profileImage} alt="Profile" className={styles.profileImage} /> : <Profile className={styles.profileImage} />}
          
          <label htmlFor="fileInput" className={styles.fileInputLabel}>사진 선택</label>
          <input 
            type="file" 
            id="fileInput"
            accept="image/*" 
            className={styles.fileInput} 
            onChange={handleImageChange} 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="memberName" className={styles.label}>이름</label>
          <input 
            type="text" 
            id="memberName" 
            className={styles.input} 
            placeholder="이름을 입력해주세요." 
            value={formData.memberName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="memberEmail" className={styles.label}>이메일</label>
          <input 
            type="email" 
            id="memberEmail" 
            className={styles.input} 
            placeholder="이메일을 입력해주세요." 
            value={formData.memberEmail}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="memberPassword" className={styles.label}>비밀번호</label>
          <div className={styles.passwordContainer}>
            <input 
              type="password" 
              id="memberPassword" 
              className={styles.input} 
              value={formData.memberPassword}
              onChange={handleChange}
            />
            <img src={eyeIcon} alt="Eye Icon" className={styles.eyeIcon} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="memberPasswordConfirm" className={styles.label}>비밀번호 확인</label>
          <div className={styles.passwordContainer}>
            <input 
              type="password" 
              id="memberPasswordConfirm" 
              className={styles.input} 
              value={formData.memberPasswordConfirm}
              onChange={handleChange}
            />
            <img src={eyeIcon} alt="Eye Icon" className={styles.eyeIcon} />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.signupButton}>회원가입</button>
        <div className={styles.loginLink}>
          계정이 있으신가요? <a href="/login" className={styles.loginLinkText}>로그인</a> 하러가기
        </div>
      </form>
    </div>
  );
};

export default Signup;
