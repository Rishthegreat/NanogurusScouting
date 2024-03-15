import styles from "./styles.module.css";
import { useContext, useRef, useState } from "react";
import { CustomButton } from "../../components";
import axios from "axios";
import { backendLink } from "../../globalConsts";
import { NotificationContext } from "../../contexes/notificationContext";

export const MatchScouting = () => {
  const [teamNumber, setTeamNumber] = useState(null);
  const [backdropAuto, setBackdropAuto] = useState(null);
  const [backdropTele, setBackdropTele] = useState(null);
  const [backstageAuto, setBackstageAuto] = useState(null);
  const [backstageParking, setBackstageParking] = useState(null);
  const [backstageTele, setBackstageTele] = useState(null);
  const [coneStackTele, setConeStackTele] = useState(null);
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
  const date = new Date();

  const notif = useContext(NotificationContext);
  const submitData = (data) => {
    axios.post(backendLink + "/match", data).then((res) => {
      if (res.data.success) {
        notif.success("Data submitted");
        // Clear form
        setTeamNumber(null);
        setBackdropAuto(null);
        setBackdropTele(null);
        setBackstageAuto(null);
        setBackstageParking(null);
        setBackstageTele(null);
        setConeStackTele(null);
        setLines(null);
        setMosaics(null);
        setPlane(null);
        setPurplePixel(null);
        setRigging(null);
        setTeamElement(null);
        setYellowPixel(null);
        setAutoStart(null);
        setAlliance(null);
        notesRef.current.value = "";
      } else {
        notif.error("Data not submitted");
      }
    });
  };
  const onSubmit = () => {
    axios.post(backendLink + "/getName", { number: teamNumber }).then((res) => {
      if (res.data.name !== null) {
        submitData({
          number: teamNumber,
          match_data: {
            backdropAuto: backdropAuto,
            backdropTele: backdropTele,
            backstageAuto: backstageAuto,
            backstageParking: backstageParking,
            backstageTele: backstageTele,
            coneStackTele: coneStackTele,
            date: date.getDate,
            lines: lines,
            mosiacs: mosaics,
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
      <div className={styles.formContainer}>
        <div>
          <div className={styles.formInputDiv}>
            <label>Team Number: </label>
            <input
              type="number"
              onChange={(e) => setTeamNumber(e.target.value)}
            />
          </div>

          <div className={styles.radioSection}>
            <label>Alliance Color:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  onChange={() =>
                    setAlliance("red")
                  }
                />
                Red
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  onChange={() =>
                    setAlliance("blue")
                  }
                />
                Blue
              </label>
            </div>
          </div>



          <div className={styles.radioSection}>
            <label>Starting Side:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="autoStart"
                  value="close"
                  onChange={() =>
                    setAutoStart("close")
                  }
                />
                Close to the Backdrop
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="autoStart"
                  value="far"
                  onChange={() =>
                    setAutoStart("far")
                  }
                />
                Far from the Backdrop
              </label>
            </div>
          </div>

          <label for="teamElement">Does the team have a game element?</label>
          <input
            type="checkbox"
            id="teamElement"
            name="teamElement"
            value="1"
            className={styles.checkbox}
            onChange={() => setTeamElement(alliance === '0' ? '1' : '0')}
          />
          <br></br>
          <label for="backstageParking">
            Did the robot park in the backstage?
          </label>
          <input
            type="checkbox"
            id="backstageParking"
            name="backstageParking"
            value="1"
            className={styles.checkbox}
          />{" "}
          <br></br>
          <label for="purplePixel">
            Did the team place the purple pixel on the right spike?
          </label>
          <input
            type="checkbox"
            id="purplePixel"
            name="purplePixel"
            value="1"
            className={styles.checkbox}
          />
          <br></br>
          <label for="yellowPixel">
            Did the team place the yellow pixel above the correct april tag?
          </label>
          <input
            type="checkbox"
            id="yellowPixel"
            name="yellowPixel"
            value="1"
            className={styles.checkbox}
          />{" "}
          <br></br>

          <br />
          <CustomButton text={"Submit"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
