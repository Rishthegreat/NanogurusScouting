import styles from './styles.module.css'
import {useState} from "react";
import {CustomButton} from "../../components";
import axios from "axios";
import {backendLink} from "../../globalConsts";
export const PrematchScouting = () => {
    const [teamNumber, setTeamNumber] = useState(null)
    const [robotHeight, setRobotHeight] = useState(null)
    const [autoPreference, setAutoPreference] = useState({
        red: null,
        blue: null,
    })

    const submitData = (data) => {
        axios.post(backendLink + "/prematch", data)
    }
    const onSubmit = () => {
        axios.post(backendLink + "/getName", {number: teamNumber})
            .then((res) => {
                if (res.data.name !== null) {
                    submitData(
                        {
                            teamNumber: teamNumber,
                            autoNotes: "",
                            autoPreference: autoPreference,
                            teleOpNotes: "",
                            robotHeight: robotHeight,
                            robotNotes: "",
                        }
                    )
                } else {
                    console.log("Team not found")
                }
            })
    }

    return (
        <div>
            <div>
                <h1 className={styles.title}>Prematch</h1>
            </div>
            <div className={styles.formContainer}>
                <div>
                    <div className={styles.formInputDiv}>
                        <label>Team Number: </label>
                        <input type="number" onChange={(e) => setTeamNumber(e.target.value)}/>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Auto Notes: </label>
                        <textarea/>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Auto Preference: </label>
                        <div className={styles.radioSection}>
                            <label>Red Alliance:</label>
                            <div>
                                <label>
                                    <input type="radio" name="redAuto" value="nearSide"
                                           onChange={() => setAutoPreference({...autoPreference, red: "Near Side"})}/>
                                    Near Side
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="redAuto" value="farSide"
                                           onChange={() => setAutoPreference({...autoPreference, red: "Far Side"})}/>
                                    Far Side
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="redAuto" value="noPreference"
                                           onChange={() => setAutoPreference({
                                               ...autoPreference,
                                               red: "No Preference"
                                           })}/>
                                    No Preference
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div className={styles.radioSection}>
                            <label>Blue Alliance:</label>
                            <div>
                                <label>
                                    <input type="radio" name="blueAuto" value="nearSide"
                                           onChange={() => setAutoPreference({...autoPreference, blue: "Near Side"})}/>
                                    Near Side
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="blueAuto" value="farSide"
                                           onChange={() => setAutoPreference({...autoPreference, blue: "Far Side"})}/>
                                    Far Side
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="blueAuto" value="noPreference"
                                           onChange={() => setAutoPreference({
                                               ...autoPreference,
                                               blue: "No Preference"
                                           })}/>
                                    No Preference
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Tele-Op Notes: </label>
                        <textarea/>
                    </div>
                    <div className={styles.formInputDiv}>
                        <div className={styles.radioSection}>
                            <label>Robot Height</label>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="under12"
                                           onChange={() => setRobotHeight(3)}/>
                                    Under 12 inches
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="under14"
                                           onChange={() => setRobotHeight(2)}/>
                                    Under 14 inches
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="tooTall"
                                           onChange={() => setRobotHeight(1)}/>
                                    Too tall
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Robot Notes: </label>
                        <textarea/>
                    </div>
                </div>
                <CustomButton text={'Submit'} onClick={onSubmit}/>
            </div>
        </div>
    )
}