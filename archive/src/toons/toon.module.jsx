// THIS FILE CURRENTLY UNUSED

// import toons from "./toons.json";

export default class Toon {
  constructor(active=true, organic="None") {
    this.active = active;
    this.organic = organic;
    // this.species = this.randomSpecies();
    // this.gender = (this.fiftyFiftyChance()) ? "Boy" : "Girl";
    // this.color = this.randomColor();
    // this.name = this.randomName();
  }

  toggleActive() { 
    this.active = !this.active; 
  }

  updateOrganic(organic="None") {
    this.organic = organic;
  }

  // fiftyFiftyChance() {
  //   return Math.round(Math.random()) === 0;
  // }

  // randomSpecies() {
  //   let species = toons["species"];
  //   return species[Math.floor(Math.random()*species.length)];
  // }

  // randomColor() {
  //   let colorsObj = toons["colors"];

  //   let colorNames;
  //   // special case cat can be black
  //   if (this.species === "Cat") {
  //     colorNames = colorsObj["names"].concat(colorsObj["Cat"]);
  //   // special case bear can be white
  //   } else if (this.species === "Bear") {
  //     colorNames = colorsObj["names"].concat(colorsObj["Bear"]);
  //   } else {
  //     colorNames = colorsObj["names"];
  //   }

  //   let randColor = colorNames[Math.floor(Math.random()*colorNames.length)];
  //   let colorVal = colorsObj["values"][randColor];

  //   return [randColor, colorVal];
  // }

  // randomName() {
  //   let names = toons["names"];

  //   let hasTitle = this.fiftyFiftyChance();
  //   let hasFirstName = this.fiftyFiftyChance();
  //   let hasLastName = hasFirstName ? this.fiftyFiftyChance() : true; 

  //   let nameParts = [];
  //   if (hasTitle) {
  //     nameParts.push(names["title"][Math.floor(Math.random()*names["title"].length)]);
  //   }
  //   if (hasFirstName) {
  //     let first = names["first"][Math.floor(Math.random()*names["first"].length)];
  //     // special case - von
  //     if (first === "von" && !hasTitle) {
  //       first = first.charAt(0).toUpperCase() + first.slice(1)
  //     }
  //     nameParts.push(first);
  //   }
  //   if (hasLastName) {
  //     let last0 = names["last"][0][Math.floor(Math.random()*names["last"][0].length)];
  //     let last1 = names["last"][1][Math.floor(Math.random()*names["last"][1].length)];
  //     // special case - Mc and Mac
  //     if (last0 === "Mc" || last0 === "Mac") {
  //       last1 = last1.charAt(0).toUpperCase() + last1.slice(1)
  //     }
  //     nameParts.push(last0+last1);
  //   }
    
  //   return nameParts.join(" ");
  // }

  toString() {
    return (
      `Toon: \nOrganic Gag: ${this.organic}`
      // `Toon: \n- ${this.name} (${this.gender}), \n- ${this.color[0]} (${this.color[1]}) ${this.species}, \n- Organic Gag: ${this.organic}`
    );
  }
}

// let testToon = new Toon("Throw");
// console.log(`${testToon}`);