import React from "react";
import { useSelector } from "react-redux";
import { GagCell } from "~/features/recommendations";
import styles from "./index.module.css";


function ComboHeading({ solutionTracks }) {
  return (
    <h3 className={styles.comboCellHeading}>
      {solutionTracks.map((track, j) => {
        if (solutionTracks.length === 1) {
          return track;
        } else {
          return (j===solutionTracks.length-1) ? track : track + " / ";
        }
      })}
    </h3>
  );
}


function ComboGags({ combo, expanded=false }) {
  return (
    <div className={styles.comboGags}>
      {combo.gags.map((gag, j) => (
        <GagCell 
          key={j} 
          gag={gag} 
          expanded={expanded}
        />
      ))}
    </div>
  );
}


function ComboMultipliers({ combo }) {
  return (
    (combo.damage["Lured Multiplier"] !== 0 || combo.damage["Combo Multiplier"] !== 0) && (
      <div className={styles.comboMultipliers}>
        {
          (combo.damage["Lured Multiplier"] !== 0) && (
            <span><b>Lured Multiplier</b>: +{combo.damage["Lured Multiplier"]}</span>
          )
        }
        {
          (combo.damage["Combo Multiplier"] !== 0) && (
            <span><b>Combo Multiplier</b>: +{combo.damage["Combo Multiplier"]}</span>
          )
        } 
      </div>
    )
  );
}


function ComboStats({ combo }) {
  return (
    <div className={styles.comboStats}>
      <h4 
        style={combo.damage["Total"] === combo.cog.hp ? {color: "var(--green-500)"} : {}}
        title="Combo Damage"
      >
        <span>Damage:</span>
        <span>{combo.damage["Total"]} / {combo.cog.statusEffects["Reinforced Plating"] ? (combo.cog.hp * 2) : combo.cog.hp}</span>
      </h4>
      <h4 
        title="Combo Accuracy: Read more about this statistic on the FAQ page."
        style={combo.accuracy === 100 ? {color: "var(--green-500)"} : {}}
      >
        <span>Accuracy:</span>
        <span>{combo.accuracy}%</span>
      </h4>
    </div>
  );
}


function ExpandBtn({ infoIndicator, cellStates, cellNum, setCellStates, thisExpanded }) {
  return (
    <button
      className={`btn ${styles.expandBtn} ${infoIndicator ? infoIndicator : ""}`}
      onClick={() => {
        let newCellStates = [...cellStates];
        newCellStates[cellNum] = !newCellStates[cellNum];
        setCellStates(newCellStates);
      }}
      aria-label={"Toggle Combo Info"}
      title={"Toggle Combo Info"}
    >
      {
        thisExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
            <path d="M144 80c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/>
          </svg>
        )
      }
    </button>
  );
}


export function ComboCell({ combo, cellNum, cellStates, setCellStates }) {
  const expanded = useSelector((state) => state.recommendations.combos.expanded);
  let thisExpanded = cellStates[cellNum];
  let solutionTracks = Object.keys(combo.counts);
  let infoIndicator = combo.info.indicator;
  const isPerfect = (combo.damage["Total"] === combo.cog.hp) && (combo.accuracy === 100);

  return (
    <div
      className={`${styles.comboCell} ${thisExpanded ? styles.expanded : ""}`}
      style={isPerfect ? {borderColor: "var(--green-400)"} : {}}
    >

      {/* heading */}
      <ComboHeading solutionTracks={solutionTracks} />

      <hr />

      {/* gags */}
      <ComboGags combo={combo} expanded={thisExpanded} />

      {/* multipliers */}
      { thisExpanded && <ComboMultipliers combo={combo} /> }

      {/* info */}
      {
        infoIndicator && thisExpanded && (
          <div className={`${styles.comboInfo} ${styles[combo.info.indicator]}`}>
            {combo.info.text} 
          </div>
        )
      }

      <hr />

      {/* footer */}
      <div
        className={styles.comboFooter}
        style={expanded ? {justifyContent: "center"} : {}}
      >
        {/* stats */}
        <ComboStats combo={combo} />
        {/* expand button */}
        {
          !expanded && (
            <ExpandBtn 
              infoIndicator={infoIndicator}
              cellStates={cellStates}
              cellNum={cellNum}
              setCellStates={setCellStates}
              thisExpanded={thisExpanded}
            />
          )
        }
      </div>

    </div>
  );
}


export function ErrorCell({ message }) {
  return (
    <div className={`${styles.comboCell} ${styles.errorCell}`}>
      <h3>{message}</h3>
    </div>
  );
}
