export const trackColors = {
  "Toon-Up": "#c55ae8",
  "Trap":    "#e8e65a",
  "Lure":    "#33bd35",
  "Sound":   "#5470ef",
  "Throw":   "#ed9f32",
  "Squirt":  "#f55bd6",
  "Drop":    "#32eaed"
};


export const trackOrdering = {
  "Toon-Up": 1,
  "Trap":    2,
  "Lure":    3,
  "Sound":   4,
  "Throw":   5,
  "Squirt":  6,
  "Drop":    7,
};

// export const trackAttributes = {
//   "Toon-Up": "heal",
//   "Trap":    "damage",
//   "Lure":    "accuracy",
//   "Sound":   "damage",
//   "Throw":   "damage",
//   "Squirt":  "damage",
//   "Drop":    "damage",
// };


/*
h := heal, d := damage, a := accuracy
Usage:
  const organicValue = organicBonus[currentGagTrack](baseValue);
*/
export const organicBonus = {
  "Toon-Up": function(h) { return Math.ceil(h * 1.2)  },
  "Trap":    function(d) { return Math.ceil(d * 1.1)  },
  "Lure":    function(a) { return           a + 0.1   },
  "Sound":   function(d) { return Math.ceil(d * 1.1)  },
  "Throw":   function(d) { return Math.ceil(d * 1.1)  },
  "Squirt":  function(d) { return Math.ceil(d * 1.15) },
  "Drop":    function(d) { return Math.ceil(d * 1.15) },
};


export const gagsData = {
  "Toon-Up": [
    {
      "name": "Feather",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": [8, 10],
    },
    {
      "name": "Megaphone",
      "skill_points": 20,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": [15, 18],
    },
    {
      "name": "Lipstick",
      "skill_points": 200,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": [25, 30],
    },
    {
      "name": "Bamboo Cane",
      "skill_points": 800,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": [40, 45],
    },
    {
      "name": "Pixie Dust",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.7,
      "heal": [50, 60],
    },
    {
      "name": "Juggling Cubes",
      "skill_points": 6000,
      "targets_multi": true,
      "accuracy": 0.7,
      "heal": [75, 105],
    },
    {
      "name": "High Dive",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "heal": [210, 210],
    }
  ],
  "Trap": [
    {
      "name": "Banana Peel",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [10, 12],
    },
    {
      "name": "Rake",
      "skill_points": 20,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [18, 20],
    },
    {
      "name": "Marbles",
      "skill_points": 100,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [30, 35],
    },
    {
      "name": "Quicksand",
      "skill_points": 500,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [45, 50],
    },
    {
      "name": "Trapdoor",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [75, 85],
    },
    {
      "name": "TNT",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 1.0,
      "damage": [90, 180],
    },
    {
      "name": "Railroad",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 1.0,
      "damage": [200, 200],
    }
  ],
  "Lure": [
    {
      "name": "$1 Bill",
      "skill_points": 0,
      "targets_multi": false,
      "stun": 2,
      "accuracy": 0.6,
    },
    {
      "name": "Small Magnet",
      "skill_points": 20,
      "targets_multi": true,
      "stun": 2,
      "accuracy": 0.55,
    },
    {
      "name": "$5 Bill",
      "skill_points": 100,
      "targets_multi": false,
      "stun": 3,
      "accuracy": 0.7,
    },
    {
      "name": "Big Magnet",
      "skill_points": 800,
      "targets_multi": true,
      "stun": 3,
      "accuracy": 0.65,
    },
    {
      "name": "$10 Bill",
      "skill_points": 2000,
      "targets_multi": false,
      "stun": 4,
      "accuracy": 0.8,
    },
    {
      "name": "Hypno Goggles",
      "skill_points": 6000,
      "targets_multi": true,
      "stun": 4,
      "accuracy": 0.75,
    },
    {
      "name": "Presentation",
      "skill_points": 10000,
      "targets_multi": true,
      "stun": 8,
      "accuracy": 0.9,
    }
  ],
  "Sound": [
    {
      "name": "Bike Horn",
      "skill_points": 0,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [3, 4],
    },
    {
      "name": "Whistle",
      "skill_points": 20,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [5, 7],
    },
    {
      "name": "Bugle",
      "skill_points": 200,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [9, 11],
    },
    {
      "name": "Aoogah",
      "skill_points": 800,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [14, 16],
    },
    {
      "name": "Elephant Trunk",
      "skill_points": 2000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [19, 21],
    },
    {
      "name": "Foghorn",
      "skill_points": 6000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [25, 50],
    },
    {
      "name": "Opera Singer",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [90, 90],
    }
  ],
  "Throw": [
    {
      "name": "Cupcake",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [4, 6],
    },
    {
      "name": "Fruit Pie Slice",
      "skill_points": 10,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [8, 10],
    },
    {
      "name": "Cream Pie Slice",
      "skill_points": 50,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [14, 17],
    },
    {
      "name": "Whole Fruit Pie",
      "skill_points": 400,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [24, 27],
    },
    {
      "name": "Whole Cream Pie",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [36, 40],
    },
    {
      "name": "Birthday Cake",
      "level": 6,
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.75,
      "damage": [48, 100],
    },
    {
      "name": "Wedding Cake",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.75,
      "damage": [120, 120],
    }
  ],
  "Squirt": [
    {
      "name": "Squirting Flower",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [3, 4],
    },
    {
      "name": "Glass of Water",
      "skill_points": 10,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [6, 8],
    },
    {
      "name": "Squirt Gun",
      "skill_points": 50,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [10, 12],
    },
    {
      "name": "Seltzer Bottle",
      "skill_points": 400,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [18, 21],
    },
    {
      "name": "Fire Hose",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [27, 30],
    },
    {
      "name": "Storm Cloud",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.95,
      "damage": [36, 80],
    },
    {
      "name": "Geyser",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.95,
      "damage": [105, 105],
    }
  ],
  "Drop": [
    {
      "name": "Flower Pot",
      "skill_points": 0,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [10, 10],
    },
    {
      "name": "Sandbag",
      "skill_points": 20,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [18, 18],
    },
    {
      "name": "Anvil",
      "skill_points": 100,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [30, 30],
    },
    {
      "name": "Big Weight",
      "skill_points": 500,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [45, 45],
    },
    {
      "name": "Safe",
      "skill_points": 2000,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [60, 70],
    },
    {
      "name": "Grand Piano",
      "skill_points": 6000,
      "targets_multi": false,
      "accuracy": 0.5,
      "damage": [85, 170],
    },
    {
      "name": "Toontanic",
      "skill_points": 10000,
      "targets_multi": true,
      "accuracy": 0.5,
      "damage": [180, 180],
    }
  ]
};
