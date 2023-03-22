const specialLevels = { GOLDEN_DRAGON: 200 };

const rarityOffset = { COMMON: 0, UNCOMMON: 6, RARE: 11, EPIC: 16, LEGENDARY: 20, MYTHIC: 20 };

const levels = [
  100, 110, 120, 130, 145, 160, 175, 190, 210, 230, 250, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160,
  3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200,
  60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700,
  383700, 411700, 441700, 476700, 516700, 561700, 611700, 666700, 726700, 791700, 861700, 936700, 1016700, 1101700, 1191700, 1286700, 1386700, 1496700, 1616700, 1746700, 1886700, 0, 1, 1886700, 1886700, 1886700,
  1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
  1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
  1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
  1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
  1886700, 1886700, 1886700,
];

const blockedCandyReducePets = ['ENDER_DRAGON', 'GOLDEN_DRAGON', 'SCATHA'];
const recombPetItems = ['PET_ITEM_TIER_BOOST', 'PET_ITEM_VAMPIRE_FANG', 'PET_ITEM_TOY_JERRY'];
const soulboundPets = ['GRANDMA_WOLF', 'KUUDRA', 'BINGO'];
const tiers = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC', 'DIVINE', 'SPECIAL', 'VERY_SPECIAL'];

const getPetLevel = (pet) => {
  if (recombPetItems.includes(pet.heldItem)) pet.tier = tiers[tiers.indexOf(pet.tier) + 1];
  const maxPetLevel = specialLevels[pet.type] ? specialLevels[pet.type] : 100;
  const petOffset = rarityOffset[pet.type === 'BINGO' ? 'COMMON' : pet.tier];
  const petLevels = levels.slice(petOffset, petOffset + maxPetLevel - 1);

  let level = 1;
  let totalExp = 0;

  for (let i = 0; i < maxPetLevel; i++) {
    totalExp += petLevels[i];
    if (totalExp > pet.exp) {
      totalExp -= petLevels[i];
      break;
    }

    level++;
  }

  return { level: Math.min(level, maxPetLevel), xpMax: petLevels.reduce((a, b) => a + b, 0) };
};

module.exports = {
  specialLevels,
  rarityOffset,
  levels,
  blockedCandyReducePets,
  recombPetItems,
  soulboundPets,
  tiers,
  getPetLevel,
};