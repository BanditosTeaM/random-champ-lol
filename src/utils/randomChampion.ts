import championsData from "@data/champion.json";

export const getRandomChampion = () => {
  const championEntries = Object.values(championsData.data);

  const randomItem = [];

  for (let index = 0; index < 30; index++) {
    const randomIndex = Math.floor(Math.random() * championEntries.length);
    const champion = championEntries[randomIndex];
    const selectedChampion = {
      version: champion.version,
      name: champion.name,
      image: champion.image.full,
      width: champion.image.w,
      heigth: champion.image.h,
    };

    randomItem.push(selectedChampion);
  }
  return randomItem;
};
