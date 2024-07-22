import React from "react";
import styles from "./orange_button.module.css";

const OrangeButton = ({ text, width, onClick }) => {
  const buttonStyle = {
    width: width,
  };

  return (
    <button className={styles.button} style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default OrangeButton;
