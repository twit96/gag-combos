import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGagModal } from "~/features/recommendations";
import styles from "./index.module.css";
import { trackColors, Gag } from "~/features/core";


export default function GagModal() {

  const gagData = useSelector((state) => state.recommendations.gag.modal.data);
  const dispatch = useDispatch();
  let gag = new Gag(
    gagData.track,
    gagData.level,
    gagData.org
  );

  return (
    <div className={styles.gagModal}>
      <div className={`wrapper ${styles.modalWrapper}`}>
        <div className={`custom-scrollbar ${styles.modalContent}`}>

          {/* Gag Heading */}
          <section className={styles.mainDetails}>
            <div 
              className={`${styles.imgWrap} ${gag.organic ? styles.org : ""}`}
              style={{background: (trackColors[gag.track] || "")}}
            >
              <img 
                className={styles.gagIcon}
                src={gag.image} 
                alt={gag.name + " gag"} 
              />
              {(gag.organic) ? (
                <img 
                  className={styles.organicIcon}
                  src="/img/gags/icon-organic-mini.png"
                  alt={"Organic Icon"} 
                />
            ) : null}
            </div>
            <div className={styles.overview}>
              <h3>
                {gag.name}
                {
                  (gag.organic) ? (
                    <>
                      <br />
                      <span>(Organic)</span>
                    </>
                  ) : null
                  
                }
              </h3>
            </div>
          </section>

          {/* Gag Overview */}
          <section className={styles.gagsPanel}>
            <h4>Overview</h4>
            {/* gags grid */}
            <div 
              className={styles.gridWrap}
              style={gag.level===0 ? {filter: "grayscale(1)", opacity: "0.25"} : {}}
            >
              {Object.keys(trackColors).map((track, i) => {
                return (
                  <React.Fragment key={i}>
                    <b style={{background: trackColors[track]}}>{track}</b>
                    {[0,1,2,3,4,5,6].map((j) => {
                      return (
                        <span 
                          key={j} 
                          style={{
                            background: (track===gag.track) ? trackColors[track] : "", 
                            boxShadow: (j+1===gag.level && track===gag.track) ? "0 0 0 5px #000000" : "",
                            zIndex: (j+1===gag.level && track===gag.track) ? "1" : ""
                          }}
                        >
                          {j+1}
                        </span>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
            {/* track/level text */}
            <div>
              <div><b>Track</b>: {gag.track || "None"}</div>
              <div><b>Level</b>: {gag.level || "None"}</div>
            </div>
          </section>

          {/* Gag Stats */}
          {
            Object.entries(gagData.comboStats).map(([stat, val], i) => (
              <section className={styles.stat} key={i}>
                <h4>{stat}</h4>
                <ul>
                  {
                    Object.entries(val).map(([subStat, subVal], j) => (
                      <li key={j}>
                        <b>{subStat}: </b>{stat==="accuracy" ? Math.round(subVal*100)+"%" : subVal}
                      </li>
                    ))
                  }
                </ul>
              </section>
            ))
          }
          
        </div>

        <div className={styles.modalBtnWrap}>
          <button
            className={`btn danger ${styles.modalBtn}`}
            onClick={() => dispatch(resetGagModal())}
            title="Close Gag Details"
          >
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
}
