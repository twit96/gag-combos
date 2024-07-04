import React from "react";
import { useSelector } from "react-redux";
import { Cog, Combo, Gag } from "~/features/core";
import styles from "./index.module.css";


export default function DamageCount() {
  const gagsList = useSelector((state) => state.calculator.gag.gagsList);

  let gagObjs = gagsList.map((gag) => {
    return new Gag(gag.track, gag.level, gag.organic);
  });
  let combo = new Combo(new Cog(1), gagObjs);
  
  return (
    <div className={styles.damageCount}>
      <h3>Total Damage = {combo.damage["Total"]}</h3>
    </div>
  );
}