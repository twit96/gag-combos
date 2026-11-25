import { initialCalculatorState } from "~/features/calculator/calculator.slice";
import { initialCogState } from "~/features/cog/cog.slice";
import { initialRecommendationsState } from "~/features/recommendations/recommendations.slice";
import { initialGagState } from "~/features/gag/gag.slice";
import { initialToonState } from "~/features/toons/toons.slice";


/**
 * Problem with this class,
 * it only resolves changes to the keys and structure of the object.
 * If ever a key's value's TYPE changes, it will not be caught by this.
*/
export default class Storage {
  constructor() {
    this.schema = {
      calculator: initialCalculatorState,
      cog: initialCogState,
      combos: initialRecommendationsState,
      gag: initialGagState,
      toons: initialToonState
    }

    this.state = this._validateLocalState();
  }

  /**
   * Pull saved object from localStorage if it exists,
   * and validate its keys with the App's data schema.
   * TODO: check types too!
  */
  _validateLocalState() {
    const local = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : {};
    let state = JSON.parse(JSON.stringify(local));
    state = this._mirrorKeys(this.schema, state);
    return state;
  }

  /**
   * Used to ensure the structure of obj2 is the same as that of obj1.
   * Object 1 is an object with its own values. We ignore its values,
   * and instead try to match the structure here.
  */
  _mirrorKeys(obj1, obj2) {
    let copy = JSON.parse(JSON.stringify(obj2));

    // if Array
    if (Array.isArray(obj1)) {
      // if lengths don't match, use object 1 instead of object 2
      if (obj1.length !== obj2.length) copy = obj1;
      // else check each element
      else {
        for (let i=0; i<obj1.length; i++) {
          copy[i] = this._mirrorKeys(obj1[i], obj2[i]);
        }
      }
    }
    
    // if Dictionary
    else if (
      typeof obj1 === "object" &&
      !Array.isArray(obj1) &&
      obj1 !== null
    ) {
      // remove outdated keys
      for (const k2 in copy) {
        if (!(k2 in obj1)) delete copy[k2];
      }
      // add missing keys
      for (const k1 in obj1) {
        if (!(k1 in copy)) copy[k1] = obj1[k1];
      }
      // recursive callback
      for (const k in obj1) {
        copy[k] = this._mirrorKeys(obj1[k], copy[k]);
      }
    }

    return copy;
  }
}
