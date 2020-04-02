const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    value: { type: Number, default: 0 },
    saveThrow: { type: Boolean, default: false }
  },
  { _id: false }
);

const characterSchema = new mongoose.Schema({
  info: {
    name: { type: String, default: "" },
    charClass: { type: String, default: "" },
    level: { type: Number, default: 1 },
    race: { type: String, default: "" },
    exp: { type: Number, default: 0 }
  },
  stats: {
    str: statSchema,
    dex: statSchema,
    con: statSchema,
    int: statSchema,
    wis: statSchema,
    cha: statSchema
  },
  skills: {
    acrobatics: {
      stat: { type: String, default: "dex" },
      proficient: { type: Boolean, default: false }
    },
    animalHandling: {
      stat: { type: String, default: "wis" },
      proficient: { type: Boolean, default: false }
    },
    arcana: {
      stat: { type: String, default: "int" },
      proficient: { type: Boolean, default: false }
    },
    athletics: {
      stat: { type: String, default: "str" },
      proficient: { type: Boolean, default: false }
    },
    deception: {
      stat: { type: String, default: "cha" },
      proficient: { type: Boolean, default: false }
    },
    history: {
      stat: { type: String, default: "int" },
      proficient: { type: Boolean, default: false }
    },
    insight: {
      stat: { type: String, default: "wis" },
      proficient: { type: Boolean, default: false }
    },
    intimidation: {
      stat: { type: String, default: "cha" },
      proficient: { type: Boolean, default: false }
    },
    investigation: {
      stat: { type: String, default: "int" },
      proficient: { type: Boolean, default: false }
    },
    medicine: {
      stat: { type: String, default: "wis" },
      proficient: { type: Boolean, default: false }
    },
    nature: {
      stat: { type: String, default: "int" },
      proficient: { type: Boolean, default: false }
    },
    perception: {
      stat: { type: String, default: "wis" },
      proficient: { type: Boolean, default: false }
    },
    performance: {
      stat: { type: String, default: "cha" },
      proficient: { type: Boolean, default: false }
    },
    persuasion: {
      stat: { type: String, default: "cha" },
      proficient: { type: Boolean, default: false }
    },
    religion: {
      stat: { type: String, default: "int" },
      proficient: { type: Boolean, default: false }
    },
    sleightOfHand: {
      stat: { type: String, default: "dex" },
      proficient: { type: Boolean, default: false }
    },
    stealth: {
      stat: { type: String, default: "dex" },
      proficient: { type: Boolean, default: false }
    },
    survival: {
      stat: { type: String, default: "wis" },
      proficient: { type: Boolean, default: false }
    }
  },
  inspiration: { type: Boolean, default: false },
  combat: {
    armorClass: { type: Number, default: 0 },
    initiative: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    maxHp: { type: Number, default: 0 },
    curHp: { type: Number, default: 0 },
    tempHp: { type: Number, default: 0 },
    hitDice: { type: String, default: "" },
    deathSaves: {
      successes: { type: Number, default: 0 },
      failures: { type: Number, default: 0 }
    }
  }
});

module.exports = characterSchema;
