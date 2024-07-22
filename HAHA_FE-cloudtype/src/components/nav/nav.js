import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import Nav1 from "../../assets/images/Nav1.png";
import Nav2 from "../../assets/images/Nav2.png";
import Nav3 from "../../assets/images/Nav3.png";
import Nav4 from "../../assets/images/Nav4.png";
import Nav5 from "../../assets/images/Nav5.png";

function Nav() {
  const [selectedNav, setSelectedNav] = useState(null);

  const handleClick = (nav) => {
    setSelectedNav(nav);
  };

  const getBackgroundColor = (nav) => {
    return selectedNav === nav ? "#ffa451" : "#ffdec2";
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          <div
            className={styles.img_background}
            style={{ backgroundColor: getBackgroundColor("nav1") }}
            onClick={() => handleClick("nav1")}
          >
            <img src={Nav1} alt="Home" className={styles.nav_img} />
          </div>
        </Link>
        <Link to="/calendar" style={{ textDecoration: "none", color: "black" }}>
          <div
            className={styles.img_background}
            style={{ backgroundColor: getBackgroundColor("nav2") }}
            onClick={() => handleClick("nav2")}
          >
            <img src={Nav2} alt="Home" className={styles.nav_img} />
          </div>
        </Link>
        <Link to="/search" style={{ textDecoration: "none", color: "black" }}>
          <div
            className={styles.img_background}
            style={{ backgroundColor: getBackgroundColor("nav3") }}
            onClick={() => handleClick("nav3")}
          >
            <img src={Nav3} alt="Home" className={styles.nav_img} />
          </div>
        </Link>
        <Link
          to="/community"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            className={styles.img_background}
            style={{ backgroundColor: getBackgroundColor("nav4") }}
            onClick={() => handleClick("nav4")}
          >
            <img src={Nav4} alt="Home" className={styles.nav_img} />
          </div>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          <div
            className={styles.img_background}
            style={{ backgroundColor: getBackgroundColor("nav5") }}
            onClick={() => handleClick("nav5")}
          >
            <img src={Nav5} alt="Home" className={styles.nav_img} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
