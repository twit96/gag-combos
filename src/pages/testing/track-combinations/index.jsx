import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { GetTrackCombinations } from "~/features/recommendations";
import { CombinationsInput, CombinationsOutput } from "~/features/testing/track-combinations";
import { Footer } from "~/features/ui";


export default function CheckTrackCombinations() {
  const [num, setNum] = useState(0);  // numToons
  const [type, setType] = useState("All");  // comboType
  const [filters, setFilters] = useState(
    // gagFilters
    {
      "Toon-Up": true,
      "Trap": true,
      "Lure": true,
      "Sound": true,
      "Throw": true,
      "Squirt": true,
      "Drop": true,
    }
  );  
  const [effects, setEffects] = useState(
    // statusEffects
    {
      "Trapped": false,
      "Lured": false,
      // ...
    }
  );

  const combinations = new GetTrackCombinations(num, type, filters, effects).combinations;

  return (
    <PageWrap
      content={
        <>
          <Header />
          <main className={styles.main+" wrapper"}>
            <Link to="/testing">Back</Link>
            <h2 className="standard-heading">Check Track Combinations Algorithm</h2>
            <div className={styles.twoCol}>
              <CombinationsInput
                num={num} setNum={setNum}
                type={type} setType={setType}
                filters={filters} setFilters={setFilters}
                effects={effects} setEffects={setEffects}
              />
              <CombinationsOutput combinations={combinations} />
            </div>

          </main>
          <Footer />
        </>
      } 
    />
  );
}
