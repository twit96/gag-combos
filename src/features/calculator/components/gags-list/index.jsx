import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteGag, setHoveredGag } from "~/features/calculator";
import styles from "./index.module.css";
import { Gag } from "~/features/core";
import { GagButton } from "~/features/calculator";


function GagsListContainer({ gagsList }) {
  const dispatch = useDispatch();
  return (
    <>
      {
        gagsList.map((gag, i) => {
          let thisGag = new Gag(gag.track, gag.level, gag.organic);
          return (
            <React.Fragment key={i}>
              <GagButton 
                gag={thisGag} 
                clickHandler={() => {
                  dispatch(deleteGag({index: i}))
                  dispatch(setHoveredGag(null))
                }}
                hasX={true}
              />
              {(i < gagsList.length-1) ? (<span>+</span>) : null}
            </React.Fragment>
          )
        })
      }
    </>
  );
}


export default function GagsList() {
  const gagsList = useSelector((state) => state.calculator.gag.gagsList);

  return (
    <div className={styles.gagsList}>
      <div className={`custom-scrollbar ${styles.gagsListContainer}`}>
        {
          gagsList.length > 0 ? (
            <GagsListContainer gagsList={gagsList} />
          ) : (
            <h4>Choose Gags to Calculate their Damage!</h4>
          )
        }
      </div>
    </div>
  );
}
