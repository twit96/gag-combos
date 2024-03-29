import React from "react";
import { Toggle } from "~/features/ui";
import styles from "./index.module.css";


export default function ToggleV2({ active=false, clickHandler=null, hasText=true }) {
  return (
    <div>
      {
        hasText && (
          active ? (
            <h3 className="toggle-title" style={{color: "var(--red-600)"}}>Cog is v2.0</h3>
           ) : (
            <h3 className="toggle-title">Is Cog v2.0?</h3>
           )
        )
      }
      <Toggle 
        icon={<h3 className={styles.v2Text}>v2.0</h3>}
        active={active}
        clickHandler={clickHandler}
        infoText="Toggle v2.0 Cog"
        accentColor="var(--red-600)"
      />
    </div>
  )
}