import React from "react";
import styles from "./community.module.css";
import CommunityImg from "../../assets/images/community.png";

function Community() {
  return (
    <div className="container">
      <img className="container" src={CommunityImg} alt="community"></img>
    </div>
  );
}

export default Community;
