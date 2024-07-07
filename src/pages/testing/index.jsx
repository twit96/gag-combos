import React from "react";
import { Link } from "react-router-dom";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { Footer } from "~/features/ui";


export default function Testing() {
  return (
    <PageWrap
      content={
        <>
          <Header />
          <main>
            <div className="wrapper">
              <h2>Testing</h2>
              <ul>
                <li>
                  <Link to="/testing/track-combinations">Check Track Combinations Algorithm</Link>
                </li>
                <li>
                  <Link to="/testing/gag-stats">Check Gag Stats</Link>
                </li>
              </ul>
            </div>
          </main>
          <Footer />
        </>
      } 
    />
  );
}
