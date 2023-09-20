import React from "react";
import styles from "./index.module.css";


export default function PageWrap({ content=null, style=null }) {
  return (
    <div
      className={`custom-scrollbar ${styles.pageWrap}`}
      style={style}
    >
      {content}
    </div>
  );
}