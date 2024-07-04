import React from "react";
import { useSelector } from "react-redux";
import { Gag } from "~/features/core";
import styles from "./index.module.css";


export default function HoverBox() {
  const hoveredGag = useSelector((state) => state.calculator.gag.hoveredGag);

  const gag = hoveredGag ? new Gag(
    hoveredGag.track,
    hoveredGag.level,
    hoveredGag.organic
  ) : null;

  let statTitle;
  let statVal;
  let affectsText;
  if (gag) {
    if (gag.track === "Toon-Up") { 
      statTitle = "Heal" ;
      statVal = gag.heal;
    } else if (gag.track === "Lure") { 
      statTitle = "Lure";
      statVal = gag.stun;
    } else { 
      statTitle = "Damage";
      statVal = gag.damage["Base"]; 
    }
    if (gag.track === "Toon-Up") {
      affectsText = gag.targetsMulti ? "All Toons" : "Single Toon";
    } else {
      affectsText = gag.targetsMulti ? "All Cogs" : "Single Cog";
    }
  }

  const isOrganic = gag && gag.organic;

  return (
    <div className={`${styles.hoverBox} ${isOrganic ? styles.organic : ""}`}>
      {
        gag ? (
          <>
            <div className={styles.hoverBoxOverview}>
              <h4 className={styles.name}>
                {gag.name}
                {
                  isOrganic && (
                    <><br />(Organic)</>
                  )
                }
              </h4>
              <div className={styles.imageWrap}>
                <img 
                  className={styles.gagImage}
                  src={gag.image}
                  alt={gag.name}
                />
                {
                  isOrganic && (
                    <img 
                      className={styles.organicIcon}
                      src="/img/gags/icon-organic-mini.png"
                      alt="Organic Icon"
                    />
                  )
                }
              </div>
            </div>
            <div className={styles.hoverBoxStats}>
              <span><b>Accuracy:</b> {Math.trunc(gag.accuracy["Base"]*100)+"%"}</span>
              <span><b>{statTitle}:</b> {statVal}</span>
              <span><b>Affects:</b> {affectsText}</span>
            </div>
          </>
        ) : null
      }
    </div>
  );

}