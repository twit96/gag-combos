/**
 * Given the number of toons, the user's desired type of gag combinations,
 * the user's enabled gag tracks, and the user-set cog status effects,
 * outputs all valid combinations of gag tracks.
 * Used by the RecommendCombos class to find specific gags for each of these track combos.
 * 
 * @param numToons {Number} the number of toons in the given battle
 * @param comboType {String} the user's desired type of gag combinations
 * @param gagFilters {Object} the currently active gag tracks in the battle
 * @param statusEffects {Object} the currently active status effects in the battle
 * 
 * Stores all valid gag track combinations for the given battle parameters
 * in the "combinations" public variable.
*/
export default class GetTrackCombinations {
  
  constructor(
    numToons=0,  // [0-4]
    comboType="All",  // "All", "Basic", "Best", - only "Basic" changes output
    gagFilters=null,
    statusEffects=null,
  ) {
    this._numToons = Number(numToons);
    this._comboType = comboType;
    this._gagFilters = gagFilters;
    this._statusEffects = statusEffects;
    // this._consoleLogInputsForDev();

    this._allowedTracks = this._getAllowedTracks();

    this.combinations = [];  // Output
    this._getCombinations();
  }

  // _consoleLogInputsForDev() {
  //   console.clear();
  //   console.log(`
  //     numToons: ${this._numToons}
  //     comboType: ${this._comboType}
  //     gagFilters:
  //       Toon-Up: ${this._gagFilters["Toon-Up"]}
  //       Trap: ${this._gagFilters["Trap"]}
  //       Lure: ${this._gagFilters["Lure"]}
  //       Sound: ${this._gagFilters["Sound"]}
  //       Throw: ${this._gagFilters["Throw"]}
  //       Squirt: ${this._gagFilters["Squirt"]}
  //       Drop: ${this._gagFilters["Drop"]}
  //     statusEffects:
  //       Trapped: ${this._statusEffects["Trapped"]}
  //       Lured: ${this._statusEffects["Lured"]}
  //   `);
  // }

  _getAllowedTracks() {
    // explicitly enabled/disabled tracks
    let allowedTracks = Object.keys(this._gagFilters).filter(track => this._gagFilters[track]);
    // remove Toon-Up - does not deal damage or add accuracy as of 4.0.0
    allowedTracks = allowedTracks.filter((t) => { return t !== "Toon-Up"; })
    // remove Trap if Lure isn't enabled
    if (!allowedTracks.includes("Lure")) allowedTracks = allowedTracks.filter((t) => { return t !== "Trap" });
    // status effects can prevent using some gag tracks
    if (this._statusEffects["Trapped"]) allowedTracks = allowedTracks.filter((t) => { return t !== "Trap" });
    if (this._statusEffects["Lured"])   allowedTracks = allowedTracks.filter((t) => { return !["Trap", "Lure"].includes(t) });
    // "Basic" comboType doesn't allow mixing and matching of gag tracks - therefore only allow attack tracks
    if (this._comboType === "Basic") allowedTracks = allowedTracks.filter((t) => { return !["Trap", "Lure"].includes(t) });
    // remove impossible 1-toon combos
    if (this._numToons === 1) allowedTracks = allowedTracks.filter((t) => { return !["Trap", "Lure"].includes(t) });
    // console.log(allowedTracks);
    return allowedTracks;
  }

  _makeNextCombo(
    workingCombo,
    currentToonIndex, remainingToons,
    currentTrackIndex, remainingTracks
  ) {

    // ---------- ---------- Tweak Recursion with TTR Combo Rules ---------- ----------
    if (workingCombo.length > 0) {

      // Disallow Duplicate Traps
      if (
        workingCombo.filter(t => t==="Trap").length === 1 &&  // contains Trap
        this._allowedTracks[currentTrackIndex] === "Trap"     // current track is Trap
      ) {
        // skip to next track
        currentTrackIndex++;
        remainingTracks--;
      }

      // Disallow Trap-without-Lure
      if (
        workingCombo.includes("Trap") &&                   // contains Trap
        !workingCombo.includes("Lure") &&                  // doesn't contain Lure
        this._allowedTracks[currentTrackIndex] !== "Lure"  // current track is not Lure
      ) {
        return;  // stop this recursive path
      }

      // If not already trapped...
      if (!this._statusEffects["Trapped"]) {

        // ...Disallow All-Lure Combos
        if (
          workingCombo.filter(t => t==="Lure").length === this._numToons-1 &&  // all but 1 toon are using Lure
          this._allowedTracks[currentTrackIndex] === "Lure"                    // current track is Lure
        ) {
          if (remainingTracks > 1) {
            // skip to next track
            currentTrackIndex++;
            remainingTracks--;
          } else {
            // stop this recursive path
            return;
          }
        }
    
        // ...Disallow All-Lure-Before-Drop Combos
        if (
          workingCombo.every( t => t==="Lure" ) &&           // all Lure so far
          this._allowedTracks[currentTrackIndex] === "Drop"  // current track is Drop
        ) {
          return;  // stop this recursive path
        }

      }

      // Disallow All-Drop-on-Lure
      if (
        this._statusEffects["Lured"] &&  // cog is already lured
        workingCombo[0]==="Drop"         // first toon is using Drop
      ) {
        return;  // stop this recursive path
      }

      

      
    }
    
    // ---------- ---------- Actual Recursive Algorithm ---------- ----------

    const nextCombo = [ ...workingCombo, this._allowedTracks[currentTrackIndex] ];

    const atComboLength = remainingToons === 1;
    const atTracksLength = remainingTracks === 1;

    // If not at last enabled track, create same length combo with next enabled track.
    if (!atTracksLength) {
      this._makeNextCombo(
        workingCombo,
        currentToonIndex, remainingToons,
        currentTrackIndex+1, remainingTracks-1
      );
    }

    // If not at last toon, create combo with one more toon using current track.
    if (!atComboLength) {
      this._makeNextCombo(
        nextCombo,
        currentToonIndex+1, remainingToons-1,
        currentTrackIndex, remainingTracks
      );
    

    // If at combo length, push to output array.
    } else {
      this.combinations.push(nextCombo);
    }
  }

  // Mixing and Matching Tracks
  _makeMixedCombos() {
    // initiate recursion
    this._makeNextCombo([], 0, this._numToons, 0, this._allowedTracks.length);
  }

  // No Mixing and Matching Tracks (Attack Tracks Only)
  _makeBasicCombos() {
    for (let i=this._allowedTracks.length-1; i>=0; i--) {
      let thisCombo = [];
      for (let j=0; j<this._numToons; j++) {
          thisCombo.push(this._allowedTracks[i]);
      }
      // disallow drop-only-on-lured
      if ( !(this._statusEffects["Lured"] && this._allowedTracks[i] === "Drop") ) {
        this.combinations.push(thisCombo);
      }
    }
  }

  _getCombinations() {

    // Base Case
    if (
      this._numToons === 0 ||  // no toons
      Object.values(this._gagFilters).every((gf) => gf === false) ||
      this._allowedTracks.length === 0
    ) return;

    // Make Combos
    this._comboType==="Basic" ? this._makeBasicCombos() : this._makeMixedCombos();
      
    // Reverse Output
    this.combinations.reverse();

  }

}
