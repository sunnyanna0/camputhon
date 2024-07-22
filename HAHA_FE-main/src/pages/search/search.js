import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";
import exercise from "../../assets/images/exercise.png";
import study from "../../assets/images/study.png";
import relaxing from "../../assets/images/relaxing.png"; // 오타 수정
import OrangeButton from "../../components/button/orange_button";
import axios from "axios";

function Search() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleButtonClick = () => {
    if (selectedCategory && selectedDuration) {
      const url = `https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/challenge/search?category=${selectedCategory}&time=${selectedDuration}`;
      axios
        .get(url)
        .then((response) => {
          console.log("Data fetched successfully:", response.data);
          navigate("/list", { state: { data: response.data } });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      alert("카테고리와 공강시간을 선택해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>챌린지 찾으러 가기</div>
      <div className={styles.inner_container}>
        <div className={styles.inner_text}>카테고리</div>
        <div className={styles.category_wrapper}>
          <img
            src={exercise}
            alt="Exercise"
            className={`${styles.category} ${
              selectedCategory === "HEALTH" ? styles.selected : ""
            }`}
            onClick={() => setSelectedCategory("HEALTH")}
          />
          <img
            src={study}
            alt="Study"
            className={`${styles.category} ${
              selectedCategory === "STUDY" ? styles.selected : ""
            }`}
            onClick={() => setSelectedCategory("STUDY")}
          />
          <img
            src={relaxing}
            alt="Relaxing"
            className={`${styles.category} ${
              selectedCategory === "LEISURE" ? styles.selected : ""
            }`}
            onClick={() => setSelectedCategory("LEISURE")}
          />
        </div>
        <div className={styles.inner_text}>공강시간</div>
        <div className={styles.duration_wrapper}>
          <div
            className={`${styles.duration} ${
              selectedDuration === "30m" ? styles.selected : ""
            }`}
            style={{ backgroundColor: "#FFC692" }}
            onClick={() => setSelectedDuration("30m")}
          >
            30m
          </div>
          <div
            className={`${styles.duration} ${
              selectedDuration === "1h" ? styles.selected : ""
            }`}
            style={{ backgroundColor: "#FEB36F" }}
            onClick={() => setSelectedDuration("1h")}
          >
            1h
          </div>
          <div
            className={`${styles.duration} ${
              selectedDuration === "2h" ? styles.selected : ""
            }`}
            style={{ backgroundColor: "#FFA350" }}
            onClick={() => setSelectedDuration("2h")}
          >
            2h
          </div>
          <div
            className={`${styles.duration} ${
              selectedDuration === "3h" ? styles.selected : ""
            }`}
            style={{ backgroundColor: "#FF8D24" }}
            onClick={() => setSelectedDuration("3h")}
          >
            3h+
          </div>
        </div>
        <OrangeButton text="찾아보기" width="80%" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default Search;
