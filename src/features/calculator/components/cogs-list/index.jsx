import React from "react";
import { useSelector } from "react-redux";
import { ToggleV2 } from "~/features/calculator";
import { Cog, Combo, Gag } from "~/features/core";
import styles from "./index.module.css";


function CogsListEntry({ level, isV2, baseHP, remainingHP }) {
  const hue = Math.round(remainingHP / baseHP * 100);
  return (
      remainingHP > 0 &&
      <li
        style={{background: `hsl(${hue},100%,45%)`}} 
        className={styles.cogsListEntry + (isV2 ? " "+styles.v2 : "")}
      >
        <p>
          <b>Level {level}{isV2 && " v2.0"}</b>
          <span>{Math.trunc(remainingHP)} / {baseHP} HP</span>
        </p>
        {
          isV2 &&
          <img
            src="/img/statuseffects/reinforcedplating.webp"
            alt="Reinforced Plating"
            title="Reinforced Plating"
          />
        }
      </li>
  );
}


export default function CogsList() {

  const gagsList = useSelector((state) => state.calculator.gag.gagsList);
  const isV2 = useSelector((state) => state.calculator.cog.isV2);

  let gagObjs = gagsList.map((gag, i) => {
    return new Gag(gag.track, gag.level, gag.organic);
  });

  let levels = Array.from(Array(20), (e,i)=>i+1);
  const combos = levels.map((lvl) => {
    return new Combo(new Cog(lvl, isV2), gagObjs);
  });

  const maxSuccessfulCombo = [...combos].reverse().find(combo => combo.defeatsCog);
  const minDefeatedCog = maxSuccessfulCombo ? maxSuccessfulCombo.cog.level : false;
  const minDefeatedCogOverkill = maxSuccessfulCombo && (
    maxSuccessfulCombo.damage["Total"] - (maxSuccessfulCombo.cog.hp * maxSuccessfulCombo.cog.lives)
  );

  return (
    <div className={styles.cogsListContainer}>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>

      <div className={`cog-clip cog-clip--content ${styles.wrapper}`}>
        
        <div className={styles.headingsArea}>
          <ToggleV2 />
          <hr className={styles.headingsAreaHr} />
          <h3 className={styles.defeatedIndicator}>
            {
              minDefeatedCog ? (
                <>
                  <span style={{color:"var(--green-500)"}}>Level {minDefeatedCog} Defeated</span>
                  {
                    minDefeatedCogOverkill ? (
                      <span>Overkill: +{minDefeatedCogOverkill} HP</span>
                    ) : null
                  }
                </>
              ) : (
                <span>No Cog Defeated</span>
              )
            }
          </h3>
        </div>

        {
          minDefeatedCog < 20 &&
          <>
            <hr />
            <ul className={`custom-scrollbar ${styles.cogsList}`}>
              {
                combos.map((combo, i) => {
                  return (
                    combo.cog.livesRemaining>0 &&
                    <CogsListEntry 
                      key={i}
                      level={combo.cog.level}
                      isV2={combo.cog.livesRemaining > 1}
                      baseHP={combo.cog.hp}
                      remainingHP={combo.cog.hpRemaining}
                    />
                  );
                })
              }
            </ul>
          </>
        }
        
      </div>
    </div>
  );
}
