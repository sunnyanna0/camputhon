import styles from "./init_A.module.css";
import React from "react";
import {ReactComponent as Logo} from "../../assets/images/logo_black.svg";


function Init_A(){
    return(
        <div className={styles.container}>
            <Logo />
        </div>
    )
}

export default Init_A;