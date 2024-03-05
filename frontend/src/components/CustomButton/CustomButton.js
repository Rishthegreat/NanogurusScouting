import styles from './styles.module.css'
export const CustomButton = ({text, onClick}) => {
    return (
        <button className={styles.btn} onClick={onClick}>{text}</button>
    )
}