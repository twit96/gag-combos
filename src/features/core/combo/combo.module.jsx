import { comboData } from "~/features/core";

export default class Combo {
  /**
   * @param {Cog} cog Cog object
   * @param {Array<Gag>} gags Array of Gag objects
  */
  constructor(cog, gags) {
    this.cog = cog;
    this.gags = gags;
    [this.counts, this.gagsByTrack] = this._parseGagsByTrack(gags);
    this.damage = {
      "Base": 0,
      "Lured Multiplier": 0,
      "Combo Multiplier": 0,
      "Total": 0
    };
    this.accuracy = 1.0;
    this.info = {
      indicator: null,
      text: []
    };
    this.defeatsCog = false;
    this.tryCombo();
  }

  _parseGagsByTrack() {
    let counts = {};  // count how many of each gag track are used
    let gagsByTrack = {};  // sort gags array into groups by gag track

    this.gags.forEach((gag) => {
      // update counts
      if (gag.track) {  // ignore passes
        (gag.track in counts) ? counts[gag.track]++ : counts[gag.track] = 1;
      }
      // sort gag by track
      if (!(gag.track in gagsByTrack)) gagsByTrack[gag.track] = [];
      gagsByTrack[gag.track].push(gag);
    });

    return[ counts, gagsByTrack ];

  }

  _getAccuracy() {
    
    // Use maximum attack accuracy from groups of gags of the same track.
    let maxAtkAccs = {};
    this.gags.forEach((gag) => {
      gag.getAccuracyWithCombo(this.counts, this.cog);
      (gag.track in maxAtkAccs)
        ? maxAtkAccs[gag.track] = Math.max(gag.accuracy["Attack"], maxAtkAccs[gag.track])
        : maxAtkAccs[gag.track] = gag.accuracy["Attack"];
    });
    this.gags.forEach((gag) => gag.accuracy["Attack"] = maxAtkAccs[gag.track]);

    // Calculate combo accuracy using gags' attack accuracy values. 
    let comboAccuracy = 1;
    for (let ta in maxAtkAccs) {
      comboAccuracy *= maxAtkAccs[ta];
    }

    // format value as 0-100 with 1 decimal place
    this.accuracy = Math.round(comboAccuracy * 1000) / 10;
  }

  /**
   * Add warnings or extra information about the combo if applicable.
  */ 
  _getDetails() {
    // generate a key from this combo's unique gag tracks
    let thisInfoKey = Object.keys(this.counts)
      .join("-")
      .toLowerCase();

    if (this.cog.statusEffects["Lured"]) thisInfoKey = "lure-"+thisInfoKey;
    if (!comboData["mapsToData"][thisInfoKey]) return false;

    // use the key to get the map to any descriptions/warnings
    const infoMap = comboData["mapsToData"][thisInfoKey];
    if (!comboData["data"][infoMap]) return false;
    
    // set descriptions/warnings for this combo
    this.info = comboData["data"][infoMap];
  }

  _getDamage() {
    // Get Dud, Lured, and Combo Multiplier Damages
    let gagDudMultiplier;    // (=0 if dud)
    let gagLureMultiplier;   // (=0.5 if lured)
    let gagComboMultiplier;  // (=0.2 if combo)

    // reset cog mutatables
    this.cog.resetLivesAndHP();

    // Calculate Damage Totals on a Track-by-Track Basis
    for (const [track, gags] of Object.entries(this.gagsByTrack)) {
      
      // store current damage totals
      let currBaseDamage = 0;
      let currLuredDamage = 0;
      let currComboDamage = 0;

      // append to track damage totals for each gag of this track
      gags.forEach((gag) => {
        gag.damage["Attack"] = gag.damage["Base"];  // ignoring toon XP
        [
          gagDudMultiplier, gagLureMultiplier, gagComboMultiplier
        ] = gag.getDamageWithMultiplier(this.counts, this.cog.statusEffects["Lured"]);
        // update current damage totals
        currBaseDamage += gag.damage["Attack"] * gagDudMultiplier;
        currLuredDamage += gag.damage["Attack"] * gagLureMultiplier;
        currComboDamage += gag.damage["Attack"] * gagComboMultiplier;
      });

      // Get Current Track Damage
      currLuredDamage = Math.ceil(currLuredDamage);
      currComboDamage = Math.ceil(currComboDamage);
      const currTrackDamage = currBaseDamage + currLuredDamage + currComboDamage;

      // Update Cog
      this.cog.dealDamage(currTrackDamage);
      if (this.cog.livesRemaining <= 0) this.defeatsCog = true;

      // Update Combo Damage
      this.damage["Base"] += currBaseDamage;
      this.damage["Lured Multiplier"] += currLuredDamage;
      this.damage["Combo Multiplier"] += currComboDamage;
    }
    // Check Total Combo Damage
    this.damage["Total"] = this.damage["Base"] + this.damage["Lured Multiplier"] + this.damage["Combo Multiplier"];
  }

  tryCombo() {
    this._getDamage();
    if (!this.defeatsCog) return false;

    this._getDetails();  // get combo details
    this._getAccuracy();  // get combo accuracy
    return true;
  }

  toString() {
    return (
      `Combo: \nCog HP: ${this.cog.hp} \nGags: [\n${
        this.gags.map(gag => `${gag}`).join(",\n")
      }\n]\nDamage: ${this.damage["Total"]}\nDefeats Cog: ${this.defeatsCog}`
    );
  }
}

// let testCombo = new Combo(
//   new Cog(3),
//   [
//     new Gag("Lure", 1, false),
//     new Gag("Trap", 1, false),
//     new Gag("Throw", 1, false),
//     new Gag("Squirt", 1, false)
//   ]
// );
// console.log(`${testCombo}`);
