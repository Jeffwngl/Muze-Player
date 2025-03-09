import { useState } from "react";
import styles from "./PlayPause.module.css";
import Icon from "./icons/Export";

const playPause = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <div className={styles.player}>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <button id="play">
                        <Icon className={styles.play} name="play" size={20} color="#5c5c5c" pad="0 5px"></Icon>
                    </button>             
                </div>
            </div>
        </div>
    )
}