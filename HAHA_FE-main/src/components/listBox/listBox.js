import React from "react";
import styles from "./listBox.module.css";
import { ReactComponent as Pen } from '../images/pencil.svg';
import { ReactComponent as Run } from '../images/run.svg';
import { ReactComponent as Dice } from '../images/dice.svg';

// 각 카테고리와 관련된 아이콘을 반환하는 함수
const getIcon = (category) => {
    switch (category) {
        case '운동':
            return <Run />;
        case '공부':
            return <Pen />;
        case '여가':
            return <Dice />;
        default:
            return null;
    }
};

function ListBox({ content, category, state, onClick }) {
    // 상태에 따라 스타일을 설정하는 객체
    const stateStyle = state === '완료'
        ? {}
        : {
            backgroundColor: '#FFFCBE',
            color: '#FFA451'
        };

    // 카테고리 값에 따라 스타일을 설정하는 함수
    const getStateStyle = (category) => {
        switch (category) {
            case '운동':
                return { backgroundColor: '#FFC8C8' };
            case '공부':
                return { backgroundColor: '#FFFCBE' };
            case '여가':
                return { backgroundColor: '#BEDCFF' };
            default:
                return { color: 'black', backgroundColor: 'transparent' };
        }
    };

    return (
        <div className={styles.challenge_top_listBox} onClick={onClick}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.challenge_top_listBox_icon_pen} style={{ ...getStateStyle(category) }}>
                    {getIcon(category)} 
                </div>
                <div className={styles.challenge_top_listBox_text}>
                    <div className={styles.challenge_top_listBox_text_top}>{content}</div>
                    <div className={styles.challenge_top_listBox_text_bottom}>{category}</div>
                </div>
            </div>
            <div className={styles.challenge_top_listBox_state} style={stateStyle}>
                {state}
            </div>
        </div>
    );
}

export default ListBox;
