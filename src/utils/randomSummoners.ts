import summonerData from "@data/summoner.json";
import { Summoner } from "@/types";

const summonersDataArray = Object.entries(summonerData.data);

const filteredSummoners = summonersDataArray.filter(([, summoner]) =>
  summoner.modes.includes("CLASSIC")
);

const formattedSummoners = filteredSummoners.map(([, item]) => ({
  version: summonerData.version,
  name: item.name,
  image: item.image.full,
  width: item.image.w,
  height: item.image.h,
}));

export const getRandomSummoners = (role: string) => {
  if (formattedSummoners.length === 0) return;

  const selectedItems = [...formattedSummoners];
  const finalSelectedItems: Summoner[] = [];
  const checkItems = new Set();

  do {
    const randomIndex = Math.floor(Math.random() * selectedItems.length);
    const selectedItem = selectedItems[randomIndex];
    selectedItems.splice(randomIndex, 1);

    if (role === "Jungle") {
      const smiteItem = formattedSummoners.find(
        (summoner) => summoner.name === "Smite"
      );

      if (smiteItem && !checkItems.has(smiteItem.name)) {
        finalSelectedItems.push(smiteItem);
        checkItems.add(smiteItem.name);
        continue;
      }
    }

    if (!checkItems.has(selectedItem.name)) {
      finalSelectedItems.push(selectedItem);
      checkItems.add(selectedItem.name);
    }
  } while (finalSelectedItems.length < 2);

  return finalSelectedItems;
};
