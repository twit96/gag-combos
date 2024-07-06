import React, { useState } from "react";
import styles from "./track-combinations.module.css";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import {
  PermutationsInput, PermutationsOutput,
  GetTrackCombinations
} from "~/features/testing/track-combinations";
import { Footer } from "~/features/ui";


export default function TestTrackCombinations() {
  const [num, setNum] = useState(0);  // numToons
  const [type, setType] = useState("All");  // comboType
  const [filters, setFilters] = useState({
    "Toon-Up": true,
    "Trap": true,
    "Lure": true,
    "Sound": true,
    "Throw": true,
    "Squirt": true,
    "Drop": true,
  });  // gagFilters
  const [effects, setEffects] = useState({
    "Trapped": false,
    "Lured": false,
    // ...
  });  // statusEffects

  const permutations = new GetTrackCombinations(num, type, filters, effects).permutations;

  return (
    <PageWrap
      content={
        <>
          <Header />
          <main className={styles.main+" wrapper"}>
            <h2 className="standard-heading">Programmatic Combo Permutations Testing</h2>
            <div className={styles.twoCol}>
              <PermutationsInput
                num={num} setNum={setNum}
                type={type} setType={setType}
                filters={filters} setFilters={setFilters}
                effects={effects} setEffects={setEffects}
              />
              <PermutationsOutput permutations={permutations} />
            </div>

          </main>
          <Footer />
        </>
      } 
    />
  );
}
