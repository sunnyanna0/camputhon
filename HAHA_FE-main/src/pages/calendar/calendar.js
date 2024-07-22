import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import styles from "./calendar.module.css";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { ReactComponent as Run } from "../../components/images/run.svg";
import { ReactComponent as Pen } from "../../components/images/pencil.svg";
import { ReactComponent as Dice } from "../../components/images/dice.svg";
import { useNavigate } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend, Title);

function CustomCalendar() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [challengeCount, setChallengeCount] = useState({});
  const [activeButton, setActiveButton] = useState("challenge");
  const [showGraph, setShowGraph] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [pieData, setPieData] = useState({
    labels: ["HEALTH", "STUDY", "LEISURE"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  const formatDay = (_, date) => date.getDate(); // locale을 사용하지 않음

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    rotation: -90,
    circumference: 180,
  };

  const fetchChallengesAndRatio = (date) => {
    const memberId = 2;
    const challengeUrl = `https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/challenge/get/calendar?date=${date}&memberId=${memberId}`;
    const ratioUrl = `https://port-0-haha-be-lytx9n86c2df9578.sel4.cloudtype.app/api/ratio/${memberId}`;

    axios
      .get(challengeUrl)
      .then((response) => {
        if (response.data.isSuccess) {
          const challengesData = response.data.result || [];
          setChallenges(challengesData);

          // 날짜별 챌린지 개수 업데이트
          setChallengeCount((prevCount) => ({
            ...prevCount,
            [date]: challengesData.length,
          }));
          console.log(challengeCount);
        } else {
          setChallenges([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
      });

    axios
      .get(ratioUrl)
      .then((response) => {
        if (response.data.isSuccess) {
          const { healthRatio, studyRatio, leisureRatio } =
            response.data.result;
          console.log(response.data.result);

          setPieData({
            labels: ["Health", "Study", "Leisure"],
            datasets: [
              {
                data: [
                  parseFloat(healthRatio),
                  parseFloat(studyRatio),
                  parseFloat(leisureRatio),
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching ratio data:", error);
      });
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setShowGraph(buttonType === "categories");
  };

  // const handleSelectChallenge = (id) => {
  //   setSelectedChallengeId(id);
  //   console.log("Selected Challenge ID:", id);
  // };

  const handleSelectChallenge = (challengeId) => {
    // if (status === 'COMPLETED') {
      navigate(`/challengeDetail/${challengeId}`);
    // } 
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
    console.log("Selected date:", formattedDate); // 변환된 날짜를 콘솔에 출력
    fetchChallengesAndRatio(formattedDate);
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

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>Calendar</div>
      <div className={styles.innerContainer}>
        <Calendar
          className={styles.calendar}
          onChange={handleDateChange} // handleDateChange를 onChange에 설정
          value={value}
          formatDay={formatDay}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const dateStr = date.toISOString().split("T")[0];
              const count = challengeCount[dateStr] || 0;
              if (count > 2) return "react-calendar__tile--more-than-2";
              if (count > 1) return "react-calendar__tile--2";
              if (count > 0) return "react-calendar__tile--1";
            }
            return date.getTime() === value.getTime()
              ? "react-calendar__tile--active"
              : null;
          }}
        />
        <div className={styles.buttons}>
          <button
            className={`${styles.challengeButton} ${
              activeButton === "challenge" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("challenge")}
          >
            Challenge
          </button>
          <button
            className={`${styles.categoriesButton} ${
              activeButton === "categories" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("categories")}
          >
            Categories
          </button>
        </div>
        <div className={styles.scrollableContainer}>
          {showGraph ? (
            <div className={styles.chartContainer}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          ) : (
            challenges.map((item) => (
              <div
                key={item.challengeId}
                className={`${styles.callenge_listBox_wrapper} ${
                  selectedChallengeId === item.challengeId
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleSelectChallenge(item.challengeId)}
              >
                <div className={styles.challenge_top_listBox}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.challenge_top_listBox_icon}
                      style={{
                        backgroundColor: getBackgroundColor(
                          item.challengeCategory
                        ),
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;