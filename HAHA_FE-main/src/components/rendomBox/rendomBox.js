import React from 'react';
import styles from './rendomBox.module.css';
import {ReactComponent as Clock} from '../../assets/images/clock.svg';
import {ReactComponent as Plus} from '../../assets/images/plusButton.svg';


function RendomBox({content, Icon, time, category}) {
    return (
        <div className={styles.container}>
            <div className={styles.imageBox}>
                <Icon style={{marginLeft: '3px'}}/>
            </div>
            <div className={styles.title}>{content}</div>
            <div className={styles.bottomBox}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Clock style={{marginRight: '2px'}}/>
                    <div className={styles.time}>{time}</div>
                </div>
                <div className={styles.category}>{category}</div>
            </div>
        </div>
    )
}

export default RendomBox;