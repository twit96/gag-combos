import { organicBonus, gagsData } from "~/features/core";


export default class Gag {
  /** 
   * @param {string} track Gag track
   * @param {int} level Gag level
   * @param {boolean} organic Gag is organic (true/false)
  */
  constructor(track="", level=0, organic=false) {
    // Defaults to "Pass"
    this.organic = organic;
    this.track = track;
    this.level = level;
    this.name = "Pass"; 
    this.accuracy = {
      "Base": 1.0,
      "Attack": 1.0
    };
    this.damage = {
      "Base": 0,
      "Attack": 0,
      "Lured Multiplier": 0,
      "Combo Multiplier": 0,
    };
    this.heal = 0;
    this.stun = 0;
    this.targetsMulti = false;
    // Override Defaults based on given parameters
    this._getGagData();
    this.image = this._getImageName();
  }

  _getGagData() {

    // if any parameters are missing, treat it as a "Pass"
    if (!this.track || !this.level) return;

    // get gag object from JSON
    let thisGagData = gagsData[this.track][this.level-1];

    // Accuracy - Lure special
    if (this.track === "Lure") {
      this.accuracy["Base"] = this.organic ? organicBonus[this.track](thisGagData.accuracy) : thisGagData.accuracy;
    } else {
      this.accuracy["Base"] = thisGagData.accuracy;
    }


    // Damage - Trap, Sound, Throw, Squirt, Drop special
    if (
      (this.track === "Trap") || 
      (this.track === "Sound") ||
      (this.track === "Throw") ||
      (this.track === "Squirt") ||
      (this.track === "Drop")
    ) {
      this.damage["Base"] = this.organic ? organicBonus[this.track](thisGagData.damage[1]) : thisGagData.damage[1];
    } 

    // Heal - Toon-Up special
    if (this.track === "Toon-Up") {
      this.heal = this.organic ? organicBonus[this.track](thisGagData.heal[1]) : thisGagData.heal[1];

    }

    // Name
    this.name = thisGagData.name;

    // Stun - Lure Special
    if (this.track === "Lure") this.stun = thisGagData.stun; 

    // Targets Multi
    this.targetsMulti = thisGagData.targets_multi;
  }

  _getImageName() {
    // Pass image doesn't adhere to naming format
    if (this.name === "Pass") return "./img/gags/pass.png";

    let trackConf = this.track.replace(/-/g,"").toLowerCase();
    let nameConf = this.name.replace(/[$ ]/g,"").toLowerCase();

    return (`/img/gags/${trackConf}-${nameConf}.png`);
  }

  /**
   * 
   * @param {dict} counts A dictionary containing how many gags of each track are used in a particular combo.
   * @param {int} cogLevel The cog's level.
   */
  getAccuracyWithCombo(counts, cog) {

  /*
  Special Case: Lure
  */
  if (this.track === "Lure") {
    /*
    TODO - Lure Stuns ---------------------------------------------------------------
    1. Must add multi-lure combos to combos.data.json
    2. Need all lure gag levels/accuracies from the combo to determine base accuracies
      (may be better to do this calculation in combo.module.jsx)
    ---------------------------------------------------------------------------------
    */

    // Accuracy Bonus with Trap
    this.accuracy["Attack"] = ("Trap" in counts) || cog.statusEffects["Trapped"]
      ? this.accuracy["Base"] + 0.1 
      : this.accuracy["Base"];

    // Lure ignores all other accuracy calculations
    return;
  }


    /*
    100% Accuracy Cases:
    */
    if (

      // Pass
      this.name === "Pass" ||
      
      // Trap
      this.track === "Trap" ||

      // Sound on Lured Cogs
      (
        (
          !("Trap" in counts) && 
          "Lure" in counts &&
          this.track === "Sound"
        ) || (
          !("Trap" in counts) && 
          cog.statusEffects["Lured"] &&
          this.track === "Sound"
        )
      ) ||
      
      // Throw on Lured Cogs
      (
        (
          !("Trap" in counts) && 
          !("Sound" in counts) && 
          "Lure" in counts &&
          this.track === "Throw"
        ) || (
          !("Trap" in counts) && 
          !("Sound" in counts) && 
          cog.statusEffects["Lured"] &&
          this.track === "Throw"
        )
      ) ||
      
      // Squirt on Lured Cogs
      (
        (
          !("Trap" in counts) && 
          !("Sound" in counts) && 
          !("Throw" in counts) && 
          "Lure" in counts &&
          this.track === "Squirt"
        ) || (
          !("Trap" in counts) && 
          !("Sound" in counts) && 
          !("Throw" in counts) && 
          cog.statusEffects["Lured"] &&
          this.track === "Squirt"
        )
      )
    ) {
      this.accuracy["Attack"] = 1.0;
      return;
    }


    // Proposed Accuracy := Gag's Base Accuracy
    const propAcc = this.accuracy["Base"] * 100;  


    /*
    Track Experience := (highest gag level in track - 1) * 10
    Assume maximum track experience.
    */
    const trackExp = 60;


    /*
    Target Defense defined by cog
    Special Case: Toon-Up always equals 0.
    */
    const tgtDef = (this.track==="Toon-Up") ? 0 : cog.tgtDef;


    /*
    Previous Hits
    Assume all previous gags hit.
    */
    let prevHits = 0;  
    for (const [track, count] of Object.entries(counts)) {

      if (track === this.track) break;  // do not count current track or any tracks after it

      // Trap Activation has 30% bonus
      if (counts["Trap"] === 1 && "Lure" in counts) {
        prevHits += 30
      }

      // Damage Gags have 25% bonus
      else if (["Sound", "Throw", "Squirt", "Drop"].includes(track)) {
        prevHits += (25 * count);
      }

    }


    /*
    Lured Ratio := (number of lured cogs) / (total cogs in battle) * 100
    luredRatio is applied to all Sound gags and Level 7 Throw/Squirt gags.
    Note: Total cogs in battle assumed to be 1 for recommendations,
    so this value will either be 0 or 100 for each gag.
    */
    let luredRatio = 0;
    if (
      (
        (this.track === "Sound") ||                                     // sound gags
        (this.level === 7 && ["Throw", "Squirt"].includes(this.track))  // level 7 throw/squirt gags
      ) && (
        cog.statusEffects["Lured"] ||  // cog is lured
        "Lure" in counts               // combo includes lure (which we assume is successful)
      )
    ) {
      luredRatio = 100;
    }

    const bonus = prevHits + luredRatio; 

    const atkAcc = Math.min(propAcc + trackExp + tgtDef + bonus, 95) / 100;
    this.accuracy["Attack"] = atkAcc;
  }

  /**
   * 
   * @param {dict} counts A dictionary containing how many gags of each track are used in a particular combo. 
   */
  getDamageWithMultiplier(counts, isLured) {
    let dudMultiplier = 1;
    let luredMultiplier = 0;
    let comboMultiplier = 0;

    // "Pass", "Lure", and "Toon-Up" have no damage to multiply
    if (this.damage["Base"] === 0) return [0, 0, 0];

    // Drop on Lure Dud
    if (
      (this.track === "Drop") &&
      (isLured || counts["Lure"] > 0) && 
      (!("Trap" in counts) || counts["Trap"] > 1) && 
      !("Sound" in counts) && 
      !("Throw" in counts) &&
      !("Squirt" in counts)
    ) {
      return [0, 0, 0];
    }

    // Trap no Lure Dud
    if (
      (this.track === "Trap") && 
      (!("Lure" in counts))
    ) {
      return [0, 0, 0];
    }

    // Multiple Traps Dud
    if (this.track === "Trap" && counts["Trap"] > 1) return [0, 0, 0];


    // Get Lured Multiplier
    if (
      (counts["Lure"] > 0) ||
      (isLured)
    ) {
      // Throw (trap and sound don't knockback first)
      if (
        (this.track === "Throw") && 
        (!("Trap" in counts) || (counts["Trap"] > 1)) &&
        !("Sound" in counts)
      ) {
        luredMultiplier = 0.5;
      }
      // Squirt (trap, sound, and throw don't knockback first)
      if (
        (this.track === "Squirt") && 
        (!("Trap" in counts) || (counts["Trap"] > 1)) &&
        !("Sound" in counts) && 
        !("Throw" in counts)
      ) {
        luredMultiplier = 0.5;
      }
    }

    // Get Sound/Throw/Squirt/Drop Combo Multiplier
    if (
      (this.track === "Sound" || this.track === "Throw" || this.track === "Squirt" || this.track === "Drop") &&
      (counts[this.track] > 1)
    ) {
      comboMultiplier = 0.2;
    }

    this.damage["Lured Multiplier"] = Math.round(luredMultiplier * this.damage["Attack"] * 10) / 10;
    this.damage["Combo Multiplier"] = Math.round(comboMultiplier * this.damage["Attack"] * 10) / 10;

    return [dudMultiplier, luredMultiplier, comboMultiplier];
  }

  toString() {
    return (
      `Gag: ${this.organic} ${this.track}, ${this.level} - ${this.name}, Damage: ${this.damage["Base"]}`
      // \n- Image: ${this.image}`
    );
  }
}

// let testGag = new Gag("Squirt", 2, false);
// console.log(`${testGag}`);
