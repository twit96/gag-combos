import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function V4UpdateWarningBanner() {
  const [displayed, setDisplayed] = useState(true);

  return (
    displayed ? (
      <div className={styles.updateWarningBanner}>
        <div className={`wrapper ${styles.updateWarningBannerWrapper}`}>
          <p className={styles.updateWarningBannerMessage}>
            Note: v4.0.0 changes to Lure mechanics in progress!
            Combo accuracy not aligned with current gameplay. <Link 
              to="/changelog" 
              className={styles.bannerLink}
            >Read More</Link>
          </p>
          <button
            aria-label="Hide this Banner"
            title="Hide this Banner"
            className={`btn danger ${styles.updateWarningBannerButton}`}
            onClick={() => setDisplayed(false)}
          >
            <svg
              className={styles.xIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="0.75em"
              height="0.75em"
            >
              <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
            </svg>
          </button>
        </div>
      </div>
    ) : null
  );
}
