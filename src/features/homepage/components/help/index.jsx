import React from "react";
import { Link } from "react-router-dom";
import { FlexContainer, HomepageWrapper } from "~/features/homepage";
import styles from "./index.module.css";


export default function Help() {
  return (
    <section className={`with-grid-bg ${styles.help}`}>
      <HomepageWrapper
        content={
          <FlexContainer
            content={
              <>
                <div className={styles.left}>
                  <h2>Need Help?</h2>
                  <Link to="/faq" className="btn">Frequently Asked Questions</Link>
                  <Link to="/changelog" className="btn">Changelog</Link>
                  <i>Note: This utility is currently only for Toontown Rewritten!</i>
                </div>
                <div className={styles.right}>
                  <h2>New to Toontown?</h2>
                  <a className="btn" href="https://toontownrewritten.com/" target="_blank" rel="noopener noreferrer">Toontown Rewritten Homepage</a>
                  <a className="btn" href="https://toontownrewritten.wiki/Gags" target="_blank" rel="noopener noreferrer">TTR Gags Wiki</a>
                </div>
              </>
            }
            reverse={false}
          />
        } 
      />
    </section>
  );
}
