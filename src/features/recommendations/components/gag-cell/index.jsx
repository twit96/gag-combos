import { useDispatch } from "react-redux";
import { setGagModal } from "~/features/recommendations";
import styles from "./index.module.css";
import { trackColors } from "~/features/core";


export function OrganicIcon() {
  return (
    <img 
      className={styles.organicIcon}
      src="/img/gags/icon-organic-mini.png"
      alt={"Organic Icon"} 
    />
  );
}


function GagImageAndName({ gag }) {
  return (
    <div className={styles.gagIconNameWrap}>
      <img 
        className={styles.gagIcon}
        src={gag.image} 
        alt={gag.name} 
      />
      <b className={styles.gagName}>{gag.name}</b>
    </div>
  );
}


function GagStats({ gag }) {
  return (
    <>
      <div className={styles.gagStats}>
        <b className={styles.statTitle}>Base</b>
        <span><b>Dmg:</b> {gag.damage["Base"]}</span>
        <span><b>Acc:</b> {Math.round(gag.accuracy["Base"]*100)}%</span>
      </div>
      <div className={styles.gagStats}>
        <b className={styles.statTitle}>Attack</b>
        <span><b>Dmg:</b> {gag.damage["Attack"]}</span>
        <span><b>Acc:</b> {Math.round(gag.accuracy["Attack"]*100)}%</span>
      </div>
    </>
  );
}


export default function GagCell({ gag, expanded=false }) {
  const dispatch = useDispatch();

  return (
    <button 
      title={`View details about "${gag.organic ? "Organic " : ""}${gag.name}"`}
      className={`btn ${styles.gagCell} ${expanded ? styles.expanded : ""} ${gag.organic ? styles.org : ""}`}
      style={{background: (trackColors[gag.track] || "")}}
      onClick={() => {
        dispatch(setGagModal(
          { 
            track: gag.track, 
            level: gag.level, 
            org: gag.organic,
            comboStats: {
              accuracy: gag.accuracy,
              damage: gag.damage
            }
          }
        ));
      }}
    >
      {(gag.organic) ? <OrganicIcon /> : null}
      <div className={`custom-scrollbar ${styles.gagCellContent}`}>
        <GagImageAndName gag={gag} />
        <GagStats gag={gag} />
      </div>
    </button>
  );
}
