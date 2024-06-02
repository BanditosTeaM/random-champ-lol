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

export const getRandomSummoners = () => {
  if (formattedSummoners.length === 0) return;

  const selectedItems = [...formattedSummoners];
  const finalSelectedItems: Summoner[] = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * selectedItems.length);
    const selectedItem = selectedItems[randomIndex];
    selectedItems.splice(randomIndex, 1);

    finalSelectedItems.push(selectedItem);
  }

  return finalSelectedItems;
};
