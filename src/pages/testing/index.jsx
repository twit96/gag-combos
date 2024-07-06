import React from "react";
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
                  <a href="./track-combinations">Test Track Combinations Algorithm</a>
                </li>
                <li>
                  <a href="./gag-stats">Check Gag Stats</a>
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
