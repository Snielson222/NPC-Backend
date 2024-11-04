// npcEvents.js
const events = {
    Elf: [
      "a mystical journey to discover hidden elven magic",
      "a dispute over ancient elven artifacts",
      "a moonlit ritual in the sacred forest",
      "an alliance meeting with forest spirits",
      "a quest to save an endangered magical creature",
    ],
    Orc: [
      "a fierce battle against rival tribes",
      "a quest to prove strength in a tournament",
      "a raid on enemy encampments",
      "a blood oath ceremony with the clan",
      "a dangerous mission to gather rare resources in enemy territory",
    ],
    Human: [
      "a journey to explore uncharted lands",
      "an expedition to locate lost treasures",
      "a political mission to negotiate peace between warring factions",
      "a trial of skill in a royal tournament",
      "a risky journey across the desert to retrieve ancient scrolls",
    ],
    Dwarf: [
      "a mining expedition into forbidden caverns",
      "a feud with goblin raiders over precious gemstones",
      "a ritual to honor the ancestors in the mountain",
      "a quest to reclaim lost dwarven relics",
      "an encounter with a dragon in the mines",
    ],
    Gnome: [
      "an adventure to invent a powerful new gadget",
      "a prank war with rival gnome clans",
      "a journey to the heart of the forest to study magical flora",
      "a treasure hunt for rare stones and minerals",
      "a quest to outwit a mischievous fae creature",
    ],
    Wizard: [
      "a search for ancient spells lost in time",
      "a duel with a rival sorcerer",
      "an expedition to unlock forbidden knowledge",
      "a quest to retrieve a mythical staff from a haunted ruin",
      "a summoning ritual that goes awry",
    ],
    Warrior: [
      "a mission to defend the kingdom's border",
      "a rescue operation for kidnapped villagers",
      "a quest to retrieve a legendary weapon",
      "an ambush on enemy forces in hostile territory",
      "a challenge to defend a village from marauding creatures",
    ],
    Rogue: [
      "a heist targeting a noble’s heavily guarded mansion",
      "an underground fight for information in a thieves' guild",
      "a covert mission to uncover secrets in a bustling city",
      "a treasure hunt in a haunted temple",
      "an escape from a high-security prison",
    ],
    Cleric: [
      "a pilgrimage to a sacred site",
      "a mission to cleanse a village of dark spirits",
      "a quest to recover holy relics",
      "a blessing ceremony for new initiates",
      "a battle against a demon threatening the local temple",
    ],
    Bard: [
      "a performance competition at a grand festival",
      "a journey to record ancient tales from remote villages",
      "a battle of wits with a mischievous fae musician",
      "a quest to retrieve a legendary instrument",
      "a night of revelry with a band of adventurers",
    ],
  };
  
  function getRandomEvent(npcRace, npcClass) {
    // Combine race-specific and class-specific events
    const raceEvents = events[npcRace] || [];
    const classEvents = events[npcClass] || [];
    const combinedEvents = raceEvents.concat(classEvents);
  
    // Return a random event from the combined list or a default message if empty
    return combinedEvents.length
      ? combinedEvents[Math.floor(Math.random() * combinedEvents.length)]
      : "a mysterious encounter that defies explanation";
  }
  
  module.exports = { getRandomEvent };
  