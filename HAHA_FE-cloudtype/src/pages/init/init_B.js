import styles from "./init_B.module.css";
import React from "react";
import {ReactComponent as Logo} from "../../assets/images/logo_orange.svg";


function Init_B(){
    return(
        <div className={styles.container}>
            <Logo />
            <button className={styles.login_button}>로그인</button>
            <button className={styles.join_button}>회원가입</button>
            <button className={styles.forgot_password}>Forgot Password?</button>
            
        </div>
    )
}

export default Init_B;