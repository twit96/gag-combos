import React from "react"
import styles from './index.module.css';

export default function PermutationsInput({
  num, setNum,
  type, setType,
  filters, setFilters,
  effects, setEffects
}) {
  return (
    <div className={styles.input}>
      <h3 className={styles.heading}>Input</h3>

      <form className={styles.form}>

        {/* numToons */}
        <div style={{display:"flex", gap:"1ch"}}>
          <span>numToons</span>
          <input
            name="numToons" type="number" min="0" max="4"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </div>

        {/* comboType */}
        <div style={{display:"flex", gap:"1ch"}}>
          <span>comboType</span>
          <select
            name="comboType"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Basic">Basic</option>
            <option value="Best">Best</option>
          </select>
        </div>

        {/* gagFilters */}
        <div>
          <span style={{display:"block",marginBottom:"1ch"}}>gagFilters</span>
          {
            [
              "Toon-Up", "Trap", "Lure", "Sound", "Throw", "Squirt", "Drop"
            ].map((trackName, i) => (
              <label key={i} style={{display:"flex", gap:"1ch", marginLeft: "1ch"}}>
                <input
                  name={`filter-`+i} type="checkbox"
                  checked={filters[trackName]}
                  onChange={() => setFilters(
                    {
                      ...filters,
                      [trackName]: !filters[trackName]
                    }
                  )}
                />
                {trackName}
              </label>
            ))
          }
        </div>

        {/* statusEffects */}
        <div>
          <span style={{display:"block",marginBottom:"1ch"}}>statusEffects</span>
          <label style={{display:"flex", gap:"1ch", marginLeft: "1ch"}}>
            <input
              name="statusEffect-Trapped" type="checkbox"
              checked={effects["Trapped"]}
              onChange={() => setEffects(
                {
                  ...effects,
                  "Trapped": !effects["Trapped"]
                }
              )}
              disabled={effects["Lured"]}
            />
            <span>Trapped</span>
          </label>
          <label style={{display:"flex", gap:"1ch", marginLeft: "1ch"}}>
            <input
              name="statusEffect-Lured" type="checkbox"
              checked={effects["Lured"]}
              onChange={() => setEffects(
                {
                  ...effects,
                  "Lured": !effects["Lured"]
                }
              )}
              disabled={effects["Trapped"]}
            />
            <span>Lured</span>
          </label>
          
        </div>
        
      </form>

    </div>
  );
}
