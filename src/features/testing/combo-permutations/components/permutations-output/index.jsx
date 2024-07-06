import React from "react";
import styles from "./index.module.css";

export default function PermutationsOutput({permutations}) {
  const outputLength = permutations.length;
  const hasOutput = outputLength > 0;
  return (
    <div className={styles.output}>
      <h3>Output ({outputLength})</h3>
      <pre>
        <code className={`custom-scrollbar ${styles.code}`}>{JSON.stringify(permutations, null, 2)}</code>
      </pre>
    </div>
  );
}
