// npcEvents.js
const events = {
    Elf: [
      "a mystical journey to discover hidden elven magic",
      "a dispute over ancient elven artifacts",
      "a moonlit ritual in the sacred forest",
    ],
    Orc: [
      "a fierce battle against rival tribes",
      "a quest to prove strength in a tournament",
      "a raid on enemy encampments",
    ],
    Wizard: [
      "a search for ancient spells lost in time",
      "a duel with a rival sorcerer",
      "an expedition to unlock forbidden knowledge",
    ],
    Warrior: [
      "a mission to defend the kingdom's border",
      "a rescue operation for kidnapped villagers",
      "a quest to retrieve a legendary weapon",
    ],
    // Add more events for other races and classes as needed
  };
  
  function getRandomEvent(npcRace, npcClass) {
    // Combine general and specific events if available
    const raceEvents = events[npcRace] || [];
    const classEvents = events[npcClass] || [];
    const combinedEvents = raceEvents.concat(classEvents);
  
    // Return a random event from the combined list
    return combinedEvents.length
      ? combinedEvents[Math.floor(Math.random() * combinedEvents.length)]
      : "a mysterious encounter that defies explanation";
  }
  
  module.exports = { getRandomEvent };
  