import FindCombo from "./find-combo.module";
import GetTrackCombinations from "./get-track-combinations.module";


/**
 * Filter Class that presents user with relevant combos
 */
 export default class RecommendCombos {
  constructor(
    cog=null,
    numToons=0,
    toonOrgs=[],
    comboType="All",
    comboSort="None",
    gagFilters=null
  ) {
    this.cog = cog;
    this.numToons = numToons;
    this.toonOrgs = [...toonOrgs];
    this.comboType = comboType;
    this.comboSort = comboSort;
    this.gagFilters = gagFilters;
    this.statusEffects = this.cog ? this.cog.statusEffects : {};

    this.gagComboTracks = new GetTrackCombinations(this.numToons, this.comboType, this.gagFilters, this.statusEffects).combinations;
    this.recCombos = this._recCombos();
    this.errorMsg = this._checkForError();
  }

  _recCombos()  {
    let recSolns=[];
    let foundCombo;

    if (!this.cog || this.numToons===0) {
      // no combos exist
      return recSolns;
    }

    // find combos
    this.gagComboTracks.forEach(comboTracks => {
      foundCombo = new FindCombo(
        this.cog,
        comboTracks,
        this.toonOrgs
      );
      
      if (foundCombo.solution) {
        recSolns.push(foundCombo.solution); 
      } 
    });
    
    // filter and sort solutions
    recSolns = this._filterSolns(recSolns);
    recSolns = this._sortSolns(recSolns);
    recSolns = this._sortSolnGags(recSolns);
 
    return recSolns;
  }

  _filterByGag(recSolns, track) {
    return recSolns.filter(function (combo) { 
      let counts = Object.keys(combo.counts);
      return !counts.includes(track);
    });
  }

  _filterSolns(recSolns) {

    // Normal Filters...
    
    // ...Remove Non-Unique Combos
    recSolns = recSolns.reduce(function (p, c) {
      // if the next object's "counts" is not found in the output array
      // push the object into the output array
      if (!p.some(function (el) { return JSON.stringify(el.counts) === JSON.stringify(c.counts); })) p.push(c);
      return p;
    }, []);


    // Custom Filters...

    // ...by Gag Tracks
    if (this.gagFilters) {
      let tracks = Object.keys(this.gagFilters);
      for (let i=0; i<tracks.length; i++) {
        let track = tracks[i];
        if (!this.gagFilters[track]) {
          recSolns = this._filterByGag(recSolns, track);
        }
      }
    }

    // ...Best Combos Only
    if (this.comboType === "Best") {

      /*
      To get the index of the nth percentile value, given the array length and the desired percentile.
      Used to get the nth percentile value for the recommendations output's accuracies and damages.
      Best combos are combos *ideally* falling in these upper percentiles for both stats.
      */
      function getPercentileIndex(arrLen, percentile=0.25) {
        // calculate true index at given percentile.
        const initialOutputIndex = Math.floor(arrLen * percentile) - 1;
        // ideally we will have at least 3 output combos
        const minimumOutputIndex = 2;
        const adjustedOutputIndex = Math.max(initialOutputIndex, minimumOutputIndex);
        // prevent index larger than array length
        const cappedOutputIndex = Math.min(arrLen-1, adjustedOutputIndex);
        return cappedOutputIndex;
      }
      
      // 10th percentile Accuracy
      const accuracies = recSolns.map((combo) => combo.accuracy).sort().reverse();
      const topPercentileAccuracy = accuracies[getPercentileIndex(accuracies.length, 0.1)];

      // 25th percentile Damage
      const damages = recSolns.map((combo) => combo.damage["Total"]).sort();
      const topPercentileDamage = damages[getPercentileIndex(damages.length, 0.25)];

      recSolns = recSolns.filter(function(combo) {
        return (
          combo.info.indicator !== "bad"                   // remove combos marked as bad
          && combo.damage["Total"] <= topPercentileDamage  // remove combos with damage above the calculated threshold
          && combo.accuracy >= topPercentileAccuracy       // remove combos with accuracy below the calculated threshold
        ); 
      });
      
    }

    return recSolns;
  }


  _sortSolns(recSolns) {

    // Custom Sort...

    // ...by Damage
    if (this.comboSort === "Damage") {
      recSolns.sort(function(combo1, combo2) {
        if (combo1.damage["Total"] === combo2.damage["Total"]) return 0;
        return (combo1.damage["Total"] < combo2.damage["Total"]) ? -1 : 1
      });
    }

    // ...by Accuracy
    if (this.comboSort === "Accuracy") {
      recSolns.sort(function(combo1, combo2) {
        if (combo1.accuracy === combo2.accuracy) return 0;
        return (combo1.accuracy < combo2.accuracy) ? 1 : -1
      });
    }

    // ...by Damage+Accuracy
    if (this.comboSort === "Damage+Accuracy") {
      recSolns.sort(function(combo1, combo2) {
        // prefer higher accuracy for same damage combos 
        if (combo1.damage["Total"] === combo2.damage["Total"]) {
          if (combo1.accuracy === combo2.accuracy) return 0;
          return (combo1.accuracy > combo2.accuracy) ? -1 : 1;
        }
        // sort by damage
        return (combo1.damage["Total"] < combo2.damage["Total"]) ? -1 : 1
      });
    }

    // ...by Accuracy+Damage
    if (this.comboSort === "Accuracy+Damage") {
      recSolns.sort(function(combo1, combo2) {
        // prefer lower damage for same accuracy combos 
        if (combo1.accuracy === combo2.accuracy) {
          if (combo1.damage["Total"] === combo2.damage["Total"]) return 0;
          return (combo1.damage["Total"] > combo2.damage["Total"]) ? 1 : -1;
        }
        // sort by accuracy
        return (combo1.accuracy < combo2.accuracy) ? 1 : -1
      });
    }

    return recSolns;
  }

  _sortSolnGags(recSolns) {
    recSolns.forEach((combo) => {
      combo.gags.sort(function(a,b) {

        // Put "Pass" at End
        if (a.name === "Pass") return 1;
        if (b.name === "Pass") return -1;
        
        // Sort same track gags by highest attack damage first
        // if (a.track === b.track) return (a.damage["Attack"] > b.damage["Attack"]) ? -1 : 1;
        
        // Otherwise Preserve Order
        return 0;
      });
    });
    return recSolns;
  }


  _checkForError() {
    if (this.numToons === 0) {
      return "You need at least 1 toon to defeat the cogs! Use the \"Toons\" section to configure your toons.";
    } else if (!this.cog) {
      return "There is no cog to defeat! Use the \"Cog\" section to choose a level.";
    } else if (this.recCombos.length === 0) {
      if (this.comboType === "Best") {
        return "No recommended \"best\" combos! Try another filter instead.";
      } else if (
        JSON.stringify(this.gagFilters) !== JSON.stringify({
          "Toon-Up": true,
          "Trap": true,
          "Lure": true,
          "Sound": true,
          "Throw": true,
          "Squirt": true,
          "Drop": true
        })
      ) {
        return "You may need more gag tracks to defeat this cog!"
      } else if (this.comboType==="Basic" && this.statusEffects["Reinforced Plating"]) {
        return "Defeating a v2.0 Cog requires combos with at least two distinct gag tracks! Try another filter instead."
      } else {
        return "You need more toons to defeat this cog!";
      }
    }
    return null;
  }
}
