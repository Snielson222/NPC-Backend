// npcData.js
const races = [
    "Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"
    // Add other races as needed
  ];
  
  const classes = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"
    // Add other classes as needed
  ];
  
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  module.exports = { races, classes, getRandomElement };
  