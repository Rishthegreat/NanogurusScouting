import styles from './styles.module.css'
import {linksDict} from "../../globalConsts";
import {Link} from "react-router-dom";

export const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.navContainer}>
                <p className={styles.title}>NanoGurus Scouting</p>
                <div className={styles.linksContainer}>
                    <Link to={linksDict.prematch} className={styles.link}>Prematch Scouting</Link>
                    <Link to={linksDict.match} className={styles.link}>Match Scouting</Link>
                    <Link to={linksDict.display} className={styles.link}>Scouting Display</Link>
                </div>
            </div>
        </div>
    )
}