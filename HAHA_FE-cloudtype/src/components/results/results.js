import React, { useState } from "react";
import styles from "./results.module.css";
import { ReactComponent as Run } from "../../components/images/run.svg";

function Results({ results, onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelect(id); // 선택된 ID를 부모 컴포넌트로 전달
    console.log(id);
  };

  return (
    <>
      {results &&
        results.map((item) => (
          <div
            key={item.challengeId}
            className={`${styles.callenge_listBox_wrapper} ${
              selectedId === item.challengeId ? styles.selected : ""
            }`}
            onClick={() => handleSelect(item.challengeId)}
          >
            <div className={styles.challenge_top_listBox}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.challenge_top_listBox_icon}>
                  <Run />
                </div>
                <div className={styles.challenge_top_listBox_text}>
                  <div className={styles.challenge_top_listBox_text_top}>
                    {item.challengeTitle}
                  </div>
                  <div className={styles.challenge_top_listBox_text_bottom}>
                    {item.challengeCategory}
                  </div>
                </div>
              </div>
              <div className={styles.challenge_top_listBox_time}>
                {item.challengeTime}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Results;
