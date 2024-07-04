import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { trackColors, Gag } from "~/features/core";
import {
  resetGags, addGag,
  ToggleOrganic, GagButton, GagsList, HoverBox, DamageCount
} from "~/features/calculator";
import { ResetButton } from "~/features/ui";
import styles from "./index.module.css";


/**
 * 
 * @param {String} track Which gag track to use.
 * @param {String} org Whether or not the gag track is organic.
 * @returns A row of buttons corresponding to the specified in-game gag track.
 */
function GagTrackButtons({ track, org }) {
  const dispatch = useDispatch();

  return (
    <div 
      className={styles.gagTrack}
      style={{backgroundColor: trackColors[track]}}
    >
      <h4>{track}</h4>
      {
        [0, 1, 2, 3, 4, 5, 6].map((level, j) => {
          let thisGag = new Gag(track, level+1, org);
          return (
            <GagButton 
              key={j} 
              gag={thisGag} 
              clickHandler={() => dispatch(addGag({
                track: thisGag.track, 
                level: thisGag.level, 
                organic: thisGag.organic
              }))}
            />
          )
        })
      }
    </div>
  );
}


/**
 * @param {String} org Whether or not the gag track is organic.
 * @returns Gag track buttons corresponding to all in-game gags.
 */
function GagButtons({ org }) {
  return (
    <div className={`custom-scrollbar ${styles.pickerWrap}`}>
      {
        Object.keys(trackColors).map((track, i) => {
          return (
            <GagTrackButtons 
              key={i} 
              track={track} 
              org={org}
            />
          )
        })
      }
    </div>
  );
}


export default function GagsPicker() {

  const gagsList = useSelector((state) => state.calculator.gag.gagsList);
  const org = useSelector((state) => state.calculator.gag.organic);
  const dispatch = useDispatch();

  return (
    <div className={styles.gagsPicker}>
      <div className={`wrapper ${styles.gagsPickerWrap}`}>
        <div className={styles.headingArea}>
          <div className={styles.headingBtnWrap}>
            <h2>Gags</h2>
            <ResetButton 
              active={gagsList.length > 0}
              clickHandler={() => dispatch(resetGags())}
              infoText="Reset Calculator Gags"
              customStyles={{ "--_bg":"var(--red-500)" }}
            />
          </div>
          <HoverBox />
          <ToggleOrganic />
        </div>
        <GagButtons org={org} />
        <GagsList />
        <DamageCount />
      </div>
    </div>
  );
}
