import championsData from "@data/champion.json";

export const getRandomChampion = (excludedChampions: string[]) => {
  const championEntries = Object.values(championsData.data);

  const filteredChampions = championEntries.filter((champion) =>
    excludedChampions.includes(champion.name)
  );

  const randomItem = [];

  for (let index = 0; index < 30; index++) {
    const randomIndex = Math.floor(Math.random() * filteredChampions.length);
    const champion = filteredChampions[randomIndex];

    const selectedChampion = {
      version: championsData.version,
      name: champion.name,
      image: champion.image.full,
      width: champion.image.w,
      heigth: champion.image.h,
    };

    randomItem.push(selectedChampion);
  }
  return randomItem;
};
