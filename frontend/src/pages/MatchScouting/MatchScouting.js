import styles from "./styles.module.css";
import { useContext, useRef, useState } from "react";
import { CustomButton } from "../../components";
import axios from "axios";
import {backendLink, linksDict} from "../../globalConsts";
import { NotificationContext } from "../../contexes/notificationContext";

export const MatchScouting = () => {
  const [teamNumber, setTeamNumber] = useState(null);
  const [backdropAuto, setBackdropAuto] = useState(null);
  const [backdropTele, setBackdropTele] = useState(null);
  const [backstageAuto, setBackstageAuto] = useState(null);
  const [backstageParking, setBackstageParking] = useState(null);
  const [backstageTele, setBackstageTele] = useState(null);
  const [pixelStackTele, setpixelStackTele] = useState(null);
  const [lines, setLines] = useState(null);
  const [mosaics, setMosaics] = useState(null);
  const [plane, setPlane] = useState(null);
  const [purplePixel, setPurplePixel] = useState(null);
  const [rigging, setRigging] = useState(null);
  const [teamElement, setTeamElement] = useState(null);
  const [yellowPixel, setYellowPixel] = useState(null);
  const [autoStart, setAutoStart] = useState(null);
  const [alliance, setAlliance] = useState(null);

  const notesRef = useRef(null);
  const date = new Date().toLocaleDateString("en-US")

  const notif = useContext(NotificationContext);
  const submitData = (data) => {
    axios.post(backendLink + linksDict.matchPost, data).then((res) => {
      if (res.data.success) {
        notif.success("Data submitted");
        // Clear form (not working yet) so just reload page)
        window.location.reload();
      } else {
        notif.error("Data not submitted");
      }
    });
  };
  const onSubmit = () => {
    axios.post(backendLink + linksDict.getName, { number: teamNumber }).then((res) => {
      if (res.data.name !== null) {
        submitData({
          number: teamNumber,
          match_data: {
            backdropAuto: backdropAuto,
            backdropTele: backdropTele,
            backstageAuto: backstageAuto,
            backstageParking: backstageParking,
            backstageTele: backstageTele,
            pixelStackTele: pixelStackTele,
            date: date,
            lines: lines,
            mosaics: mosaics,
            notes: notesRef.current,
            plane: plane,
            purplePixel: purplePixel,
            rigging: rigging,
            teamElement: teamElement,
            yellowPixel: yellowPixel,
            autoStart: autoStart,
            alliance: alliance,
          }
        });
      } else {
        notif.error("Error: Team not found");
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>Match Scouting</h1>
      </div>
      <div className={styles.formsContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Autonomous</h2>
          <div>
            <div className={styles.formInputDiv}>
              <label>Team Number: </label>
              <input type="number" onChange={(e) => setTeamNumber(e.target.value)}/>
            </div>

            <div className={styles.radioSection}>
              <label>Alliance Color:</label>
              <div>
                <label>
                  <input type="radio" name="color" value="red" onChange={() => setAlliance("red")}/>
                  Red
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="color" value="blue" onChange={() => setAlliance("blue")}/>
                  Blue
                </label>
              </div>
            </div>
            <div className={styles.radioSection}>
              <label>Starting Side:</label>
              <div>
                <label>
                  <input type="radio" name="autoStart" value="close" onChange={() => setAutoStart(0)}/>
                  Close to the Backdrop
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="autoStart" value="far" onChange={() => setAutoStart(1)}/>
                  Far from the Backdrop
                </label>
              </div>
            </div>

            <label htmlFor="teamElement">Does the team have a game element?</label>
            <input type="checkbox" id="teamElement" name="teamElement" value="1" className={styles.checkbox}
                   onChange={() => setTeamElement(prev => prev === 0 ? 1 : 0)}
            />
            <br></br>
            <label htmlFor="backstageParking">
              Did the robot park in the backstage?
            </label>
            <input type="checkbox" id="backstageParking" name="backstageParking" value="1"
                   className={styles.checkbox}/>{" "}
            <br></br>
            <label htmlFor="purplePixel">
              Did the team place the purple pixel on the right spike?
            </label>
            <input type="checkbox" id="purplePixel" name="purplePixel" value="1" className={styles.checkbox}
                   onChange={() => setPurplePixel(prev => prev === 0 ? 1 : 0)}/>
            <br></br>
            <label htmlFor="yellowPixel">
              Did the team place the yellow pixel above the correct april tag?
            </label>
            <input type="checkbox" id="yellowPixel" name="yellowPixel" value="1" className={styles.checkbox}
                   onChange={() => setYellowPixel(prev => prev === 0 ? 1 : 0)}/>{" "}
          </div>
          <div className={styles.formInputDiv}>
            <label>Pixels On Backdrop (Excluding Yellow): </label>
            <input value={0} type="number" onChange={(e) => setBackdropAuto(e.target.value)}/>
          </div>
            <div className={styles.formInputDiv}>
                <label>Pixels in Backstage: </label>
                <input value={0} type="number" onChange={(e) => setBackstageAuto(e.target.value)}/>
            </div>
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Tele-Op</h2>
          <div>
            <div className={styles.formInputDiv}>
              <label>Pixels on Backdrop: </label>
              <input value={0} type="number" onChange={(e) => setBackdropTele(e.target.value)}/>
            </div>

            <div className={styles.formInputDiv}>
              <label>Pixels in Backstage: </label>
              <input value={0} type="number" onChange={(e) => setBackstageTele(e.target.value)}/>
            </div>

            <div className={styles.formInputDiv}>
              <label>Number of Mosaics</label>
              <input value={0} type="number" onChange={(e) => setMosaics(e.target.value)}/>
            </div>

            <div className={styles.formInputDiv}>
              <div className={styles.radioSection}>
                <label>Set Line Reached</label>
                <div>
                  <label>
                    <input type={"radio"} name={"setLines"} value={"noLine"} onChange={() => setLines(0)}/>
                    No Line
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"setLines"} value={"Line1"} onChange={() => setLines(1)}/>
                    Line 1
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"setLines"} value={"Line2"} onChange={() => setLines(2)}/>
                    Line 2
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"setLines"} value={"Line3"} onChange={() => setLines(3)}/>
                    Line 3
                  </label>
                </div>
              </div>
            </div>
            <label htmlFor="pixelStackTele">Did Robot Pick From Pixel Stack?</label>
            <input type="checkbox" id="pixelStackTele" name="pixelStackTele" value="1" className={styles.checkbox}
                   onChange={() => setpixelStackTele(prev => prev === 0 ? 1 : 0)}/>
          </div>
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Endgame</h2>
          <div>
            <div className={styles.formInputDiv}>
              <div className={styles.radioSection}>
                <label>Plane Location</label>
                <div>
                  <label>
                    <input type={"radio"} name={"plane"} value={"noPlane"} onChange={() => setPlane(0)}/>
                    No Zone
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"plane"} value={"Plane1"} onChange={() => setPlane(1)}/>
                    Zone 1
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"plane"} value={"Plane2"} onChange={() => setPlane(2)}/>
                    Zone 2
                  </label>
                </div>
                <div>
                  <label>
                    <input type={"radio"} name={"plane"} value={"Plane3"} onChange={() => setPlane(3)}/>
                    Zone 3
                  </label>
                </div>
              </div>
            </div>

              <label htmlFor={'rigging'}>Did the Robot Rig?</label>
                <input type="checkbox" id="rigging" name="rigging" value="1" className={styles.checkbox}
                         onChange={() => setRigging(prev => prev === 0 ? 1 : 0)}/>
          </div>
        </div>
        <div className={styles.formContainer}>
            <h2 className={styles.sectionTitle}>Notes</h2>
            <div className={styles.formInputDiv}>
                <label>Notes: </label>
                <textarea ref={notesRef}/>
            </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}>
        <CustomButton text={"Submit"} onClick={onSubmit}/>
      </div>
    </div>
  );
};
