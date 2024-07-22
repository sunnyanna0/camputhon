import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import eyeIcon from '../../assets/images/eye.png';  // 이미지 경로를 적절히 수정하세요
import { baseURL } from '../../baseURL';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${baseURL}api/member/login`,
        {
          memberEmail: email,
          memberPassword: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.isSuccess) {
        // 로그인 성공 시 memberId를 localStorage에 저장
        localStorage.setItem('memberId', response.data.result.memberId.toString());

        console.log('로그인 성공:', response.data);
        // 로그인 성공 후 홈 페이지로 리디렉션
        navigate('/home'); // navigate 훅을 사용하여 페이지 이동
      } else {
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>환영합니다!</div>
      <div className={styles.innerContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>이메일</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>비밀번호</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={eyeIcon}
              alt="Eye Icon"
              className={styles.eyeIcon}
              onClick={handlePasswordToggle}
            />
          </div>
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
        <div className={styles.signupLink}>
          계정이 없으신가요? <a href="/signup" className={styles.signupLinkText}>회원가입</a> 하러가기
        </div>
      </div>
    </div>
  );
};

export default Login;
