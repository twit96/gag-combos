import React from "react";
import styles from "./index.module.css";

export default function CombinationsOutput({combinations}) {
  const outputLength = combinations.length;
  return (
    <div className={styles.output}>
      <h3>Output ({outputLength})</h3>
      <pre>
        <code className={`custom-scrollbar ${styles.code}`}>{JSON.stringify(combinations, null, 2)}</code>
      </pre>
    </div>
  );
}
