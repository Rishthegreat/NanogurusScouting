import styles from './styles.module.css'
import {useContext, useRef, useState} from "react";
import {CustomButton} from "../../components";
import axios from "axios";
import {backendLink} from "../../globalConsts";
import {NotificationContext} from "../../contexes/notificationContext";
export const PrematchScouting = () => {
    const [teamNumber, setTeamNumber] = useState(null)
    const [robotHeight, setRobotHeight] = useState(null)
    const [autoPreference, setAutoPreference] = useState({
        red: null,
        blue: null,
    })
    const autoRef = useRef(null)
    const teleopRef = useRef(null)
    const endgameRef = useRef(null)
    const notif = useContext(NotificationContext)
    const submitData = (data) => {
        axios.post(backendLink + "/prematch", data)
            .then((res) => {
                if(res.data.success){
                    notif.success("Data submitted")
                    // Clear form (not working yet) so just reloading
                    window.location.reload();
                } else {
                    notif.error("Data not submitted")
                }
            })
    }
    const onSubmit = () => {
        axios.post(backendLink + "/getName", {number: teamNumber})
            .then((res) => {
                if (res.data.name !== null) {
                    submitData(
                        {
                            number: teamNumber,
                            prematch_data: {
                                autoNotes: autoRef.current.value,
                                autoPreference: autoPreference,
                                teleopNotes: teleopRef.current.value,
                                height: robotHeight,
                                endgameNotes: endgameRef.current.value,
                            }
                        }
                    )
                } else {
                    notif.error("Error: Team not found")
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
                        <textarea ref={autoRef}/>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Auto Preference: </label>
                            <div className={styles.radioSection}>
                                <label>Red Alliance:</label>
                                <div>
                                    <label>
                                        <input type="radio" name="redAuto" value="nearSide"
                                            onChange={() => setAutoPreference({...autoPreference, red: 0})}/>
                                        Near Side
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="redAuto" value="farSide"
                                            onChange={() => setAutoPreference({...autoPreference, red: 1})}/>
                                        Far Side
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="redAuto" value="noPreference"
                                            onChange={() => setAutoPreference({
                                                ...autoPreference,
                                                red: -1
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
                                            onChange={() => setAutoPreference({...autoPreference, blue: 0})}/>
                                        Near Side
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="blueAuto" value="farSide"
                                            onChange={() => setAutoPreference({...autoPreference, blue: 1})}/>
                                        Far Side
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="blueAuto" value="noPreference"
                                            onChange={() => setAutoPreference({
                                                ...autoPreference,
                                                blue: -1
                                            })}/>
                                        No Preference
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formInputDiv}>
                            <label>Tele-Op Notes: </label>
                            <textarea ref={teleopRef}/>
                        </div>
                        <div className={styles.formInputDiv}>
                            <div className={styles.radioSection}>
                            <label>Robot Height</label>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="under12"
                                           onChange={() => setRobotHeight(2)}/>
                                    Under 12 inches
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="under14"
                                           onChange={() => setRobotHeight(1)}/>
                                    Under 14 inches
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="robotHeight" value="tooTall"
                                           onChange={() => setRobotHeight(0)}/>
                                    Too tall
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formInputDiv}>
                        <label>Endgame Notes: </label>
                        <textarea ref={endgameRef}/>
                    </div>
                </div>
                <CustomButton text={'Submit'} onClick={onSubmit}/>
            </div>
        </div>
    )
}