import React from "react";
import styles from "./index.module.css";
import { Gag, trackColors, gagsData } from "~/features/core";


function GagCellWrap({ track, level, data }) {

  const gagNonOrg = new Gag(track, level, false);
  const gagOrg    = new Gag(track, level, true);

  const gagAttribute = (track==="Toon-Up") ? "heal" : (track==="Lure") ? "accuracy" : "damage";


  return (
    <div className={styles.gagCell}>
      <h4>({level}) {data.name}</h4>
      <div>
        <span>{gagAttribute}:</span>
        <span>{gagNonOrg[gagAttribute]["Base"] || gagNonOrg[gagAttribute]}</span>
        <b className={styles.organicText}>{gagOrg[gagAttribute]["Base"] || gagOrg[gagAttribute]}</b>
      </div>
    </div>
  )
}


export default function CheckGagStatsGrid() {
  return (
    <div className={styles.grid+" custom-scrollbar"}>
      {
        Object.keys(gagsData).map((track, i) => (
          <div className={styles.track} style={{backgroundColor: trackColors[track]}} key={i}>
            <h3>{track}</h3>
            {
              gagsData[track].map((gagData, j) => (
                <GagCellWrap track={track} level={j+1} data={gagData} key={j} />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}