import styles from './styles.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {backendLink, linksDict} from "../../globalConsts";
import {CustomButton} from "../../components";

export const ScoutingDisplay = () => {
    const [teamsMain, setTeamsMain] = useState([])
    const [compareMode, setCompareMode] = useState(false)
    const updateTeamsMain = () => {
        axios.get(backendLink+linksDict.getAllData)
            .then(res => {
                setTeamsMain(res.data.teams)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        updateTeamsMain();
    }, []);
    return (
        <div>
            <div className={styles.reloadContainer}>
                <CustomButton text={"Reload Data"} onClick={updateTeamsMain} />
            </div>
        </div>
    )
}