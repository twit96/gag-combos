import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { CheckGagStatsGrid } from "~/features/testing/gag-stats";
import { Footer } from "~/features/ui";


export default function CheckGagStats() {
  return (
    <PageWrap
      content={
        <>
          <Header />
          <main className={styles.main+" wrapper"}>
            <Link to="/testing">Back</Link>
            <h2 className="standard-heading">Check Gag Stats</h2>
            <CheckGagStatsGrid  />
          </main>
          <Footer />
        </>
      } 
    />
  );
}
