import React from 'react';
import styles from './description.module.css';

const Description = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>오공챌이란?</div>
      <div className={styles.innerContainer}>
        <br></br><br></br><br></br>
        <p>
          오공챌은 ‘오늘의 공강 챌린지’의 줄임말로, 공강 시간을 활용해 다양한 자기 개발 및 취미 생활을 즐길 수 있도록 하는 챌린지 서비스입니다.
        </p><br></br>
        <p>
          다양한 <span className={styles.highlight}>카테고리</span>와 <span className={styles.highlight}>맞춤형 추천</span>으로 당신의 공강 시간을 더욱 알차게 만들어보세요. 지금 바로 챌린지에 도전하고, 성취감을 만끽하며 친구들과 공유하세요!
        </p>
        <div className={styles.badgeSection}>
          <div className={styles.badgeItem}>
            <img src={require('../../assets/images/gray.svg').default} alt="기본 배지" className={styles.badgeImage} />
            <span className={styles.badgeText}>기본 배지{"\n"}.</span>
          </div>
          <div className={styles.badgeItem}>
            <img src={require('../../assets/images/green.svg').default} alt="챌린지 5번 이상" className={styles.badgeImage} />
            <span className={styles.badgeText}>챌린지{"\n"}5번 이상</span>
          </div>
          <div className={styles.badgeItem}>
            <img src={require('../../assets/images/blue.svg').default} alt="챌린지 10번 이상" className={styles.badgeImage} />
            <span className={styles.badgeText}>챌린지{"\n"}10번 이상</span>
          </div>
          <div className={styles.badgeItem}>
            <img src={require('../../assets/images/purple.svg').default} alt="챌린지 20번 이상" className={styles.badgeImage} />
            <span className={styles.badgeText}>챌린지{"\n"}20번 이상</span>
          </div>
          <div className={styles.badgeItem}>
            <img src={require('../../assets/images/red.svg').default} alt="챌린지 50번 이상" className={styles.badgeImage} />
            <span className={styles.badgeText}>챌린지{"\n"}50번 이상</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
