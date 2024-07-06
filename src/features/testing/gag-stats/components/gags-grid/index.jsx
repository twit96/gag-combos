import React from "react";
import styles from "./index.module.css";
import { Gag, trackColors, gagsData } from "~/features/core";

function GagCell({ track, level, organic }) {

  const gagInstance = new Gag(track, level, organic);

  return (
    <div className={`${styles.gagCell} ${gagInstance.organic ? styles.gagCellOrganic : styles.gagCellNonOrganic}`}>

      {
        ["Toon-Up", "Lure"].includes(track) &&
        <div>
          <b>Accuracy</b>
          <span>Base: {gagInstance.accuracy["Base"]}</span>
          <span>Attack: {gagInstance.accuracy["Attack"]}</span>
        </div>
      }
      {
        !["Toon-Up", "Lure"].includes(track) &&
        <div>
          <b>Damage</b>
          <span>Base: {gagInstance.damage["Base"]}</span>
          <span>Attack: {gagInstance.damage["Attack"]}</span>
        </div>
      }
    </div>
  );
}

function GagCellWrap({ track, level, data }) {
  return (
    <div className={styles.gagCellWrap}>
      <h4>
        <span>{data.name}</span>
        <span>({level})</span>
      </h4>
      <GagCell track={track} level={level} organic={false} />
      <GagCell track={track} level={level} organic={true} />
    </div>
  )
}


export default function CheckGagStatsGrid() {
  return (
    <div className={styles.grid}>
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