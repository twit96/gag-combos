import { gagsData } from "~/features/core";
import {
  Gag, trackOrdering,
  Combo
} from "~/features/core";


// eslint-disable-next-line no-extend-native
Array.prototype.hasNonZeroMin = function(attrib) {
  const checker = (o, i) => typeof(o) === "object" && o[i]
  return (this.length && this.reduce(function(prev, curr){
      const prevOk = checker(prev, attrib);
      const currOk = checker(curr, attrib);
      if (!prevOk && !currOk) return {};
      if (!prevOk) return curr;
      if (!currOk) return prev;
      return ((prev[attrib] < curr[attrib]) && (prev[attrib] > 0) && (curr[attrib] > 0)) ? prev : curr; 
  })) || null;
}


export default class FindCombo {
  constructor(
    cog=null,
    tracks=null,
    toonOrgs=null
  ) {
    this.numToons = tracks.length;
    this.tracks = this._sortTracks(tracks);
    this.toonOrgs = this._configToonOrgs(toonOrgs);
    this.gags = this._getGags();
    this.solution = this.find(cog);
  }

  _sortTracks(tracks) {
    return tracks.sort(function(a,b) {
      return (trackOrdering[a] - trackOrdering[b] || a.localeCompare(b));
    });
  }

  _configToonOrgs(toonOrgs) {
    let toonOrgsCopy = [...toonOrgs];  // mutate copy of toonOrgs
    let thisToonOrgs = [];             // to be this.toonOrgs

    this.tracks.forEach((track) => {
      let trackIdx = toonOrgsCopy.indexOf(track); 
      if (trackIdx !== -1) {
        thisToonOrgs.push(track);          // add to thisToonOrgs
        toonOrgsCopy.splice(trackIdx, 1);  // remove from toonOrgsCopy
      } else {
        thisToonOrgs.push("");
      }
    });
    return thisToonOrgs;
  }


  /*
    replace: 
    gag: {
      stat: {
        organic: org-val, 
        non-organic: non-org-val
      }
    }
     
    with:
    gag: {
      stat: org-val
    }

    or: 
    gag: {
      stat: non-org-val
    }
  */ 
  _mapGagStats(gag, organicText="non-organic") {
    let thisStat;
    let newGag = JSON.parse(JSON.stringify(gag));
    ["accuracy", "damage", "heal"].forEach((stat) => {
      if (
        (Object.keys(newGag).includes(stat)) &&
        (Object.keys(gag[stat]).includes(organicText))
      ) {
        thisStat = gag[stat][organicText];
        newGag[stat] = (Array.isArray(thisStat)) ? thisStat[1] : thisStat;  // use highest stat value (for now)
      }
    });
    newGag.organic = (organicText==="organic");
    return newGag;
  }

  
  _getGags() {
    // requires both params
    if (this.tracks===null || this.toonOrgs===null) return false;

    let thisGags = [];
    this.tracks.forEach((track, i) => {
      thisGags.push(gagsData[track].map((gag, j) => {
        gag.track = track;
        gag.level = j+1;
        let organicValue = (this.toonOrgs[i] === track) ? "organic" : "non-organic"; 
        return this._mapGagStats(gag, organicValue);
      }));
    });
    return thisGags;
  }


  _getCurrComboGags(tracks, levels) {
    let comboGags = [];
    for (let i=0; i<this.numToons; i++) {
      comboGags.push(
        new Gag(
          tracks[i],
          levels[i],
          this.gags[i][0].organic
        )
      );
    }
    return comboGags;
  }


  find(cog) {
    if (!cog || !this.gags || this.gags.length === 0) return false;


    // Copy Tracks Object
    let gagTracks = JSON.parse(JSON.stringify(this.tracks));

    // Initialize Gags at Level 1*
    // let gagLvls = Array(this.numToons).fill(1);
    let gagLvls = [];
    for (let i=0; i<this.numToons; i++) {
      let currLvl = 1;

      // *Special case, Lure:
      if (gagTracks[i] === "Lure") {
        currLvl = 
          (cog.level >= 18) ? 7
        : (cog.level >= 14) ? 6
        : (cog.level >= 9)  ? 5
        : (cog.level >= 6)  ? 4
        : (cog.level >= 4)  ? 3
        : (cog.level >= 2)  ? 2 
                            : 1;
      } 

      gagLvls.push(currLvl);
    }

    // Get Current Combo Gags
    let comboGags = this._getCurrComboGags(gagTracks, gagLvls);
    
    // Find Minimum Successful Combo
    let combo = new Combo(
      cog, 
      comboGags
    );
    let iterCount = 0;
    while (!combo.defeatsCog) {

      // find minimum level gag (filter out Lure and Toon-Up, which have 0 damage)
      let filteredGags = comboGags.filter(function(gag) { return gag.damage["Base"] !== 0; });
      let minNonzeroLevelGag = filteredGags.hasNonZeroMin("level");
      let minNonzeroLevel = filteredGags.hasNonZeroMin("level").level;
      let minNonzeroIndex = comboGags.findIndex(gag => (gag === minNonzeroLevelGag));


      // find minimum level gag (no filter here - lure and toon-up levels would align with other gags)
      // let minNonzeroLevel = Math.min(...gagLvls.filter(Boolean));
      // let minNonzeroIndex = gagLvls.findIndex(x => (x === minNonzeroLevel));

      // lowest gag can go no higher ?
      if (minNonzeroLevel === 7) return false;

      // add 1 to lowest gag level
      Object.assign(gagLvls[minNonzeroIndex], gagLvls[minNonzeroIndex]++);
      comboGags = this._getCurrComboGags(gagTracks, gagLvls);

      // Get Current Combo
      combo = new Combo(
        cog, 
        comboGags
      );

      // Throw error after 29 iterations
      // (a 4 gag combo will have a maximum of 28 iterations)
      iterCount++;
      if (iterCount>28) {
        throw new Error("Welp, the while loop was stuck iterating upwards."); 
      }

    };


    // Decrease Gags if Possible
    iterCount = 0;  // reset error check iteration counter
    
    while (true) {

      // store initial state of combo before for loop
      let lastSuccessfulCombo = new Combo(
        cog, 
        this._getCurrComboGags(gagTracks, gagLvls)
      );
      
      // try to lower each gag
      for (let i=0; i<gagLvls.length; i++) {

        // use separate objects to check before mutating actual object 
        let currComboGags = this._getCurrComboGags(gagTracks, gagLvls);
        let currCombo = new Combo(
          cog, 
          currComboGags
        );

        // ignore Passes, Toon-Up, Lure, Duds
        if (currCombo.gags[i].damage["Base"] > 0) {

          let currGagLvls = JSON.parse(JSON.stringify(gagLvls));

          // subtract 1 from current gag level
          Object.assign(currGagLvls[i], currGagLvls[i]--);
          currComboGags = this._getCurrComboGags(gagTracks, currGagLvls);

          // Get Current Combo
          currCombo = new Combo(
            cog, 
            currComboGags
          );

          // update returnable combo if currCombo is successful
          if (currCombo.defeatsCog) { 
            Object.assign(gagLvls[i], gagLvls[i]--);
            comboGags = this._getCurrComboGags(gagTracks, gagLvls);
            combo = new Combo(
              cog, 
              this._getCurrComboGags(gagTracks, gagLvls)
            );
          }

        } 
      }

      // while loop break condition:
      // for loop has just checked all gags and made no changes to the combo
      if (JSON.stringify(lastSuccessfulCombo) === JSON.stringify(combo)) {
        this.tracks = gagTracks;
        break;
      }

      // Throw error after 21 iterations
      // (We know at least 1 gag must stay fixed, so there are a maximum of 21 iterations for the 3 other gags, 
      // and this can surely be more restrictive - but it should never be triggered anyway.)
      iterCount++;
      if (iterCount>21) {
        throw new Error("Welp, the while loop was stuck iterating downwards."); 
      }
    }
    
    return combo;
  }

  toString() {
    return (
      `FindCombo: \nnumToons: ${this.numToons} \ntracks: ${this.tracks} \nsolution: ${this.solution}`
    );
  }
}

// let testCombo = new FindCombo(
//   new Cog(4),
//   ["Throw", "Throw", "Throw", "Throw"],  // gag combo tracks
//   ["None", "None", "None", "None"],      // toon organic gags
// );
// console.log(`${testCombo.solution}`);
