import styles from './styles.module.css'
import {linksDict} from "../../globalConsts";

export const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.navContainer}>
                <p className={styles.title}>NanoGurus Scouting</p>
                <div className={styles.linksContainer}>
                    <a href={linksDict.prematch} className={styles.link}>Prematch Scouting</a>
                    <a href={linksDict.display} className={styles.link}>Scouting Display</a>
                </div>
            </div>
        </div>
    )
}